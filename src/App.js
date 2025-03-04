import './App.css';
import Navbar from './jsx/Navbar.jsx';
import Header from './jsx/header.jsx';
import Home from './jsx/home.jsx';

function App() {
  return (
    <div className="App" style={{backgroundColor: "#efefef"}}>
        <div className="container" style={{maxWidth: "430px", backgroundColor: "white", width: "100%"}}>
            <div className="header">
                <Header/>
            </div>
            <div className="content">
                <Home/>
            </div>
            <div className="nav">
                <Navbar/>
            </div>
        </div>
    </div>
  );
}

export default App;
