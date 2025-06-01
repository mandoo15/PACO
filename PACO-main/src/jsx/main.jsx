import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";

import Navbar from './Navbar.jsx';
import Header from './header.jsx';

function Main() {
    const [username, setUsername] = useState("사용자");
    const [parkingLot, setParkingLot] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
            setUsername(storedName);
        }

        const fetchParkingData = async () => {
            const parkingData = {
                name: "PACO 주차장",
                availableSpots: 12,
                totalSpots: 50,
                distance: 1.2,
            };
            setParkingLot(parkingData);
        };

        fetchParkingData();
    }, []);

    useEffect(() => {
        const slider = scrollRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;
      
        const handleMouseDown = (e) => {
          isDown = true;
          slider.classList.add("dragging");
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        };
      
        const handleMouseLeave = () => {
          isDown = false;
          slider.classList.remove("dragging");
        };
      
        const handleMouseUp = () => {
          isDown = false;
          slider.classList.remove("dragging");
        };
      
        const handleMouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault(); // 클릭 중일 때만 동작
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.5;
          slider.scrollLeft = scrollLeft - walk;
        };
      
        // 터치 대응
        let startTouchX = 0;
        let startScrollLeft = 0;
      
        const handleTouchStart = (e) => {
          isDown = true;
          startTouchX = e.touches[0].pageX;
          startScrollLeft = slider.scrollLeft;
        };
      
        const handleTouchMove = (e) => {
          if (!isDown) return;
          const x = e.touches[0].pageX;
          const walk = (startTouchX - x);
          slider.scrollLeft = startScrollLeft + walk;
        };
      
        const handleTouchEnd = () => {
          isDown = false;
        };
      
        // 이벤트 바인딩
        slider.addEventListener("mousedown", handleMouseDown);
        slider.addEventListener("mouseleave", handleMouseLeave);
        slider.addEventListener("mouseup", handleMouseUp);
        slider.addEventListener("mousemove", handleMouseMove);
      
        slider.addEventListener("touchstart", handleTouchStart);
        slider.addEventListener("touchmove", handleTouchMove);
        slider.addEventListener("touchend", handleTouchEnd);
      
        return () => {
          slider.removeEventListener("mousedown", handleMouseDown);
          slider.removeEventListener("mouseleave", handleMouseLeave);
          slider.removeEventListener("mouseup", handleMouseUp);
          slider.removeEventListener("mousemove", handleMouseMove);
          slider.removeEventListener("touchstart", handleTouchStart);
          slider.removeEventListener("touchmove", handleTouchMove);
          slider.removeEventListener("touchend", handleTouchEnd);
        };
      }, []);

    return (
        <div className="All" style={{ backgroundColor: "#efefef" }}>
            <div className="container" style={{ maxWidth: "430px", backgroundColor: "white", width: "100%" }}>
                <div className="header">
                    <Header />
                </div>

                <div className="content">
                    <div className="main-container-header">
                        <h1>{username}님, 안녕하세요!<br />
                            선호도와 이력을 기반으로<br />추천된 주차공간입니다.</h1>
                    </div>

                    <div className="custom-container">
                        <div className="custom-container-info"></div>
                        <div className="custom-parking-lot">
                            <h2>{parkingLot ? parkingLot.name : "주차장 정보 없음"}</h2>
                        </div>
                        <div className="custom-parking-lot-info">
                            <h3>남은 공간: {parkingLot ? parkingLot.availableSpots : "-"}석 (총 {parkingLot ? parkingLot.totalSpots : "-"} 석)</h3>
                            <h3>현재 위치에서 거리: {parkingLot ? parkingLot.distance : "-"} km</h3>
                        </div>

                        <Link to="/route">
                            <button id="detail-button">더 알아보기</button>
                        </Link>
                    </div>

            
                    <div className="main-category-container">
                        <div className="region-title">지역을 선택해 주세요</div>
                        <div className="region-slide-js" ref={scrollRef}>
                            {["서울", "광주", "대전", "인천", "부산", "대구", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"].map((region, index) => (
                                <div className="region-box-wrapper" key={index}>
                                    <Link to={`/region/${encodeURIComponent(region)}`} className="region-box" />
                                    <div className="region-label">{region}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="nav">
                    <Navbar />
                </div>
            </div>
        </div>
    );
}

export default Main;
