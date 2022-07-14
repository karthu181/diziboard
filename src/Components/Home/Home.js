import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { FaAngleDown } from "react-icons/fa";

import AboutUs from "../AboutUs/AboutUs";
import Features from "../Features/Features";
import Screens from "../Screens/Screens";
import Download from "../Download/Download";
import Contact from "../Contact/Contact";
import "animate.css";
import "./Home.css";

const Home = () => {
  const [display, setDisplay] = useState("d-block");
  // var navDisplayOrHideClassName = "display";

  // const onMouseMoveHandler = () => {
  //   navDisplayOrHideClassName = "hide";
  // };

  const onMouseMoveHandler = () => {
    setDisplay("d-block");
    setTimeout(() => {
      setDisplay("d-none");
    }, 5000);
  };

  return (
    <div className="home-bg-container">
      <section id="home">
        <NavBar displayOrHide={display} />
        <div onMouseMove={onMouseMoveHandler}>
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
              <button className="home-download-button">DOWNLOAD</button>
              <button className="home-take-a-tour-button">
                TAKE A TOUR
                <span className="home-btn-tour">
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
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <Features />
      <Screens />
      <Download />
      <Contact />
    </div>
  );
};

export default Home;
