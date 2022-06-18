import "./EventsDbHome.css";
import React from "react";

const EventsDbHome = () => {
  return (
    <div className="event-container col-4">
      <div>
        <h1 className="db-sub-title">Events</h1>
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

export default EventsDbHome;
