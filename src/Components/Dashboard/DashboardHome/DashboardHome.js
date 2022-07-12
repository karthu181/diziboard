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
import Chart from "react-google-charts";
import "./DashboardHome.css";

const DashboardHome = () => {
  const loggedInUserProfile = JSON.parse(
    localStorage.getItem("diziUserProfile")
  );

  const [birthdaysObj, setBirthdaysObj] = useState({});
  const [sectionDataForDashboard, setSectionDataForDashboard] = useState({});
  const [classSectionEvents, setClassSectionEvents] = useState({});
  const [holidaysData, setHolidaysData] = useState({});
  const loginToken = Cookies.get("loginToken");

  //getUserProfile from local storage
  const diziUserProfile = JSON.parse(localStorage.getItem("diziUserProfile"));
  console.log(diziUserProfile);

  //displaying right container
  const [rightContainerItemSelected, setRightContainerItemSelected] = useState({
    display: () => {},
  });

  const settingRightContainer = (dashboardItemSelected) => {
    setRightContainerItemSelected(dashboardItemSelected);
    console.log(dashboardItemSelected);
    //sending fn as argument is ok but keeping fn in useState is giving errors in dashboardHome
  };
  // const displayingRightContainer = () => {
  //   if (rightContainer === "attendance") {
  //     return <h1>Today Attendance status</h1>;
  //   } else if (rightContainer === "holidays") {
  //     return <h1>holidays</h1>;
  //   } else if (rightContainer === "birthdays") {
  //     return <h1>birthdays</h1>;
  //   }
  // };

  //displaying right container till here

  useEffect(() => {
    //get birthdays on page launch
    const getBirthdays = async () => {
      try {
        const getBirthdaysUrl =
          "https://192.168.0.116:8243/mas_KidBirthday/1.0/getBirthDays?mas_SchoolUniqueId=5911355945&Guid=xyz&GeoLocation=anonymous&RequestedFrom=x&RequestedOn=x&mas_class=SECOND%20CLASS&mas_section=B";

        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let response = await fetch(getBirthdaysUrl, options);
        let birthdaysResponse = await response.json();
        setBirthdaysObj(birthdaysResponse.body);
      } catch (error) {
        console.log(error);
      }
    };
    getBirthdays();

    //get section data for dashboard

    const getSectionDataForDashboard = async () => {
      try {
        const getSectionDataForDashboardUrl =
          "https://192.168.0.116:8243/mas_sectiondata4dashboard/v1/mas_getsectiondata4dashboard?mas_class=SECOND%20CLASS&mas_section=B&mas_emailId=ct2%40gmail.com&mas_SchoolUniqueId=5911355945&mas_Date=22-06-23&mas_guid=4266f57b-063a-a6b7-d837-c3674d90d33d&mas_requestedFrom=xyz&mas_requestedOn=xyz&mas_geoLocation=xyz";
        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let response = await fetch(getSectionDataForDashboardUrl, options);
        let sectionDataResponse = await response.json();
        // console.log(sectionDataResponse);
        setSectionDataForDashboard(sectionDataResponse.body);
      } catch (error) {
        console.log(error);
      }
    };
    getSectionDataForDashboard();

    //get events

    const getClassSectionEvents = async () => {
      try {
        const getClassSectionEventsUrl =
          "https://192.168.0.116:8243/mas_classsectionevents/v1/mas_getclasssectionevents?mas_guid=a&mas_requestedFrom=b&mas_requestedOn=b&mas_geoLocation=b&mas_schoolUniqueId=5911355945&mas_class=SECOND%20CLASS&mas_section=B&mas_userRef=b";
        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        let response = await fetch(getClassSectionEventsUrl, options);
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

  const [threeD, setThreeD] = useState(true);

  const displayRightContainer = () => {
    switch (rightContainerItemSelected) {
      case "attendanceClicked":
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
        //handlers
        const handler2d = () => {
          setThreeD(false);
        };
        const handler3d = () => {
          setThreeD(true);
        };
        return (
          <div>
            <div>
              <h1>3D Pie Chart for Student marks in subjects</h1>
              <Chart
                width={"500px"}
                height={"500px"}
                chartType="PieChart"
                loader={<div>Loading Pie Chart</div>}
                data={[
                  ["total", "value"],
                  ["present", 10],
                  ["absent", 5],
                ]}
                options={{
                  title: "Exam Performance",
                  is3D: true,
                  animation: {
                    duration: 1000,
                    easing: "out",
                  },
                  vAxis: { minValue: 0, maxValue: 1000 },
                }}
              />
            </div>
          </div>
        );
        break;
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
