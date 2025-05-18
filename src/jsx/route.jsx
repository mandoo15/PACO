import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/route.css";
import changeIcon from "../img/route/change.svg";
import departureIcon from "../img/route/route_depart.svg";
import arrivalIcon from "../img/route/route_arrival.svg";

function ParkingRoute() {
    const { regionName } = useParams(); // 주소에서 지역명 추출
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [parkingLots, setParkingLots] = useState([]);

    const swapLocations = () => {
        setDeparture(arrival);
        setArrival(departure);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
                clearInterval(interval);
                window.kakao.maps.load(() => {
                    initMap();
                    getCurrentLocation();
                    fetchParkingData(); // 주차장 데이터 불러오기
                });
            }
        }, 300);

        return () => clearInterval(interval);
    }, [regionName]);

    const initMap = () => {
        const container = document.getElementById('map');
        if (!container) return;

        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
        };
        new window.kakao.maps.Map(container, options);
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('브라우저가 GPS를 지원하지 않습니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.coord2Address(longitude, latitude, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const roadAddress = result[0].road_address?.address_name || result[0].address.address_name;
                        setDeparture(roadAddress);
                    } else {
                        setDeparture(`${latitude},${longitude}`);
                    }
                });

                const mapContainer = document.getElementById('map');
                const map = new window.kakao.maps.Map(mapContainer, {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 3
                });

                new window.kakao.maps.Marker({
                    map: map,
                    position: new window.kakao.maps.LatLng(latitude, longitude)
                });
            },
            () => {
                alert('GPS 위치 정보를 가져올 수 없습니다.');
            }
        );
    };

    const fetchParkingData = async () => {
        const apiRegion = regionName || "seoul"; // 기본값 seoul
        const url = `https://testing-ne5w.onrender.com/parking_info/${apiRegion}`;

        try {
            const response = await fetch(url);
            const jsonData = await response.json();

            const geocoder = new window.kakao.maps.services.Geocoder();

            const withCoordinates = await Promise.all(
                jsonData.map((item, index) => {
                    return new Promise((resolve) => {
                        geocoder.addressSearch(item.addr, (result, status) => {
                            if (status === window.kakao.maps.services.Status.OK) {
                                resolve({
                                    id: index,
                                    name: item.stationName || "이름 없음",
                                    address: item.addr,
                                    available: item.totalParkingSpaces ?? "-",
                                    latitude: parseFloat(result[0].y),
                                    longitude: parseFloat(result[0].x)
                                });
                            } else {
                                resolve(null);
                            }
                        });
                    });
                })
            );

            setParkingLots(withCoordinates.filter(Boolean));
        } catch (err) {
            console.error("주차장 정보 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps || parkingLots.length === 0) return;

        const mapContainer = document.getElementById('map');
        const map = new window.kakao.maps.Map(mapContainer, {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 4
        });

        const markerImage = new window.kakao.maps.MarkerImage(
            process.env.PUBLIC_URL + "/img/marker.svg",
            new window.kakao.maps.Size(36, 36)
        );

        let currentlyOpenInfoWindow = null; // 변수를 선언

        parkingLots.forEach((lot) => {
            const pos = new window.kakao.maps.LatLng(lot.latitude, lot.longitude);

            const marker = new window.kakao.maps.Marker({
                map: map,
                position: pos,
                image: markerImage
            });

            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:8px; font-size:14px;"><b>${lot.name}</b><br/>남은 좌석: ${lot.available}개</div>`
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                if (currentlyOpenInfoWindow) {
                    currentlyOpenInfoWindow.close(); // 이전 창 닫기
                }
                infowindow.open(map, marker);       // 현재 창 열기
                currentlyOpenInfoWindow = infowindow; // 현재 창
            });
        });

    }, [parkingLots]);

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

    return (
        <div className="route-container">
            <div id="map" style={{ width: "100%", height: "400px", marginBottom: "20px", border: "2px solid #0453F4", borderRadius: "10px" }}></div>

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
                <div className="button-container">
                    <button className="route-button" onClick={searchRoute}>경로 안내</button>
                    <button className="back-button">돌아가기</button>
                </div>
            </div>
        </div>
    );
}

export default ParkingRoute;
