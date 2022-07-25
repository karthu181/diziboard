import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState , useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import { FaAngleDown } from "react-icons/fa";
import WOW from 'wowjs';
import AboutUs from "../AboutUs/AboutUs";
import Features from "../Features/Features";
import Screens from "../Screens/Screens";
import Download from "../Download/Download";
import Contact from "../Contact/Contact";
import Testimonials from "../Testimonials/Testimonials";
import "animate.css";
import "./Home.css";

const Home = () => {
 const [hideNavClass, setHideNavClass]=useState(["", "nav-items-black"])

  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, [])


//scroll fn to hide or show navbar==> hide navbar when scrolled to top, else show
const scrollFunction=()=>{
  if(document.body.scrollTop>30 || document.documentElement.scrollTop>20){
    setHideNavClass(["nav-show","nav-items-white"])
  }else{
    setHideNavClass(["nav-hide","nav-items-black"])
  }
}


  window.onscroll=()=>{
    scrollFunction()
  }

  return (
    <div className="home-bg-container">
      <section id="home">
        <NavBar hideOrShow={hideNavClass}/>
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
            <h2 className="home-transform-text">
              TRANSFORM YOUR SCHOOL TO
              <br />
              DIZITAL WORLD
            </h2>
            <div className="home-buttons-container">
              <button className="home-download-button wow">DOWNLOAD</button>
              <button className="home-take-a-tour-button wow">
                TAKE A TOUR
                <span className="home-btn-tour">
                  <FaAngleDown />
                </span>
              </button>
            </div>
          </div>
          <div className="home-iphone-black-container">
            <img
            className="home-iphone-black-1"
              src="http://192.168.0.116:8080/images/iphone-black.png"
              alt="iphone-black"
            />
          </div>
        </div>
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section>
      <Testimonials/>
      </section>
      <Features />
      <Screens />
      <Download />
      <Contact />
    </div>
  );
};

export default Home;
