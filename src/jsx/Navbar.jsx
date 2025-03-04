import React from "react";
import "../css/Navbar.css";

// 이미지 경로
import category from "../img/nav/category.svg";
import home from "../img/nav/home.svg";
import parking from "../img/nav/parking.svg";
import emergency from "../img/nav/emergency.svg";
import account from "../img/nav/account.svg";

import category_act from "../img/nav/category_active.svg";
import home_act from "../img/nav/home_active.svg";
import parking_act from "../img/nav/parking_active.svg";
import emergency_act from "../img/nav/emergency_active.svg";
import account_act from "../img/nav/account_active.svg";

function Navbar() {
    return (
        <div className="nav">
            <nav className="navbar-container">
                    {/* 네비게이션 항목 */}
                    <div className="navbarNav" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img src={category} alt="category" className="nav-icon" />
                                    <p>카테고리</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img src={parking} alt="parking" className="nav-icon" />
                                    <p>주차</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img src={home} alt="home" className="nav-icon" />
                                    <p>홈</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img src={emergency} alt="emergency" className="nav-icon" />
                                    <p>알림</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <img src={account} alt="account" className="nav-icon"/>
                                    <p>마이페이지</p>
                                </a>
                            </li>
                        </ul>
                    </div>
            </nav>
        </div>
    );
}

export default Navbar;
