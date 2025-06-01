import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login_header.css';

import arrow_back from '../img/arrow_back.svg';

function LoginHeader() {
    const navigate= useNavigate();
    return (
        <div className="login-header">
            <header className="login-header-top"> 
                <div className="login-header-top-content">
                    <img src={arrow_back} alt="arrow_back"onClick={() => navigate(-1)} style={{ cursor: "pointer" }}/>
                </div>
                 
            </header>

            <div className="login-logo">
                <h1>PACO</h1>
                 <h2>방문해 주셔서 감사합니다!</h2>
            </div>
        </div>
    )
}

export default LoginHeader;