import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../css/route.css";

import Navbar from './Navbar.jsx';
import Header from './header.jsx';
import Search from "./Search.jsx";

function ParkingRoute() {
    const { regionName } = useParams();
    const [parkingLots, setParkingLots] = useState([]);
    const mapRef = useRef(null);
    const [selectedLot, setSelectedLot] = useState(null);
    const [myLocation, setMyLocation] = useState(null);
  
    useEffect(() => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                if (container && !mapRef.current) {
                    mapRef.current = new window.kakao.maps.Map(container, {
                        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                        level: 3
                    });
                }
                getCurrentLocation();
                fetchParkingData();
            });
        }
        // eslint-disable-next-line
    }, [regionName]);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('브라우저가 GPS를 지원하지 않습니다.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setMyLocation({latitude, longitude});
                if (mapRef.current) {
                    mapRef.current.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
                    new window.kakao.maps.Marker({
                        map: mapRef.current,
                        position: new window.kakao.maps.LatLng(latitude, longitude)
                    });
                }
            },
            () => {
                alert('GPS 위치 정보를 가져올 수 없습니다.');
            }
        );
    };

  
    const fetchParkingData = async () => {
        const apiRegion = regionName || "seoul";
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

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function toRad(Value) {
        return (Value * Math.PI) / 180;
    }
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; 
    }   

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps || parkingLots.length === 0) return;
        if (!mapRef.current) return;

        
        if (window.parkingMarkers) {
            window.parkingMarkers.forEach(marker => marker.setMap(null));
        }
        window.parkingMarkers = [];

        const markerImage = new window.kakao.maps.MarkerImage(
            process.env.PUBLIC_URL + "/img/marker.svg",
            new window.kakao.maps.Size(36, 36)
        );

        let currentlyOpenInfoWindow = null;

        parkingLots.forEach((lot) => {
            const pos = new window.kakao.maps.LatLng(lot.latitude, lot.longitude);

            const marker = new window.kakao.maps.Marker({
                map: mapRef.current,
                position: pos,
                image: markerImage
            });
            window.parkingMarkers.push(marker);

            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:8px; font-size:14px;"><b>${lot.name}</b><br/>남은 좌석: ${lot.available}개</div>`
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                if (currentlyOpenInfoWindow) {
                    currentlyOpenInfoWindow.close();
                }
                infowindow.open(mapRef.current, marker);
                currentlyOpenInfoWindow = infowindow;

                let lotWithDistance = { ...lot };
                if (myLocation) {
                    const dist = getDistanceFromLatLonInKm(
                        myLocation.latitude,
                        myLocation.longitude,
                        lot.latitude,
                        lot.longitude
                    );
                    lotWithDistance.distance = dist < 1
                        ? `${Math.round(dist * 1000)}m`
                        : `${dist.toFixed(2)}km`;
                } else {
                    lotWithDistance.distance = "거리 계산 불가";
                }
                setSelectedLot(lotWithDistance);

            });
        });
    }, [parkingLots]);

    return (
        <div>
            <div className="header">
                    <Header />
            </div>

            <div className="search">
                    <Search />
            </div>

            <div className="route-container">
                <div id="map"></div>
            </div>

            <div className="parking-info">
            {selectedLot ? (
                <div className="info-card">
                <div className="card-header">
                    <div className="card-title">{selectedLot.name}</div>
                    <div className="card-subtitle">
                    <span>주차 시간: </span>
                    <span>차종: </span>
                    </div>
                </div>
                <div className="distance-row">
                    <span>현재 위치에서 <b>{selectedLot.distance ?? "000km"}</b></span>
                </div>

            
                <div className="row-horizontal">
                    <span>
                    <strong>혼잡도:</strong> <span className="congestion">{selectedLot.congestion ?? "보통"}</span>
                    </span>
                    <span>
                     🪙요금: <span className="price">{selectedLot.price ?? "1000원"}</span>
                    </span>
                </div>

            
                <div className="remain">{selectedLot.available}석 남았습니다!</div>

            
                <div className="card-detail">
                    <div>📍 주소: {selectedLot.address}</div>
                    <div>🕓 운영시간: {selectedLot.openHour ?? "00:00"} ~ {selectedLot.closeHour ?? "00:00"}</div>
                    <div>⭐ 평점: {selectedLot.rating ?? "4.7 / 5"} ({selectedLot.ratingCount ?? "000명 참여"})</div>
                </div>

                <button className="route-btn">경로 안내</button>
                </div>
            ) : (
                <div className="empty-info">주차장을 클릭하면 정보가 여기에 표시됩니다.</div>
            )}
            </div>

            <div className="nav">
                    <Navbar />
            </div>
        </div>
 
    );
}

export default ParkingRoute;

