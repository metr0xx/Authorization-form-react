import React, {useEffect, useRef, useState} from 'react';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom";
import './Form.css'

export default function LoginPage() {

    const [login, setLogin] : any = useState("");
    const [password, setPassword] : any = useState("");
    const [error, setError] : any = useState("");
    const [cookies, setCookies] : any = useCookies();
    const navigate : any = useNavigate();
    let id = useRef();
    const passwordChanged = (event : any) => {
        setPassword(event.target.value)
    }

    const loginChanged = (event : any) => {
        setLogin(event.target.value)
    }

    const toRegister = () => {
        navigate("/Registration")
    }

    useEffect(() => {
        if (cookies["accessToken"] && cookies["accessToken"] !== "undefined") {
            console.log(cookies["userId"])
            console.log(cookies["accessToken"])
            console.log(cookies["login"])
            navigate(`/User/${cookies["login"]}`)
            return;
        }

        let refreshToken : any = cookies["refreshToken"]
        console.log(refreshToken)
        if(refreshToken) {
            fetch('https://localhost:44337/login', {
                mode: "cors",
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
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
                    id.current = result["data"]["userId"]
                    navigate(`/User/${cookies["login"]}`)
                })
            return;
        }
    }, [])

    const loginSubmit = (event : any) => {
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
                time.setTime(time.getTime() + 1 * 60 * 1000)
                setCookies("accessToken", result["data"]["accessToken"], {expires: time})
                setCookies("refreshToken", result["data"]["refreshToken"])
                setCookies("userId", result["data"]["userId"])
                setCookies("login", login)
                navigate(`/User/${login}`)
            })
        event.preventDefault()
    }

    return (
        <div>
            <div className="form">
                <div className="header">Вход</div>
                <div className="inputs">
                    <input className="input" onChange={loginChanged} value={login} placeholder="Логин"/>
                    <input type="password" className="input" onChange={passwordChanged} value={password} placeholder="Пароль" />
                </div>
                <button className="submitBtn" onClick={loginSubmit}>Войти</button>
            </div>
            <button className="signInBtn" onClick={toRegister}>Зарегистрироваться</button>
        </div>
    )
}

