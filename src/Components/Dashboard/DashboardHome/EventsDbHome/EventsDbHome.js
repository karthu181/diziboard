import "./EventsDbHome.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const EventsDbHome = (props) => {
  const { classSectionEvents } = props;
  console.log(classSectionEvents);

  const navigate = useNavigate();
  const onClickEventsDbHome = () => {
    navigate("/dashboard/eventmanagement");
  };

  return (
    <div
      className="event-container col-md-4 col-8"
      onClick={onClickEventsDbHome}
    >
      <div>
        <h1 className="db-sub-title">Events</h1>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="bday-bottom-container">
        <div>
          <h1 className="bday-heading">{classSectionEvents.total_events}</h1>
          <p className="bday-description">Year</p>
        </div>
        <div>
          <h1 className="bday-heading">{classSectionEvents.month_events}</h1>
          <p className="bday-description">Month</p>
        </div>
        <div>
          <h1 className="bday-heading">{classSectionEvents.events_in_week}</h1>
          <p className="bday-description">Week</p>
        </div>
      </div>
    </div>
  );
};

export default EventsDbHome;
