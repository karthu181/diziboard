import React from "react";
import AttendenceDbHome from "./AttendanceDbHome/AttendanceDbHome";
import BirthdaysDbHome from "./BirthdaysDbHome/BirthdaysDbHome";
import ClassTeacherDbHome from "./ClassTeacherDbHome/ClassTeacherDbHome";
import EventsDbHome from "./EventsDbHome/EventsDbHome";
import HolidaysDbHome from "./HolidaysDbHome/HolidaysDbHome";
import KidApprovalsDbHome from "./KidApprovalsDbHome/KidApprovalsDbHome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [birthdaysObj, setBirthdaysObj] = useState({});
  const [sectionDataForDashboard, setSectionDataForDashboard] = useState({});
  const [classSectionEvents, setClassSectionEvents] = useState({});
  const [holidaysData, setHolidaysData] = useState({});

  const loginToken = Cookies.get("loginToken");
  useEffect(() => {
    //get birthdays on page launch
    const getBirthdays = async () => {
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
    };
    getBirthdays();

    //get section data for dashboard

    const getSectionDataForDashboard = async () => {
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
    };
    getSectionDataForDashboard();

    //get events

    const getClassSectionEvents = async () => {
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
    };

    getClassSectionEvents();

    //holidays data

    const getHolidays = async () => {
      const data = {
        header: {
          guid: "5d06f101-1066-07e7-d3ca-8fdf4c1f7d64",
          requestedOn: "2022-06-24T09:57:02.690Z",
          requestedFrom:
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
          geoLocation: "anonymous",
        },
        body: { mas_SchoolUniqueId: "5911355945", date: "2022-06-24" },
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
    };

    getHolidays();
  }, []);
  console.log(holidaysData);

  return (
    <div className="container-fluid dbhome-bg-container">
      <div className="row">
        <div className="col-8 db-left-container">
          <div className="col-12 db-upper-container">
            <ClassTeacherDbHome className="col-4" />
            {/*useless giving col-4 here*/}
            <BirthdaysDbHome birthdaysObj={birthdaysObj} />
            {/*useless giving col-4 here*/}
            <AttendenceDbHome
              sectionDataForDashboard={sectionDataForDashboard}
            />
            {/*useless giving col-4 here*/}
            {/* you should give width 30%-flexobox to div inside Component
            not to compoenent
            similarly grid system give col-4 to div inside component not to compoenent
            eg: div inside <AttendenceDbHome/> not to <AttendenceDbHome/> directly
            know difference between flex and grid */}
          </div>
          <div className="col-12 db-lower-container">
            <KidApprovalsDbHome
              sectionDataForDashboard={sectionDataForDashboard}
            />
            <EventsDbHome classSectionEvents={classSectionEvents} />
            <HolidaysDbHome holidaysData={holidaysData} />
          </div>
        </div>
        <div className="col-4 dbhome-right-container"></div>
        {/* <HomeFooter /> */}
      </div>
    </div>
  );
};

export default DashboardHome;

// import "./AllPages.css";

// import ClassTeacher from "../ClassTeacher/ClassTeacher";

// import Birthday from "../Birthday/Birthday";

// import Attendence from "../Attendence/Attendence";

// import Events from "../Events/Events";

// import Holiday from "../Holiday/Holiday";

// import KidApprovals from "../KidApprovals/KidApprovals";

// import HomeFooter from "../../HomeFooter/HomeFooter";

// import Header from "../../Header/Header";

// const AllPages = () => {
//   return (
//     <div className="allpage-bg-container">
//       <Header />

//       <div className="upper-container">
//         <ClassTeacher />

//         <Birthday />

//         <Attendence />
//       </div>

//       <div className="lower-container">
//         <KidApprovals />

//         <Events />

//         <Holiday />
//       </div>

//       <HomeFooter />
//     </div>
//   );
// };

// export default AllPages;
