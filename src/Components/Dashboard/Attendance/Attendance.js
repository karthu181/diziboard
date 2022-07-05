import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Attendance.css";
import "react-calendar/dist/Calendar.css";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

const Attendance = () => {
  const [calendarDate, setCalendarDate] = useState("");
  const [attendences, setAttendence] = useState([]);
  const [attendanceImg, setAttendanceImg] = useState(true);
  const [absentArray, setAbsentArray] = useState([]);
  const [fetchedAbsentArr, setFetchedAbsentArr] = useState([]);
  const [currentAbsentArr, setCurrentAbsentArr] = useState([]);
  const [currentAttendance, setCurrentAttendance] = useState([]);
  const [deleteAttendance, setDeleteAttendance] = useState([]);

  const loginToken = Cookies.get("loginToken");

  const handleShow = (date) => {
    let month = date.getMonth() + 1;
    let date1 = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (date1 < 10) {
      date1 = `0${date1}`;
    }
    const reqDate = `${date.getFullYear()}-${month}-${date1}`;

    const getDailyAttendance = async () => {
      const responseObj = await fetch(
        "http://192.168.0.116:8280/mas_daily_attendance/1.0/mas_getdailyattendance",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            header: {
              guid: "0ade4dc8-df9a-b55c-3300-2c7cb870b677",
              responseOn: "2022-7-4.11:3:29",
              responseFrom:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
              userRef: "155AAdfi",
              geoLocation: "anonymous",
              status: "success",
              statuscode: "0",
            },
            body: {
              mas_SchoolUniqueId: "5911355945",
              mas_class: "SECOND CLASS",
              mas_section: "B",
              date: reqDate,
            },
          }),
        }
      );

      const resJson = await responseObj.json();
      const arr = resJson.body;
      const newAbsentArr = [];
      arr.forEach((eachObj) => {
        newAbsentArr.push(eachObj.mas_kiduserID);
      });
      setAbsentArray(newAbsentArr);

      console.log(absentArray);
      console.log(newAbsentArr);
    };
    getDailyAttendance();
  };

  useEffect(() => {
    const getClassKidsList = async () => {
      const response = await fetch(
        "http://192.168.0.116:8280/mas_getclasskidlist/v1/mas_getclasskidlist?mas_SchoolUniqueId=5911355945&mas_Class=SECOND%20CLASS&mas_Section=B&mas_guid=7381378e-8680-291a-6e12-436f2891f837&mas_requestedOn=2022-7-4.12%3A32%3A14&mas_requestedFrom=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.0.0%20Safari%2F537.36&mas_geoLocation=anonymous",

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const kidsListObj = await response.json();
      setAttendence(kidsListObj.body);
    };
    getClassKidsList();
  }, [currentAbsentArr]);

  const onSubmit = () => {
    fetch(
      "http://192.168.0.116:8280/mas_daily_attendance/1.0/mas_postdailyattendance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({
          header: {
            guid: "a7843082-60f1-1301-a041-0f72e6675525",
            responseOn: "2022-7-1.17:8:21",
            responseFrom:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            userRef: "155AAdfi",
            geoLocation: "anonymous",
            status: "success",
            statuscode: "0",
          },
          body: {
            mas_SchoolUniqueId: "5911355945",
            mas_kiduserID: currentAbsentArr,
            mas_class: "SECOND CLASS",
            mas_section: "B",
            mas_date: "",
            mas_noofdaysabs: "1",
            mas_month: "July",
            mas_year: "2022",
            mas_createdby: "155AAdfi",
            mas_createdon: "2022-07-1",
            mas_modifiedby: "155AAdfi",
            mas_modifiedon: "2022-07-1",
            appFor: "web",
          },
        }),
      }
    )
      .then((data) => {
        setDeleteAttendance(data);
        console.log(data);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Popup
        trigger={
          <div className="header1">
            <Calendar
              className="calendar1"
              onChange={handleShow}
              value={calendarDate}
            />
          </div>
        }
      >
        <div className="attendance-container">
          <div className="attendance-popup">
            <div className="attendance-popup-inner">
              {attendences.map((eachObj) => {
                const changeImage = (event) => {
                  setAbsentArray((prevArr) => {
                    let filteredArray = prevArr;
                    if (prevArr.includes(eachObj.mas_kidId)) {
                      filteredArray = prevArr.filter(
                        (each) => each !== eachObj.mas_kidId
                      );
                      return filteredArray;
                    }
                    return [...filteredArray, eachObj.mas_kidId];
                  });

                  setCurrentAbsentArr(eachObj.mas_kidId);
                };

                return (
                  <li className="image-container">
                    {absentArray.includes(eachObj.mas_kidId) ? (
                      <img
                        src="http://192.168.0.116:8080/css/images/kidImages/Absent_seat.png"
                        onClick={changeImage}
                      />
                    ) : (
                      <img
                        src="http://192.168.0.116:8080/css/images/kidImages/Present_seat.png"
                        onClick={changeImage}
                      />
                    )}

                    <p className="text-name">{eachObj.mas_kidId}</p>
                  </li>
                );
              })}
            </div>
            <button className="submit-button" onClick={() => onSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </Popup>

      <h1 className="festival-heading">Festive Holidays List</h1>

      <p className="festival-heading1">No Holidays in this Month</p>
    </>
  );
};
export default Attendance;
