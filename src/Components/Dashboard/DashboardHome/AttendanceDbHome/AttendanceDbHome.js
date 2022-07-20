import "./AttendanceDbHome.css";
import React, { useEffect } from "react";

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

  // const displayAttendanceRight = () => {
  //   let presentKidsData =
  //     sectionDataForDashboard.presentkids === "NA"
  //       ? sectionDataForDashboard.totalkids
  //       : 0;

  //   let absentkidsData =
  //     sectionDataForDashboard.absentkids === "NA"
  //       ? 0
  //       : sectionDataForDashboard.absentkids;
  //   let series = [presentKidsData, absentkidsData];
  //   let options = {
  //     chart: {
  //       width: 380,
  //       type: "pie",
  //     },
  //     labels: ["Kids Present", "Kids Absent"],
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   };

  //   return (
  //     <div>
  //       <h1 className="right-container-attendance-heading">
  //         Today Attendance Status
  //       </h1>
  //       <div>
  //         <div id="chart">
  //           <ReactApexChart
  //             options={options}
  //             series={series}
  //             type="pie"
  //             width={420}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <h1>3D Pie Chart for Student marks in subjects</h1>
  //         <Chart
  //           width={"500px"}
  //           height={"500px"}
  //           chartType="PieChart"
  //           loader={<div>Loading Pie Chart</div>}
  //           data={[
  //             ["total", "value"],
  //             ["present", 10],
  //             ["absent", 5],
  //           ]}
  //           options={{
  //             title: "Exam Performance",
  //             is3D: true,
  //           }}
  //         />
  //       </div>
  //     </div>
  //   );
  // };
  const onClickAttendanceHandler = () => {
    settingRightContainer("attendanceClicked");
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };

  useEffect(() => {
    settingRightContainer("attendanceClicked");
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
        <p className="dbhome-attendance-num">
          {sectionDataForDashboard.totalkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <div className="dbhome-attendance-dot-subhead-container">
          <div className="attendance-dot-green"></div>
          <h1 className="dbhome-day-heading">Kids Present</h1>
        </div>
        <p className="dbhome-attendance-num dbhome-attendance-num-green">
          {sectionDataForDashboard.presentkids}
        </p>
      </div>
      <hr className="dbhome-attendance-sub-containers-hr-line" />
      <div className="dbhome-inner-attendence-container">
        <div className="dbhome-attendance-dot-subhead-container">
          <div className="attendance-dot-blue"></div>
          <h1 className="dbhome-day-heading">Kids Absent</h1>
        </div>
        <p className="dbhome-attendance-num dbhome-attendance-num-red">
          {sectionDataForDashboard.absentkids}
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
