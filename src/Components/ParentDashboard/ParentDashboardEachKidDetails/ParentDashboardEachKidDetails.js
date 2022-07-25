import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { axios } from "axios";
import { useLocation } from "react-router-dom";
import ParentsEachkidAttendance from "./ParentsEachkidAttendace/ParentsEachkidAttendance";
import ParentsEachkidDairy from "./ParentsEachkidDairy/ParentsEachkidDairy";
import ParentsEachkidEventsHolidays from "./ParentsEachkidEventsHolidays/ParentsEachkidEventsHolidays";
import ParentsEachkidMarks from "./ParentsEachkidMarks/ParentsEachkidMarks";
import "./ParentDashboardEachKidDetails.css";
import { each } from "highcharts";

const ParentDashboardEachKidDetails = () => {
  const location = useLocation();
  console.log(location);
  const kidDetailsObj = location.state.eachKid;
  const loginToken = Cookies.get("loginToken");
  const loggedInUserProfile = JSON.parse(
    localStorage.getItem("diziUserProfile")
  );

 
  const [kidTeacherName, setKidTeacherName] = useState("");
  const [kidDob, setKidDob] = useState("");
  const [activeTab, setActiveTab]=useState()

  const currentDateAndTime = () => {
    const dateObj = new Date();
    const month =
      dateObj.getMonth() + 1 <= 9
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const onlyDate =
      dateObj.getDate() <= 9 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const hours =
      dateObj.getHours() <= 9 ? `0${dateObj.getHours()}` : dateObj.getHours();
    const seconds =
      dateObj.getSeconds() <= 9
        ? `0${dateObj.getSeconds()}`
        : dateObj.getSeconds();
    const minutes =
      dateObj.getMinutes() <= 9
        ? `0${dateObj.getMinutes()}`
        : dateObj.getSeconds();
    const currentDateTime = `${dateObj.getFullYear()}-${month}-${onlyDate} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
  };

  useEffect(() => {
   
    // get kid teacher name with get method
    const getKidTeacherName = async () => {
      try {
        const getKidTeacherNameUrl =
          "http://192.168.0.116:8280/mas_kidteachername/1.0/getkidteachername";
        const getKidTeacherNameParams = `?mas_schoolUniqueId=${
          kidDetailsObj.mas_SchoolUniqueId
        }&mas_class=${kidDetailsObj.mas_Class}&mas_section=${
          kidDetailsObj.mas_Section
        }&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=${currentDateAndTime()}`;

        const res = await axios.get(
          getKidTeacherNameUrl + getKidTeacherNameParams,
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
              Accept: "application/json",
            },
          }
        );

        // in fetch we convert body javascript obj  to json string
        // in axios data  auto converts to json string we just give data js obj
        const parsedRes = res.data;
        const kidTeacher = parsedRes.body.FullName;
        setKidTeacherName(kidTeacher);
      } catch (error) {
        console.log(error);
      }
    };
    getKidTeacherName();

    // get dob of birth of kid

    const getKidDob = async () => {
      try {
        const getKidDobUrl =
          "http://192.168.0.116:8280/mas_DOBDate/1.0/getkiddobdate";
        const getKidDobParams = `?mas_kidId=${
          kidDetailsObj.mas_kidId
        }&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=${currentDateAndTime()}`;

        const res = await axios.get(getKidDobUrl + getKidDobParams, {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
          },
        });

        // in fetch we convert body javascript obj  to json string
        // in axios data  auto converts to json string we just give data js obj
        const parsedRes = res.data;
        const kidDobDate = parsedRes.body.mas_date_of_birth;
        setKidDob(kidDobDate);
      } catch (error) {
        console.log(error);
      }
    };
    getKidDob();
  }, []);

  //using strngs more than once leads to mistake prone
  //strings are stored in variable to use for conditions
  const eventsStr="eventsHolidays"
  const attendanceStr="attendance"
  const marksStr="marks"
  const dairyStr="dairy"
  const eventsHolidaysHandler=()=>{
      setActiveTab(eventsStr)
  }
  const attendancesHandler=()=>{
    setActiveTab(attendanceStr)
  }

  const marksHandler=()=>{
    setActiveTab(marksStr)
  }

  const dairyHandler=()=>{
    setActiveTab(dairyStr)
  }

  //direct switch is not working in jsx curly braces so use function and the use switch st inside fn
  const displayActiveTabRes=()=>{
    switch (activeTab){
      case eventsStr:
        return (<ParentsEachkidEventsHolidays kidDetailsObj={kidDetailsObj}/>)
      case attendanceStr:
        return (<ParentsEachkidAttendance kidDetailsObj={kidDetailsObj}/>)
      case marksStr:
        return (<ParentsEachkidMarks kidDetailsObj={kidDetailsObj}/>) 
      case dairyStr:
        return (<ParentsEachkidDairy kidDetailsObj={kidDetailsObj}/>)     
    }
  }

  return (
    <div className="parent-eachkid-bg-container">
      <div className="parent-kid-basic-data-container">
        <div className="parent-eachkid-profile-img-container">
          <img
            className="parent-eachkid-profile-img"
            alt="profile-img"
            src={kidDetailsObj.mas_Image}
          />
        </div>
        <div className="parent-eachkid-name-container">
          <p>
            Kid Name : {kidDetailsObj.mas_firstName}{" "}
            {kidDetailsObj.mas_lastName}
          </p>
          <p>School Name : {kidDetailsObj.mas_schoolName}</p>
        </div>
        <div className="parent-eachkid-3rd-container">
          <p>Kid Class : <span>{kidDetailsObj.mas_Class}</span></p>
          <p>Kid Id : <span>{kidDetailsObj.mas_kidId}</span></p>
          <p>Kid Section : <span>SECTION-{kidDetailsObj.mas_Section}</span></p>
        </div>
        <div className="parent-eachkid-4th-cont">
          <p>Date Of Birth : <span>{kidDob}</span></p>
          <p>Class Teacher : <span>{kidTeacherName}</span></p>
          <p>School Unique Id : <span>{kidDetailsObj.mas_SchoolUniqueId}</span></p>
        </div>
        <div className="parent-eachkid-5th-cont">x</div>
      </div>
      <div className="parent-eachkid-details-subhead-container">
        <div className={`parent-eachkid-details-subhead ${activeTab===eventsStr&& "parent-eachkid-active-tab"}`} onClick={eventsHolidaysHandler}>
            <p>Events & Holidays</p>
        </div>
        <div className={`parent-eachkid-details-subhead ${activeTab===attendanceStr&& "parent-eachkid-active-tab"}`}onClick={attendancesHandler}>
            <p>Attendance</p>
        </div>
        <div className={`parent-eachkid-details-subhead ${activeTab===marksStr&& "parent-eachkid-active-tab"}`}onClick={marksHandler}>
            <p>Marks</p>
        </div>
        <div className={`parent-eachkid-details-subhead ${activeTab===dairyStr&& "parent-eachkid-active-tab"}`} onClick={dairyHandler}>
            <p>Dairy</p>
        </div>
      </div>
      <div>
        {displayActiveTabRes()}
      </div>
    </div>
  );
};
export default ParentDashboardEachKidDetails;
