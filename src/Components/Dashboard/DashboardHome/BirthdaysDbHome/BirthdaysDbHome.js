import "./BirthdaysDbHome.css";
import React from "react";

const BirthdaysDbHome = () => {
  return (
    <div className="birthday-container col-4">
      <div>
        <h1 className="db-sub-title">Birthday</h1>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="bday-bottom-container">
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Month</p>
        </div>
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Week</p>
        </div>
        <div>
          <h1 className="bday-heading">0</h1>
          <p className="bday-description">Today</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdaysDbHome;
