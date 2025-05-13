import { Link } from "react-router-dom";
import '../css/signup.css';
function Signup() {
    return (
        <div className="signup-container">
            <h1>회원가입</h1>

            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="id"></label>
            <input type="text" id="id" name="id" required />

            <button id="duplicate check"></button>

            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="password-check"></label>
            <input type="password-check" id="password-check" name="password-check" required />

            <button id="loginbutton">로그인</button>

            <div className="find-container">
                <Link to="/jsx/find_id">아이디 찾기</Link> /
                <Link to="/jsx/find_password">비밀번호 찾기</Link>
            </div>
        </div>
    );
}

export default Signup;