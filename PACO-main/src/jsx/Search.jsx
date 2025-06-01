import React from "react";
import '../css/Search.css';

// 이미지 경로
import search from "../img/search.svg";
import noti from "../img/noti.svg";
// import noti_act from "../img/noti_active.svg";

function Search() {
    return (
        <div className="Search">
            <div className="srh-container">
                <div className="srh-content-container">
                    <input type="text" placeholder="주차장 이름 또는 지역을 검색하세요." className="search-input"/>
                </div>
                <div className="srh-btn-container">
                    <button><img src={search} alt="search"/></button>
                    <button><img src={noti} alt="notification"/></button>
                </div>
            </div>
        </div>
    );
}

export default Search;