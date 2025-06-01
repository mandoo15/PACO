import { Routes, Route, useLocation } from 'react-router-dom';
import Opening from './jsx/opening';
import Login from './jsx/login';
import Signup from './jsx/signup';
import FindID from './jsx/find_id';
import FindPW from './jsx/find_pw';
import PopUp from './jsx/popup';
import Main from './jsx/main'; 
import ParkingRoute from './jsx/route';
import LoginLayout from './jsx/LoginLayout'; 
import MyPage from "./jsx/mypage";
import Direction from "./jsx/direction"

import RegionPage from './jsx/RegionPage';

function App() {

  return (
    <div className="App" style={{ backgroundColor: "#efefef" }}>
      <div className="container" style={{ maxWidth: "430px", width: "100%", backgroundColor: "white", position: "relative", overflow: "hidden" }}>

        <div className="content" style={{ position: "relative", zIndex: "1" }}>
          <Routes>
            <Route path="/" element={<Opening />} />
            <Route path="/jsx/login" element={<LoginLayout><Login /></LoginLayout>} />
            <Route path="/jsx/signup" element={<LoginLayout><Signup /></LoginLayout>} />
            <Route path="/jsx/find_id" element={<LoginLayout><FindID /></LoginLayout>} />
            <Route path="/jsx/find_pw" element={<LoginLayout><FindPW /></LoginLayout>} />
            <Route path="/Popup" element={<PopUp />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/route" element={<ParkingRoute />} /> 
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/direction" element={<Direction />} />


            <Route path="/region/:regionName" element={<RegionPage />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
