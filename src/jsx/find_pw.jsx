import { Link } from "react-router-dom";
import '../css/find_pw.css';

function FindPW() {
    return (
        <div className="find-pw-container">
            <div className="find-header">
                <h1>찾기</h1>
                <button id="find-id-button">ID</button>
                <button id="find-PW-button">PW</button>
            </div>


            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="id"></label>
            <input type="text" id="id" name="id" required />
 
            <label htmlFor="email"></label>
            <input type="text" id="email" name="email" required />

            <label htmlFor="birthday"></label>
            <input type="number" id="birthday" name="birthday" required />

            <button id="loginbutton">찾기</button>

            <div className="find-container">
                <Link to="/">로그인 페이지로 돌아가기기</Link> 
            </div>
        </div>
    );
}

export default FindPW;