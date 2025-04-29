import React from "react";
import "../css/home.css";
import Search from "./Search";

// 이미지 경로

function Home() {
    return (
        <div className="Home">
            <div className="search">
                <Search/>
            </div>

            <div className="Home-content-container">
                <div className="MapOrImg">
                </div>

                <div className="ParkList">
                    <div className="list-nav">
                        <p style={{width: "80%", textAlign: "left"}}>주차장 목록</p>
                        <p style={{ width: "20%", border: "2px solid rgba(4, 83, 244, 0.4)", borderRadius: "45px", fontSize: "16px", padding: "1%"}}>가까운순</p> {/*나중에 드롭다운으로 바꿔*/}
                    </div>

                    <div className="parking-list-container">
                        <div className="parking-list-content">
                            <p>네모 주차장</p>
                        </div>

                        <div className="parking-list-content">
                            <p>동글 주차장</p>
                        </div>

                        <div className="parking-list-content">
                            <p>세모 주차장</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
