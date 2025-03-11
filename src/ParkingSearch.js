
import Navbar from './jsx/Navbar.jsx';
import Header from './jsx/header.jsx';
import ParkingSearchResult from './jsx/Parking_SearchResult.jsx';

function ParkingSearchPage() { 
    return (
      <div className="All" style={{ backgroundColor: "#efefef" }}>
        <div className="container" style={{ maxWidth: "430px", backgroundColor: "white", width: "100%" }}>
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <ParkingSearchResult /> 
          </div>
          <div className="nav">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
  
  export default ParkingSearchPage; // ✅ 변경된 함수 이름을 export
  