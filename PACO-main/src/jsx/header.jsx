import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

import arrow_back from '../img/arrow_back.svg';

function Header() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="header">
            <header className="header-top">
                <div className="header-top-content">
                    <img 
                        src={arrow_back} 
                        alt="arrow_back" 
                        onClick={handleGoBack}
                        className="arrow-back" 
                    />
                    <h1>PACO</h1>
                </div>
            </header>
        </div>
    )
}

export default Header;
