import React from "react";
import { Link } from "react-router-dom"; // ✅ 추가
import "../css/Navbar.css";

import home from "../img/nav/home.svg";
import parking from "../img/nav/parking.svg";
import emergency from "../img/nav/emergency.svg";
import account from "../img/nav/account.svg";

import home_act from "../img/nav/home_active.svg";
import parking_act from "../img/nav/parking_active.svg";
import emergency_act from "../img/nav/emergency_active.svg";
import account_act from "../img/nav/account_active.svg";

function Navbar() {
    return (
        <div className="nav">
            <nav className="navbar-container">
                <div className="navbarNav" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link" to="/parking">
                                <img src={parking} alt="parking" className="nav-icon" />
                                <p>주차</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                <img src={home} alt="home" className="nav-icon" />
                                <p>홈</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/emergency">
                                <img src={emergency} alt="emergency" className="nav-icon" />
                                <p>알림</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mypage">
                                <img src={account} alt="account" className="nav-icon" />
                                <p>마이페이지</p>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
