import React from "react";
import { useEffect } from "react";
import WOW from 'wowjs';
import {FaApple} from "react-icons/fa";
import {GrAndroid} from "react-icons/gr";
import "./Download.css";

const Download = () => {
  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, [])
  return (
    <div>
      <section id="download" className="home-download-bg-container">
        <h1 className="download-text">DOWNLOAD NOW</h1>
        <hr className="download-hr-line" />
        <p className="download-description">
          DiZi Board mobile applications include all the essential business SMS
          functions with the convenience of being able to operate it from your
          smartphone. Download now!.
        </p>
        <div>
          <img className="download-3-img wow" src="http://192.168.0.116:8080/images/three1.png" alt="downloadImg" />
        </div>
      </section>
      <AvailableOn />
    </div>
  );
};

export default Download;

const AvailableOn = () => {

  {/* available on section */ }
  return (
    <section className="available-on d-flex flex-row" >
      <div className="available-on-des wow" data-wow-duration="1s">
        <div className="available-title" >
          <h2>Available On </h2>
          <p>Dizi Board mobile applications are available for ios and android platform.<br /> Download it today!</p>
        </div>
      </div>
      <div className="available-on-ios wow">
        <a href="#" >
          <div className="available-no-padding">
            <div className="available-on-item">
              <FaApple className="available-on-item-icon"/>
              <div className="available-on-inner">
                <h2> iOS</h2>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="available-on-android wow">
        <a href="#">
          <div className="available-no-padding">
            <div className="available-on-item">
              <div className="available-on-item-icon">
              <GrAndroid />
              </div>
              <div className="available-on-inner">
                <h2> ANDROID</h2>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>

  )
}
