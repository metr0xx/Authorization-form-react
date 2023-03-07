import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom";

export default function LoginPage() {

    const [login, setLogin] : any = useState("");
    const [password, setPassword] : any = useState("");
    const [error, setError] : any = useState("");
    const [cookies, setCookies] : any = useCookies();
    const navigate : any = useNavigate();

    const passwordChanged = (event : any) => {
        setPassword(event.target.value)
    }

    const loginChanged = (event : any) => {
        setLogin(event.target.value)
    }

    useEffect(() => {
        if (cookies["accessToken"] && cookies["accessToken"] !== "undefined") {
            navigate('/')
            return;
        }
        let refreshToken : any = cookies["refreshToken"]
        if(refreshToken) {
            fetch('https://localhost:44337/login', {
                mode: "cors",
                method: 'post',
                body: JSON.stringify({
                    "login": "",
                    "password": "",
                    "refreshToken": refreshToken
                })
            })
                .then(response => response.json())
                .then(result => {
                    if(result["status"] !== 200) {
                        setError(result["data"]["message"])
                        return;
                    }
                    let time : Date = new Date()
                    time.setTime(time.getTime() + 30 * 60 * 1000)
                    console.log(result)
                    setCookies('accessToken', result["data"]["accessToken"], {expires: time})
                    setCookies('refreshToken', result["data"]["refreshToken"])
                    navigate('/')
                })
            return;
        }
    }, [])

    const Login = (event : any) => {
        //console.log(res)
        fetch('https://localhost:44337/login', {
            mode: 'cors',
            method: 'post',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                "login": login,
                "password": password,
                "refreshToken": ""})

        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result["status"] !== 200) {
                    setError(result["data"]["message"])
                    return;
                }
                let time = new Date()
                time.setTime(time.getTime() + 30 * 60 * 1000)
                setCookies('accessToken', result["data"]["accessToken"], {expires: time})
                setCookies('refreshToken', result["data"]['refreshToken'])
                navigate(`/${result["data"]["userId"]}`)
            })
        event.preventDefault()
    }

    return (
        <div>
            Авторизация
        </div>
    )
}