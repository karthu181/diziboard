import "./AttendanceDbHome.css";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AttendanceDbHome = (props) => {
  const { sectionDataForDashboard, settingRightContainer } = props;

  //get date time in attendance box in dashboard
  const getDateTime = function() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursady",
      "Friday",
      "Saturday",
    ];
    const todayDateTimeObj = new Date();
    const getDay = dayNames[todayDateTimeObj.getDay()];
    const getMonth = monthNames[todayDateTimeObj.getMonth()];
    const getTodayDateOnly = todayDateTimeObj.getDate();
    const getYear = todayDateTimeObj.getFullYear();

    return `${getDay}, ${getMonth} ${getTodayDateOnly}, ${getYear}`;
  };

  //writing right side container display in this component only and passing this jsx returned
  // fn in object as argument to fn
  const displayAttendanceRight = () => {
    let presentKidsData =
      sectionDataForDashboard.presentkids === "NA"
        ? sectionDataForDashboard.totalkids
        : 0;

    let absentkidsData =
      sectionDataForDashboard.absentkids === "NA"
        ? 0
        : sectionDataForDashboard.absentkids;
    let series = [presentKidsData, absentkidsData];
    let options = {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Kids Present", "Kids Absent"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    return (
      <div>
        <h1 className="right-container-attendance-heading">
          Today Attendance Status
        </h1>
        <div>
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={420}
            />
          </div>
        </div>
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
        <div className="dbhome-attendance-dot-subhead-container">
          <div className="attendance-dot-blue"></div>
          <h1 className="dbhome-day-heading">Total</h1>
        </div>
        <p className="dbhome-day-description">
          {sectionDataForDashboard.totalkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <div className="dbhome-attendance-dot-subhead-container">
          <div className="attendance-dot-green"></div>
          <h1 className="dbhome-day-heading">Kids Present</h1>
        </div>
        <p className="dbhome-day-description dbhome-day-description-green">
          {sectionDataForDashboard.presentkids === "NA"
            ? sectionDataForDashboard.totalkids
            : 0}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <div className="dbhome-attendance-dot-subhead-container">
          <div className="attendance-dot-blue"></div>
          <h1 className="dbhome-day-heading">Kids Absent</h1>
        </div>
        <p className="dbhome-day-description dbhome-day-description-red">
          {sectionDataForDashboard.absentkids === "NA"
            ? 0
            : sectionDataForDashboard.absentkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div>
        <span>
          <h2
            className="dbhome-attendance-bottom-description"
            data-bind="text: todaydate"
          >
            {getDateTime()}
          </h2>
        </span>
      </div>
    </div>
  );
};

export default AttendanceDbHome;
