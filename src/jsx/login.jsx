import { Link, useNavigate } from "react-router-dom";
import '../css/login.css';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <h1>로그인</h1>

            <label htmlFor="id"></label>
            <input type="text" id="id" name="id" placeholder="ID" required />

            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="비밀번호" required />

            <button className="loginbutton" onClick={() => navigate("/PopUp")}>로그인</button>

            <div className="find-container">
                <Link to="/jsx/find_id">아이디 찾기</Link> /
                <Link to="/jsx/find_pw">비밀번호 찾기</Link> /
                <Link to="/jsx/signup">회원가입</Link>
            </div>
        </div>
    );
}

export default Login;
