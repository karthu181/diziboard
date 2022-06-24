import "./AttendanceDbHome.css";
import React from "react";

const AttendanceDbHome = (props) => {
  const { sectionDataForDashboard } = props;

  return (
    <div className="attendence-container col-md-4 col-8">
      <div>
        <h1 className="db-sub-title">Attendence</h1>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="inner-attendence-container">
        <h1 className="day-heading">
          <span className="span">.</span>Total
        </h1>
        <p className="day-description">{sectionDataForDashboard.totalkids}</p>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="inner-attendence-container">
        <h1 className="day-heading">
          <span className="span">.</span>Kids Present
        </h1>
        <p className="day-description">{sectionDataForDashboard.presentkids}</p>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="inner-attendence-container">
        <h1 className="day-heading">
          <span className="span">.</span>Kids Absent
        </h1>
        <p className="day-description">{sectionDataForDashboard.absentkids}</p>
      </div>
      <hr className="db-sub-containers-hr-line" />
      <div className="oj-flex-item oj-lg-12 ">
        <span>
          <h6 className="description" data-bind="text: todaydate">
            Wednesday, June 15, 2022
          </h6>
        </span>
      </div>
    </div>
  );
};

export default AttendanceDbHome;
