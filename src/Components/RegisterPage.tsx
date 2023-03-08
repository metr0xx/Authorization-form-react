import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom";
import './Form.css'

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

    const toLogin = () => {
      navigate("/Login")
    }
    const registerSubmit = (event : any) => {
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
                setCookies("userId", result["data"]["userId"])
                setCookies("login", login)
                console.log(cookies["userId"], cookies["accessToken"], cookies["refreshToken"])
                navigate("/Login")
            })
        event.preventDefault()
    }

    return (
        <div>
            <div className="form">
                <div className="header">Регистрация</div>
                <div className="inputs">
                    <input className="input" onChange={loginChanged} value={login} placeholder="Логин"/>
                    <input type="password" className="input" onChange={passwordChanged} value={password} placeholder="Пароль" />
                </div>
                <button className="submitBtn" onClick={registerSubmit}>Зарегистрироваться</button>
            </div>
            <button className="signInBtn" onClick={toLogin}>Войти</button>
        </div>
    )
}