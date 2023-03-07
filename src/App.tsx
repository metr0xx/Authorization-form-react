import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie"
import LoginPage from './Components/LoginPage'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element = {<LoginPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
