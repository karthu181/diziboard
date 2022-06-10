import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar/NavBar";
import { FaAngleDown } from "react-icons/fa";
import "./Home.css";
import AboutUs from "../AboutUs/AboutUs";

const Home = () => {
  return (
    <div className="bg-container">
      <NavBar />
      <div>
        <div className="home-bg">
          <div>
            <img
              src="http://192.168.0.116:8080/images/logo_big.png"
              alt="logo-big"
            />
          </div>
        </div>
      </div>
      <div className="home-text-image-container">
        <div>
          <h2 className="transform-text">
            TRANSFORM YOUR SCHOOL TO
            <br />
            DIZITAL WORLD
          </h2>
          <div className="buttons-container">
            <button className="download-button">DOWNLOAD</button>
            <button className="take-a-tour-button">
              TAKE A TOUR
              <span className="btn-tour">
                <FaAngleDown />
              </span>
            </button>
          </div>
        </div>
        <div>
          <img
            src="http://192.168.0.116:8080/images/iphone-black.png"
            alt="iphone-black"
          />
        </div>
      </div>
      <AboutUs />
    </div>
  );
};

export default Home;
