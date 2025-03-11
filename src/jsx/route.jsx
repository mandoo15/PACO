import React, { useState } from "react";
import "../css/route.css";
import changeIcon from "../img/route/change.svg"; 
import departureIcon from "../img/route/route_depart.svg"; 
import arrivalIcon from "../img/route/route_arrival.svg"; 

function ParkingRoute() {
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");

    const swapLocations = () => {
        setDeparture(arrival);
        setArrival(departure);
    };

    return (
        <div className="route-container">
            <div className="map-placeholder">
                <p>📍 여기에 지도가 표시될 예정입니다.</p>
            </div>

            <div className="location-container">
                {/* 🔄 바꾸기 버튼 + 출발지 & 도착지 입력 필드 그룹 */}
                <div className="input-group">
                    <button className="swap-button" onClick={swapLocations}>
                        <img src={changeIcon} alt="위치 변경" className="swap-icon" />
                    </button>
                    
                    <div className="input-fields">
                        {/* 출발지 입력 필드 */}
                        <div className="route-input">
                            <img src={departureIcon} alt="출발지 아이콘" className="input-icon" />
                            <input
                                type="text"
                                id="departure"
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)}
                                placeholder="현재 위치"
                            />
                        </div>

                        {/* 도착지 입력 필드 */}
                        <div className="route-input">
                            <img src={arrivalIcon} alt="도착지 아이콘" className="input-icon" />
                            <input  
                                type="text"
                                id="arrival"
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)}
                                placeholder="주차장"
                            />
                        </div>
                    </div>
                </div>

                {/* 🚀 경로 안내 & 돌아가기 버튼 */}
                <div className="button-container">
                    <button className="route-button">경로 안내</button>
                    <button className="back-button">돌아가기</button>
                </div>
            </div>
        </div>
    );
}

export default ParkingRoute;
