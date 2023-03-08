import React from 'react';

import {useNavigate, useParams} from "react-router-dom";
import './HomePage.css'


export default function HomePage(props : any) {
    const navigate : Function = useNavigate();
    const toLogin = () => {
        navigate("/Login")
    }

    const toRegister = () => {
        navigate("/Registration")
    }

    return (
        <div className="home-page">
            <button className="routeBtn" onClick={toLogin}>Войти</button>
            <button className="routeBtn" onClick={toRegister}>Зарегистрироваться</button>
        </div>
    )
}