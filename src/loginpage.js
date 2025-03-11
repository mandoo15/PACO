import './App.css';
import LoginHeader from './jsx/loginheader.jsx';
import Login from './jsx/login.jsx';
import FindID from './jsx/find_id.jsx';
import FindPW from './jsx/find_pw.jsx';
import Signup from './jsx/signup.jsx';
import { Routes,Route } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="App" style={{ backgroundColor: "#efefef", }}>
      <div className="container" style={{maxWidth: "430px", width: "100%", backgroundColor: "white",position: "relative",overflow: "hidden"}}>
        
        <div className="background-box" style={{width: "450px", height: "750px", 
            backgroundColor: "#99CAFF", 
            borderRadius: "100px",
            position: "absolute",
            transform: "translatey(20%)"
          }}></div>

        <div className="login-header" style={{ position: "relative", zIndex: "1" }}>
          <LoginHeader />
        </div>
      
        <div className="content" style={{ position: "relative", zIndex: "1" }}>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/find_id" element={<FindID />} />
            <Route path="/find_password" element={<FindPW/>} />
            <Route path="/loginpage" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;