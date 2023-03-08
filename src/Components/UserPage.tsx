import React from 'react';

import {useNavigate, useParams} from "react-router-dom";
import './UserPage.css'
import {useCookies} from "react-cookie";

export default function UserPage(props : any) {
    const navigate : Function = useNavigate();
    const params = useParams();
    const [cookies, setCookies] : any = useCookies();

    const exit = () => {
        setCookies("accessToken", "")
        setCookies("refreshToken", "")
        navigate("/Login")
    }
    return (
        <div className="user-page">
            <div className="welcome">Добро пожаловать, {params.login}.</div>
            <button className="exit" onClick={exit}>Выйти</button>
        </div>
    )
}