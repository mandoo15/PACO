import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "../css/main.css"

import parkingSearchIcon from "../img/main/parking_search.svg";
import parkingRouteIcon from "../img/main/parking_route.svg";
import parkingHistoryIcon from "../img/main/parking_history.svg";
import locationIcon from "../img/main/location.svg";
import aiRecommendIcon from "../img/main/ai_recommend.svg";
import userInfoIcon from "../img/main/user_info.svg";

function Main(){
    const [username, setUsername] = useState("사용자");
    const [parkingLot, setParkingLot] = useState(null); // 주차장 정보 상태

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
            setUsername(storedName);
        }

        const fetchParkingData = async () => {
            // 예제 데이터 (추후 API 연동 가능)
            const parkingData = {
                name: "PACO 주차장",
                availableSpots: 12,
                totalSpots: 50,
                distance: 1.2, // km 단위
            };

            setParkingLot(parkingData);
        };

        fetchParkingData();
    }, []);

    return(
        <div className="main-container">
            <div className="main-container-header">
                <h1>{username}님,안녕하세요!<br/>
                선호도와 이력을 기반으로<br/>추천된 주차공간입니다.</h1>
            </div>

            <div className="custom-container">
                <div className="custom-container-info"></div>
                    <div className="custom-parking-lot">
                        <h2>{parkingLot ? parkingLot.name : "주차장 정보 없음"}</h2>
                    </div>
                    <div className="custom-parking-lot-info">
                        <h3>남은 공간 :  {parkingLot ? parkingLot.availableSpots : "-"}석 (총 {parkingLot ? parkingLot.totalSpots : "-"} 석)</h3>
                        <h3>현재 위치에서의 거리 : {parkingLot ? parkingLot.distance : "-"} km</h3>
                    </div>
                <div/>

                <button id="detail-button">더 알아보기</button>
            </div>


        <div className="main-category-container">
        <div className="category-grid">
        <div className="category-wrapper">
            <Link to="/home" className="category-item">
                <img src={parkingSearchIcon} alt="주차장 검색" className="category-icon" />
            </Link>
            <h3 className="category-text">주차장 검색</h3>
        </div>
        
        <div className="category-wrapper">
            <Link to="/route" className="category-item">
                <img src={parkingRouteIcon} alt="주차 경로 안내" className="category-icon" />
            </Link>
            <h3 className="category-text">주차경로 안내</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/history" className="category-item">
                <img src={parkingHistoryIcon} alt="주차 이력" className="category-icon" />
            </Link>
            <h3 className="category-text">주차 이력</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/location" className="category-item">
                <img src={locationIcon} alt="내 차량 위치" className="category-icon" />
            </Link>
            <h3 className="category-text">내 차량 위치</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/recommend" className="category-item">
                <img src={aiRecommendIcon} alt="AI 추천 받기" className="category-icon" />
            </Link>
            <h3 className="category-text">AI 추천 받기</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/user_info_change" className="category-item">
                <img src={userInfoIcon} alt="내 정보 수정" className="category-icon" />
            </Link>
            <h3 className="category-text">내정보 수정</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/parking-info" className="category-item">
                <img src={parkingSearchIcon} alt="추가 예정" className="category-icon" />
            </Link>
            <h3 className="category-text">추가 예정</h3>
        </div>

        <div className="category-wrapper">
            <Link to="/parking-info" className="category-item">
                <img src={parkingSearchIcon} alt="추가 예정" className="category-icon" />
            </Link>
            <h3 className="category-text">추가 예정</h3>
        </div>
    </div>
</div> 
    
</div>
    );
}

export default Main;