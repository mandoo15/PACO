import React, { useState, useEffect, useRef } from "react";
import "../css/direction.css";
import changeIcon from "../img/route/change.svg"; 
import departureIcon from "../img/route/route_depart.svg"; 
import arrivalIcon from "../img/route/route_arrival.svg"

import Navbar from "./Navbar";
import Header from "./header";
import Search from "./Search";

function Direction(){

    const [departure,setDeparture] = useState("");
    const [arrival,setArrival]=useState("");

    const swapLocations = () =>{
        setDeparture(arrival);
        setArrival(departure);
    };


    const searchRoute = () => {
        if (!departure || !arrival) {
            alert("출발지와 도착지를 모두 입력해주세요!");
            return;
        }

        const places = new window.kakao.maps.services.Places();
        const mapContainer = document.getElementById('map');
        const map = new window.kakao.maps.Map(mapContainer, {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 5
        });

        let departurePos = null;
        let arrivalPos = null;

        places.keywordSearch(departure, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                departurePos = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                places.keywordSearch(arrival, function (result, status) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        arrivalPos = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                        new window.kakao.maps.Marker({ map: map, position: departurePos });
                        new window.kakao.maps.Marker({ map: map, position: arrivalPos });

                        const polyline = new window.kakao.maps.Polyline({
                            path: [departurePos, arrivalPos],
                            strokeWeight: 5,
                            strokeColor: '#0453F4',
                            strokeOpacity: 0.7,
                            strokeStyle: 'solid'
                        });

                        polyline.setMap(map);
                        map.setCenter(departurePos);
                    } else alert('도착지 검색 실패');
                });
            } else alert('출발지 검색 실패');
        });
    };

    useEffect(() => {
        const checkKakao = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkKakao);
            initMap();
          }
        }, 300);
    }, []);

    const initMap = () => {
        const container = document.getElementById('map');
        if (!container) {
            console.error('지도 div를 찾을 수 없습니다.');
            return;
        }
    
        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
        };
        new window.kakao.maps.Map(container, options);
    };


    return(
        <div>
            <div className="header">
                <Header />
            </div>

            <div className="search">
                    <Search />
            </div>

            <div className="location-container">
                <div className="input-group">
                    <button className="swap-button" onClick={swapLocations}>
                        <img src={changeIcon} alt="위치 변경" className="swap-icon" />
                    </button>
                    <div className="input-fields">
                        <div className="route-input">
                            <img src={departureIcon} alt="출발지 아이콘" className="input-icon" />
                            <input type="text" value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="현재 위치" />
                        </div>
                        <div className="route-input">
                            <img src={arrivalIcon} alt="도착지 아이콘" className="input-icon" />
                            <input type="text" value={arrival} onChange={(e) => setArrival(e.target.value)} placeholder="주차장" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="route-container">
                <div id="map"></div>
            </div>


            <div className="parking-recommend">
                
            </div>

            <div className="nav">
                    <Navbar />
            </div>
        </div>
    )
}

export default Direction;