import './HeaderFile.css'
import FlickrLogo from '../Assets/FlickrLogo.png';
import LbiLogo from '../Assets/LbiLogo.png';
function HeaderFile() {
    return (
      <div className="headerFile">
        <div><img src= {LbiLogo} width = "100" height = "60"></img></div>
        <div>
        <img src = {FlickrLogo} width ="140" height = "40" style={{marginTop:'20px'}}></img></div>
      </div>
    );
  }
  
  export default HeaderFile;
  