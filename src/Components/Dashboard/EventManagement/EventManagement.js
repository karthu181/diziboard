import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EventTable from "./EventTable";
import "./EventManagement.css";

function EventManagement() {
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://192.168.0.116:8243/mas_EventManagement/1.0/mas_getevents?mas_SchoolUniqueId=5911355945&mas_class=SECOND CLASS&mas_section=&mas_guid=123&mas_requestedFrom=234&mas_requestedOn=324&mas_geoLocation=324",
        {
          headers: {
            Authorization: `Bearer dcf89895-f03a-3526-9ea3-033f87d3d100`,
          },
        }
      )
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  const column = [
    { heading: "Event Name", value: "mas_eventname" },
    { heading: "Event Group", value: "mas_eventgroup" },
    { heading: "Event From Date", value: "mas_eventFromDate" },
    { heading: "Event To Date", value: "mas_eventToDate" },
    { heading: "Event From Time", value: "mas_eventFromTime" },
    { heading: "Event To Time", value: "mas_eventToTime" },
    { heading: "Event Location", value: "mas_eventVenue" },
    { heading: "Description", value: "mas_eventdescription" },
  ];

  return (
    <div>
      Dynamic Table
      <EventTable data={dataTable} column={column} />
    </div>
  );
}

export default EventManagement;
