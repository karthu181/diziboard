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
    <div className="dbhome-event-container" onClick={onClickEventsDbHome}>
      <div>
        <h1 className="dbhome-events-sub-title">Events</h1>
      </div>
      <hr className="dbhome-events-sub-containers-hr-line" />
      <div className="dbhome-events-bottom-container">
        <div>
          <h1 className="dbhome-events-heading">
            {classSectionEvents.total_events}
          </h1>
          <p className="dbhome-events-description">Year</p>
        </div>
        <div>
          <h1 className="dbhome-events-heading">
            {classSectionEvents.month_events}
          </h1>
          <p className="dbhome-events-description">Month</p>
        </div>
        <div>
          <h1 className="bday-heading">{classSectionEvents.events_in_week}</h1>
          <p className="dbhome-events-description">Week</p>
        </div>
      </div>
    </div>
  );
};

export default EventsDbHome;
