import { Link } from "react-router-dom";
import '../css/login.css';
function Login() {
    return (
        <div className="login-container">
            <h1>로그인</h1>

            <label htmlFor="id"></label>
            <input type="text" id="id" name="id" placeholder="ID"required />

            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="비밀번호" required />

            <button className="loginbutton">로그인</button>

            <div className="find-container">
                <Link to="/find_id">아이디 찾기</Link> /
                <Link to="/find_pw">비밀번호 찾기</Link> /
                <Link to="/signup">회원가입</Link>
            </div>
        </div>
    );
}

export default Login;