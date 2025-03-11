import './App.css';
import Header from './jsx/header.jsx';
import PopUp from './jsx/popup.jsx';
//import Home from './jsx/home.jsx';

function Pop() {
  return (
    <div className="App" style={{backgroundColor: "#efefef"}}>
        <div className="container" style={{maxWidth: "430px", backgroundColor: "white", width: "100%"}}>
            <div className="header">
                <Header/>
            </div>
            <div className="content">
                <PopUp/>
            </div>
        </div>
    </div>
  );
}

export default Pop;