import LoginHeader from './loginheader';

function LoginLayout({ children }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        className="background-box"
        style={{
          width: "450px",
          height: "750px",
          backgroundColor: "#99CAFF",
          borderRadius: "100px",
          position: "absolute",
          transform: "translateY(20%)",
          zIndex: "0", 
        }}
      ></div>


      <div style={{ position: "relative", zIndex: "1" }}>
        <LoginHeader />
      </div>

      <div style={{ position: "relative", zIndex: "2" }}>
        {children}
      </div>
    </div>
  );
}

export default LoginLayout;
