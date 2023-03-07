import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {

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

    const register = (event : any) => {
        fetch('https://localhost:44337/register', {
            mode: 'cors',
            method: 'post',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                "login": login,
                "password": password
            })
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
            Регистрация
        </div>
    )
}