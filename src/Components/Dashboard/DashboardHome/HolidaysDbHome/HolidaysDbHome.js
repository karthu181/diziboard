import "./HolidaysDbHome.css";
import React from "react";

const HolidaysDbHome = () => {
  return (
    <div className="holiday-container col-4">
      <div>
        <h1 className="db-sub-title">Holiday</h1>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="bday-bottom-container">
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Year</p>
        </div>
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Month</p>
        </div>
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Week</p>
        </div>
      </div>
    </div>
  );
};

export default HolidaysDbHome;
