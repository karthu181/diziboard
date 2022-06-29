import "./AttendanceDbHome.css";
import React, { useEffect } from "react";

const AttendanceDbHome = (props) => {
  const { sectionDataForDashboard, settingRightContainer } = props;
  console.log(sectionDataForDashboard);

  //writing right side container display in this component only and passing this jsx returned
  // fn in object as argument to fn
  const displayAttendanceRight = () => {
    return (
      <div>
        <h1 className="right-container-attendance-heading">
          Today Attendance Status
        </h1>
      </div>
    );
  };
  const onClickAttendanceHandler = () => {
    settingRightContainer({ display: displayAttendanceRight });
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };

  useEffect(() => {
    settingRightContainer({ display: displayAttendanceRight });
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  }, []);

  return (
    <div
      className="dbhome-attendence-container"
      onClick={onClickAttendanceHandler}
    >
      <div>
        <h1 className="dbhome-attendance-sub-title">Attendence</h1>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <h1 className="dbhome-day-heading">
          <span className="span">.</span>Total
        </h1>
        <p className="dbhome-day-description">
          {sectionDataForDashboard.totalkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <h1 className="dbhome-day-heading">
          <span className="span">.</span>Kids Present
        </h1>
        <p className="dbhome-day-description">
          {sectionDataForDashboard.presentkids === "NA"
            ? sectionDataForDashboard.totalkids
            : 0}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <h1 className="dbhome-day-heading">
          <span className="span">.</span>Kids Absent
        </h1>
        <p className="dbhome-day-description">
          {sectionDataForDashboard.absentkids === "NA"
            ? 0
            : sectionDataForDashboard.absentkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div>
        <span>
          <h2 className="dbhome-description" data-bind="text: todaydate">
            Wednesday, June 15, 2022
          </h2>
        </span>
      </div>
    </div>
  );
};

export default AttendanceDbHome;
