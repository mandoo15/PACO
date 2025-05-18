// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
//
// // 지역명 매핑
// const regionMap = {
//     서울: "seoul",
//     부산: "busan",
//     대구: "daegu",
//     인천: "incheon",
//     광주: "gwangju",
//     대전: "daejeon",
//     울산: "ulsan",
//     세종: "sejong",
//     경기: "gyeonggi",
//     강원: "gangwon",
//     충북: "chungbuk",
//     충남: "chungnam",
//     전북: "jeonbuk",
//     전남: "jeonnam",
//     경북: "gyeongbuk",
//     경남: "gyeongnam",
//     제주: "jeju",
// };
//
// function RegionPage() {
//     const { regionName } = useParams();
//     const [parkingData, setParkingData] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         if (!regionName) return;
//
//         const fetchData = async () => {
//             const apiRegion = regionMap[regionName] || regionName;
//
//             try {
//                 const response = await fetch(`https://testing-ne5w.onrender.com/parking_info/${apiRegion}`);
//                 const textData = await response.text();
//
//                 console.log("[응답 XML 원문]", textData);
//
//                 // HTML로 파싱 (서버 응답이 HTML 형식으로 감싸져 있는 경우 대응)
//                 const htmlDoc = new DOMParser().parseFromString(textData, "text/html");
//                 const items = htmlDoc.querySelectorAll("item"); // <item> 추출
//
//                 console.log("[파싱된 item 수]", items.length);
//
//                 const parsedData = Array.from(items).map((item, index) => ({
//                     id: index,
//                     name: item.querySelector("stationName")?.textContent || "이름 없음",
//                     address: item.querySelector("addr")?.textContent || "주소 없음",
//                     hour: item.querySelector("parkingHour")?.textContent || "운영시간 없음",
//                     payInfo: item.querySelector("payInfo")?.textContent || "요금 정보 없음",
//                     total: item.querySelector("totalParkingSpaces")?.textContent || "-",
//                     pay: item.querySelector("parkingPay")?.textContent || "-"
//                 }));
//
//                 setParkingData(parsedData);
//             } catch (err) {
//                 console.error("XML 파싱 실패:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, [regionName]);
//
//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>{regionName} 지역 주차장 정보</h2>
//             {loading ? (
//                 <p>불러오는 중...</p>
//             ) : parkingData.length === 0 ? (
//                 <p>데이터가 없습니다.</p>
//             ) : (
//                 <ul>
//                     {parkingData.map((lot) => (
//                         <li key={lot.id} style={{ marginBottom: "20px" }}>
//                             <strong>{lot.name}</strong><br />
//                             주소: {lot.address}<br />
//                             운영시간: {lot.hour}<br />
//                             요금 안내: {lot.payInfo}<br />
//                             총 주차면: {lot.total}개<br />
//                             요금: {lot.pay}원
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }
//
// export default RegionPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const regionMap = {
    서울: "seoul",
    부산: "busan",
    대구: "daegu",
    인천: "incheon",
    광주: "gwangju",
    대전: "daejeon",
    울산: "ulsan",
    세종: "sejong",
    경기: "gyeonggi",
    강원: "gangwon",
    충북: "chungbuk",
    충남: "chungnam",
    전북: "jeonbuk",
    전남: "jeonnam",
    경북: "gyeongbuk",
    경남: "gyeongnam",
    제주: "jeju"
};

function RegionPage() {
    const { regionName } = useParams();
    const [parkingData, setParkingData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!regionName) return;

        const fetchData = async () => {
            const apiRegion = regionMap[regionName] || regionName;

            try {
                const response = await fetch(`https://testing-ne5w.onrender.com/parking_info/${apiRegion}`);
                const jsonData = await response.json(); // JSON으로 바로 파싱
                console.log("[응답 JSON]", jsonData);

                const parsedData = jsonData.map((item, index) => ({
                    id: index,
                    name: item.stationName || "이름 없음",
                    address: item.addr || "주소 없음",
                    hour: item.parkingHour || "운영시간 없음",
                    payInfo: item.payInfo || "요금 정보 없음",
                    total: item.totalParkingSpaces ?? "-",
                    pay: item.parkingPay ?? "-"
                }));

                setParkingData(parsedData);
            } catch (err) {
                console.error("JSON 파싱 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [regionName]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>{regionName} 지역 주차장 정보</h2>
            {loading ? (
                <p>불러오는 중...</p>
            ) : parkingData.length === 0 ? (
                <p>데이터가 없습니다.</p>
            ) : (
                <ul>
                    {parkingData.map((lot) => (
                        <li key={lot.id} style={{ marginBottom: "20px" }}>
                            <strong>{lot.name}</strong><br />
                            주소: {lot.address}<br />
                            운영시간: {lot.hour}<br />
                            요금 안내: {lot.payInfo}<br />
                            총 주차면: {lot.total}개<br />
                            요금: {lot.pay}원
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RegionPage;



