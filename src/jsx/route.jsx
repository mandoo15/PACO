import React, { useState, useEffect } from "react";
import "../css/route.css";
import changeIcon from "../img/route/change.svg"; 
import departureIcon from "../img/route/route_depart.svg"; 
import arrivalIcon from "../img/route/route_arrival.svg"; 

function ParkingRoute() {
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
                    fetchParkingData();
                });
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);

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
      
            console.log("현재 위치:", latitude, longitude);
      
            const geocoder = new window.kakao.maps.services.Geocoder();
      
            geocoder.coord2Address(longitude, latitude, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const roadAddress = result[0].road_address?.address_name || result[0].address.address_name;
                setDeparture(roadAddress); // 출발지에 도로명 주소 입력
              } else {
                setDeparture(`${latitude},${longitude}`); // 실패하면 위도,경도 fallback
              }
            });
      
            const mapContainer = document.getElementById('map');
            const mapOption = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
      
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

      

    const fetchParkingData = () => {
        fetch("http://localhost:8080/api/parking-lots")
            .then(res => res.json())
            .then(data => setParkingLots(data))
            .catch(err => console.error("주차장 정보 불러오기 실패:", err));
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
                infowindow.open(map, marker);
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
                            <input type="text" id="departure" value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="현재 위치" />
                        </div>
                        <div className="route-input">
                            <img src={arrivalIcon} alt="도착지 아이콘" className="input-icon" />
                            <input type="text" id="arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} placeholder="주차장" />
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