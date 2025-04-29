import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Slider.css";


const row1 = ["가까운 곳 좋아아", "비용이 싼 곳", "보안이 좋은 곳"];
const row2 = ["여유로운 공간간", "넓은 공간", "전기차 충전 가능"];
const row3 = ["CCTV 설치", "야간 주차 가능", "월 정기권 할인"];
const row4 = ["장애인 주차 구역", "대형차 주차 가능", "무료 주차 시간 제공"];

const SliderRow = ({ items, animationDuration, direction }) => {
    const sliderRef = useRef(null);
    const [animate, setAnimate] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.animationPlayState = animate ? "running" : "paused";
        }
    }, [animate]);

    const handleClick = (text) => {
        navigate(`/details?category=${encodeURIComponent(text)}`);
    };

    return (
        <div
            className={`slide-row ${direction}`}
            onMouseEnter={() => setAnimate(false)}
            onMouseLeave={() => setAnimate(true)}
        >
            <div
                ref={sliderRef}
                className="slide-content"
                style={{ 
                    animation: `scroll ${animationDuration}s linear infinite`,
                    animationDirection: direction === "left" ? "normal" : "reverse",
                    display: "flex", 
                    whiteSpace: "nowrap",
                    minWidth: "200%", /* 최소 너비를 크게 설정해 끊김 방지 */
                }}
            >
                {[...items, ...items, ...items, ...items].map((text, index) => (
                    <div 
                        key={index} 
                        className={`slide-item ${index % 2 === 0 ? 'blue-bg' : 'white-bg'}`} 
                        onClick={() => handleClick(text)}
                        style={{ cursor: "pointer" }}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Slider = () => {
    return (
        <div className="slider-wrapper">
            <div className="slide-container">
                <SliderRow items={row1} animationDuration={10} direction="left" />
                <SliderRow items={row2} animationDuration={12} direction="right" />
                <SliderRow items={row3} animationDuration={14} direction="left" />
                <SliderRow items={row4} animationDuration={16} direction="right" />
            </div>
        </div>
    );
};

export default Slider;