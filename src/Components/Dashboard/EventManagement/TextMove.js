import React, { useState } from "react";
import EventPopup from "./EventPopup";
import { useSpring, animated } from "react-spring";

import Event from "./Event";
import "./TextMove.css";

const TextMove = ({ text }) => {
  const [key, setKey] = useState(1);
  const [postedEvent, setPostedEvent] = useState();

  const scrolling = useSpring({
    from: { transform: "translate(60%,0)" },
    to: { transform: "translate(-60%,0)" },
    config: { duration: 30000 },
    reset: true,
    //reverse: key % 2 === 0,
    onRest: () => {
      setKey(key + 10);
    },
  });

  const getEventPostRes = (resp) => {
    setPostedEvent(resp);
  };

  return (
    <div className="event-bg-container">
      <div className="move-container">
        <h1 className="move-head">Upcoming Events</h1>

        <div key={key}>
          <animated.div style={scrolling} className="scroll">
            ------------------------No Events Yet...... No Events
            Yet.....-----------------------------
          </animated.div>
        </div>
      </div>
      <div className="move-bottom-container">
        <h1 className="manage-event">Manage Event</h1>
        <h1 className="add-event span-para">
          <span className="span-holiday">
            <EventPopup getEventPostRes={getEventPostRes} />
          </span>{" "}
          Add Event
        </h1>
      </div>
      <div className="data-table-container">
        <div className="data-table-inner-border">
          <Event postedEvent={postedEvent} />
        </div>
      </div>
    </div>
  );
};

export default TextMove;
