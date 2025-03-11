import React from "react";
import "../css/Parking_SearchResult.css";

const ParkingSearchResult = () => {
    const parkingData = {
        name: "공항신도시 공영주차장",
        photo: "https://via.placeholder.com/150", // 예제 이미지
        distance: "500",
        totalSeats:583,
        remainingSeats: 236,
    };

    return (
            <div className="ParkingSearch">
                <div className="search-container">
                    <div className="parking-result card">
                        <div className="parking-name">{parkingData.name}</div>
                        <div className="parking-photo">
                            <img src={parkingData.photo} alt="주차장 사진" />
                        </div>
                         
                        <div className="parking-info">
                            <div className="remaining-seats">
                                <h3>[잔여 좌석]</h3>
                                <div className="remain-parking">
                                    <h4>전체 좌석 : {parkingData.totalSeats}</h4>
                                    <h4>남은 좌석 : {parkingData.remainingSeats}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ParkingSearchResult;
