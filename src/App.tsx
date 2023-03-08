import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie"
import LoginPage from './Components/LoginPage'
import RegisterPage from "./Components/RegisterPage";
import UserPage from "./Components/UserPage";
import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import './App.css';
import HomePage from "./Components/HomePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Login" element = {<LoginPage/>}></Route>
            <Route path="/Registration" element = {<RegisterPage/>}></Route>
            <Route path="/User/:login" element = {<UserPage/>}/>
        </Routes>
    )
}

export default App;
