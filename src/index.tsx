import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from './Components/LoginPage'

import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={ < LoginPage/> }/>
                <Route path="/Registration" element={ < RegisterPage/> }/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);

reportWebVitals();