import React from 'react';
import '../css/header.css';

// img route
import arrow_back from '../img/arrow_back.svg';

function Header() {
    return (
        <div className="header">
            <header className="header-top">
                <div className="header-top-content">
                    <img src={arrow_back} alt="arrow_back"/>
                    <h1>PACO</h1>
                </div>
            </header>
        </div>
    )
}

export default Header;