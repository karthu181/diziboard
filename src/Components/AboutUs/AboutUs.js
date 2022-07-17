import React from "react";
import { FaRegCalendarAlt, FaRegFlag } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { useEffect } from "react";
import WOW from 'wowjs';
import "animate.css";
import "./AboutUs.css";

const AboutUs = () => {

  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, [])

  return (
    <div className="about-us-bg-container">
      <h1 className="about-us-text">ABOUT US</h1>
      <hr className="about-us-hr-line" />
      <p className="about-us-description">
        DiZi Board is a digital platform which aims to promote, recognize and
        encourage excellence in the use of technology in schools.
      </p>

      <div className="about-us-why-choose-us-img-text-container">
        <div className="wow about-us-iphone-container">
          <img
            className="about-us-iphone"
            alt="iphone"
            src="http://192.168.0.116:8080/images/why%20iphone.png"
          />
        </div>
        <div>
          <div className="about-us-why-chose-dizi-text-container">
            <h2 className="about-us-why-choose-dizi-text wow">
              WHY CHOOSE DIZI BOARD?
            </h2>
          </div>
          <div className="about-us-why-choose-us-text-container wow" data-wow-delay="0.5s">
            <div className="about-us-why-choose-us-icons">
              <FaRegCalendarAlt />
            </div>
            <div>
              <h3 className="about-us-dizital-subheadings">DIZITAL DIARY</h3>
              <p className="about-us-dizital-sub-des">
                "Dizital Diary", makes parent-school easy, engaging and
                effective communication. It provided real time updates to
                Parents.
              </p>
            </div>
          </div>
          <div className="about-us-why-choose-us-text-container wow" data-wow-delay="0.7s">
            <div className="about-us-why-choose-us-icons">
              <HiUserGroup />
            </div>
            <div>
              <h3 className="about-us-dizital-subheadings">
                DIZITAL ATTENDANCE
              </h3>
              <p className="about-us-dizital-sub-des">
                "Dizital Attendance", makes teacher job easy. It helps schools
                easily capture and share attendance with parents.
              </p>
            </div>
          </div>
          <div className="about-us-why-choose-us-text-container wow" data-wow-delay="0.9s">
            <div className="about-us-why-choose-us-icons">
              <FaRegFlag />
            </div>
            <div>
              <h3 className="about-us-dizital-subheadings">DIZITAL EVENT</h3>
              <p className="about-us-dizital-sub-des">
                "Dizital Event", It is a mobile-first platform that enables the
                parent to reminds them of key events at the right moments. A
                scheduling option that schools can use to send pre-composed
                messages to parent.{" "}
              </p>
            </div>
          </div>
          <div className="about-us-why-choose-us-text-container wow" data-wow-delay="1.1s">
            <div>
              <img
                className="about-us-track-img"
                alt="tracxk"
                src="http://192.168.0.116:8080/images/tracxk.png"
              />
            </div>
            <div>
              <h3 className="about-us-dizital-subheadings dizital-subheadings-track">
                DIZITAL TRACKING
              </h3>
              <p className="about-us-dizital-sub-des">
                "Dizital Tracking", It is a mobile-first platform that will
                enable tracking and monitor of kids transportation. It will give
                instant notification to parent and school about bus location,
                route, and ETA to their stop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
