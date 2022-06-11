import "./Features.css";
import React from "react";

const Features = () => {
  return (
    <div id="features" className="features-bg-container">
      <h1 className="features-heading">FEATURES</h1>
      <p>
        The point of your app is the same as your website, just made easier and
        more useful. It is to give parents the ability to get educated on their
        child's education. Anything they need, from school announcements all the
        way up to district events, all information has to be easy to access and
        available all the time.
      </p>
      <div className="features-row-container">
        <div>
          <h1>LIVE BUS TRACKING</h1>
          <p>para</p>
        </div>
        <div>
          <img
            alt="iphone-black"
            src="http://192.168.0.116:8080/images/iphone-black.png"
          />
        </div>
        <div>
          <h1>LIVE BUS TRACKING</h1>
          <p>para</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
