import React from "react";
import AttendenceDbHome from "./AttendanceDbHome/AttendanceDbHome";
import BirthdaysDbHome from "./BirthdaysDbHome/BirthdaysDbHome";
import ClassTeacherDbHome from "./ClassTeacherDbHome/ClassTeacherDbHome";
import EventsDbHome from "./EventsDbHome/EventsDbHome";
import HolidaysDbHome from "./HolidaysDbHome/HolidaysDbHome";
import KidApprovalsDbHome from "./KidApprovalsDbHome/KidApprovalsDbHome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import "highcharts/modules/accessibility";
import "./DashboardHome.css";

highcharts3d(Highcharts);

const DashboardHome = () => {

  const [birthdaysObj, setBirthdaysObj] = useState({});
  const [sectionDataForDashboard, setSectionDataForDashboard] = useState({});
  const [classSectionEvents, setClassSectionEvents] = useState({});
  const [holidaysData, setHolidaysData] = useState({});
  const loginToken = Cookies.get("loginToken");


  //getUserProfile from local storage
  const loggedInUserProfile = JSON.parse(localStorage.getItem("diziUserProfile"));

  //displaying right container
  const [rightContainerItemSelected, setRightContainerItemSelected] = useState(
    "attendanceClicked"
  );

  const settingRightContainer = (dashboardItemSelected) => {
    setRightContainerItemSelected(dashboardItemSelected);
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };

  //displaying right container till here

  //get current date and time
  const currentDateAndTime = () => {
    const dateObj = new Date();
    const monthReq = dateObj.getMonth() + 1 > 9 ? dateObj.getMonth() : "0" + (dateObj.getMonth() + 1)
    const dateReq = dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate()
    const currentDateTime = `${dateObj.getFullYear()}-${monthReq}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()
      }`;
    return currentDateTime;
  };


  //get DateOnly form date time
  const getDateOnly = () => {
    const dateTime = currentDateAndTime()
    const dateOnly = dateTime.split(" ")[0]
    return dateOnly
  }


  useEffect(() => {
    //get birthdays on page launch
    const getBirthdays = async () => {
      const getBirthdaysUrl = "https://192.168.0.116:8243/mas_KidBirthday/1.0/getBirthDays"

      const getBirthdaysQueryParams =
        `?mas_SchoolUniqueId=${loggedInUserProfile.mas_schoolUniqueId}&Guid=xyz&GeoLocation=anonymous&RequestedFrom=x&RequestedOn=x&mas_class=${loggedInUserProfile.mas_class}&mas_section=${loggedInUserProfile.mas_section}`;

      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        let response = await fetch(getBirthdaysUrl + getBirthdaysQueryParams, options);
        let birthdaysResponse = await response.json();
        setBirthdaysObj(birthdaysResponse.body);
      } catch (error) {
        console.log(error);
      }
    };
    getBirthdays();

    //get section data for dashboard

    const getSectionDataForDashboard = async () => {
      const getSectionDataForDashboardUrl = `https://192.168.0.116:8243/mas_sectiondata4dashboard/v1/mas_getsectiondata4dashboard`

      const getSectionDataForDashboardQueryParams =
        `?mas_class=${loggedInUserProfile.mas_class}&mas_section=${loggedInUserProfile.mas_section}&mas_emailId=${loggedInUserProfile.mas_emailId}&mas_SchoolUniqueId=${loggedInUserProfile.mas_schoolUniqueId}&mas_Date=${getDateOnly()}&mas_guid=4266f57b-063a-a6b7-d837-c3674d90d33d&mas_requestedFrom=xyz&mas_requestedOn=xyz&mas_geoLocation=xyz`;

      console.log(getSectionDataForDashboardUrl + getSectionDataForDashboardQueryParams)

      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        let response = await fetch(getSectionDataForDashboardUrl + getSectionDataForDashboardQueryParams, options);
        let sectionDataResponse = await response.json();
        console.log(sectionDataResponse)
        setSectionDataForDashboard(sectionDataResponse.body);
      } catch (error) {
        console.log(error);
      }
    };
    getSectionDataForDashboard();

    //get events

    const getClassSectionEvents = async () => {

      const getClassSectionEventsUrl = `https://192.168.0.116:8243/mas_classsectionevents/v1/mas_getclasssectionevents`
      const getClassSectionEventsQueryParams =
        `?mas_guid=a&mas_requestedFrom=b&mas_requestedOn=b&mas_geoLocation=b&mas_schoolUniqueId=${loggedInUserProfile.mas_schoolUniqueId}&mas_class=${loggedInUserProfile.mas_class}&mas_section=${loggedInUserProfile.mas_section}&mas_userRef=b`;
      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        let response = await fetch(getClassSectionEventsUrl + getClassSectionEventsQueryParams, options);
        let classSectionEvents = await response.json();
        setClassSectionEvents(classSectionEvents.body);
      } catch (error) {
        console.log(error);
      }
    };

    getClassSectionEvents();

    //holidays data

    const getHolidays = async () => {
      try {
        const data = {
          header: {
            guid: uuidv4(),
            requestedOn: "2022-06-24T09:57:02.690Z",
            requestedFrom:
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
            geoLocation: "anonymous",
          },
          body: {
            mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
            date: "2022-06-24",
          },
        };
        const getHolidaysUrl =
          "http://192.168.0.116:8280/ssa_sttendance/1.0/ssa_holidays";
        let options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        let response = await fetch(getHolidaysUrl, options);
        let dataHolidays = await response.json();
        setHolidaysData(dataHolidays.body);
      } catch (error) {
        console.log(error);
      }
    };

    getHolidays();
  }, []);

  //displaying right container based on click of dashboard items

  //easeOutBounce is an animation is used in piechart
  var easeOutBounce = function (pos) {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos;
    }
    if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
    }
    if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
    }
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  };

  Math.easeOutBounce = easeOutBounce;

  //present and absent kids data from sectionDataForDashboard to display
  //sectionDataForDashboard is already stored in state, so no need to store present/absent data in state again
  //this present/absent data is sub data of sectionDataForDashboard

  //maintaining chartOptions in state to render chat again on small change in chartOptions


  const [threeD, setThreeD] = useState(true);
  const chartOptions = {
    colors: ['rgb(104, 193, 130)', 'rgb(237, 102, 71)',],
    chart: {
      backgroundColor: "#f3f9fe",
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 30,
        beta: 0,
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
      },
    },
    legend: {
      //legend meand labels outside chart with color boxes
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemMarginTop: 0,
      itemMarginBottom: 5,
      symbolRadius: 0, // changes circle default to square
    },
    credits: { enabled: false }, //to disable highcharts logo from chart
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        allowPointSelect: true,
        cursor: "pointer",
        depth: threeD ? 60 : 0,
        dataLabels: {
          enabled: true,
          distance: -50,
          connectorWidth: 0,
          format: "<b>{point.percentage:.1f}%</b>",
        },
        animation: {
          duration: 1000,
          easing: "easeOutBounce",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        data: [
          ["Kids Present", sectionDataForDashboard.presentkids],
          ["Kids Absent", sectionDataForDashboard.absentkids],
        ],
      },
    ],
  };

  const Handler2d = () => {
    setThreeD(false);
  };

  const Handler3d = () => {
    setThreeD(true);
  };



  //displaying right container fn
  const displayRightContainer = () => {
    //switch statement to display which item is clicked attendace or holiday or birthdays
    switch (rightContainerItemSelected) {
      case "attendanceClicked":
        return (
              <div className="dbhome-right-attendance-piechart-container">
                <div>
                  <h1 className="db-right-container-attendance-heading">
                    Today Attendance Status
                  </h1>
                  {sectionDataForDashboard.absentkids === "NA" ?
              <div>Attendance have not taken yet</div> :
              <>
                  <div className="dbhome-piechart-container">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                  </div>
                  <div className="dbhome-piechart-btns-container">
                    <button className={`dbhome-piechart-button ${!threeD && "active-d"}`} onClick={Handler2d}>2D</button>
                    <button className={`dbhome-piechart-button ${threeD && "active-d"}`} onClick={Handler3d}>3D</button>
                  </div>
                  </>}
                </div>
              </div>
        );
        break; // no use of break statement when used return statement, it comes out of switch on return statement
      case "birthdaysClicked":
        return (
          <div>
            <h1 className="db-right-container-birthdays-heading">
              Birthdays Today
            </h1>
            <div className="db-birthdays-right-container-body">
              <p>No items to display</p>
            </div>
          </div>
        );
      case "holidaysClicked":
        return (
          <div>
            <h1 className="db-right-container-holidays-heading">
              Holidays List In Week
            </h1>
            <p className="dbhome-holidays-no-items-to-display">
              No items to display
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dbhome-bg-container">
      <div className="dbhome-left-container">
        <div className="dbhome-upper-container">
          <ClassTeacherDbHome />
          {/*
          <ClassTeacherDbHome className="col-4" />
          useless giving col-4 here*/}
          <BirthdaysDbHome
            birthdaysObj={birthdaysObj}
            settingRightContainer={settingRightContainer}
          />
          {/*useless giving col-4 here*/}
          <AttendenceDbHome
            sectionDataForDashboard={sectionDataForDashboard}
            settingRightContainer={settingRightContainer}
          />
          {/*useless giving col-4 here*/}
          {/* you should give width 30%-flexobox to div inside Component
            not to compoenent
            similarly grid system give col-4 to div inside component not to compoenent
            eg: div inside <AttendenceDbHome/> not to <AttendenceDbHome/> directly
            know difference between flex and grid */}
        </div>
        <div className="dbhome-lower-container">
          <KidApprovalsDbHome
            sectionDataForDashboard={sectionDataForDashboard}
          />
          <EventsDbHome classSectionEvents={classSectionEvents} />
          <HolidaysDbHome
            holidaysData={holidaysData}
            settingRightContainer={settingRightContainer}
          />
        </div>
      </div>
      <div className="dbhome-right-container">{displayRightContainer()}</div>
    </div>
  );
};

export default DashboardHome;
