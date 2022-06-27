import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Diary.css";

const Diary = () => {
  const loginToken = Cookies.get("loginToken");
  const [selectedKidId, setSelectedKidId] = useState("");
  const [classKidsList, setClassKidsList] = useState([]);
  const [notificationsByTeacher, setNotificationsByTeacher] = useState([]);

  const getSelectedKidId = (id) => {
    setSelectedKidId(id);
  };

  const onChangeKidObjHandler = (event) => {
    setSelectedKidId(event.target.value);
    getSelectedKidId(event.target.value);
  };

  useEffect(() => {
    const getClasskidsList = async () => {
      try {
        let getClasskidsListUrl =
          "https://192.168.0.116:8243/mas_getclasskidlist/v1/mas_getclasskidlist?mas_SchoolUniqueId=5911355945&mas_Class=SECOND%20CLASS&mas_Section=B&mas_guid=xyz&mas_geoLocation=xyz&mas_requestedFrom=xyz&mas_requestedOn=anonymous";
        // let bodyData = {
        //   mas_SchoolUniqueId: "5911355945",
        //   mas_Class: "SECOND CLASS",
        //   mas_Section: "B",
        //   mas_guid: "xyz",
        //   mas_requestedOn: "xyz",
        //   mas_requestedFrom: "xyz",
        //   mas_geoLocation: "anonymous",
        // };
        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        let response = await fetch(getClasskidsListUrl, options);
        let classKidsListData = await response.json();
        // setSchoolExamTypes(classKidsListData);
        setClassKidsList(classKidsListData.body);
        console.log(classKidsListData);
      } catch (e) {
        console.log(e);
      }
    };
    getClasskidsList();

    // get notification by classteacher
    const getNotificationsByClassTeacher = async () => {
      try {
        const data = {
          header: {
            guid: "e1dcc8fb-7728-3642-2fa2-c980bc1f9e84",
            requestedOn: "2022-6-24.18:22:10",
            requestedFrom:
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
            geoLocation: "anonymous",
          },
          body: {
            mas_SchoolUniqueId: "5911355945",
            mas_class: "SECOND CLASS",
            mas_section: "B",
            mas_createdBy: "155AAdfi",
            mas_createdOn: "2022-6-24.18:22:10",
            mas_modifiedBy: "155AAdfi",
            mas_modifiedOn: "2022-6-24.18:22:10",
          },
        };
        const getNotificationsByTeacherUrl =
          "http://192.168.0.116:8280/postNotificationsInformation/v1/getNotificationsByClassTeacher";
        let options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const response = await fetch(getNotificationsByTeacherUrl, options);
        const notificationsByTeacherData = await response.json();
        setNotificationsByTeacher(notificationsByTeacherData);
      } catch (error) {
        console.log(error);
      }
    };
    getNotificationsByClassTeacher();
  }, []);

  return (
    <div className="diary-bg-container">
      <div>
        <h1>Notifications</h1>
      </div>
      <div className="notifications-whole-container">
        <div className="diary-left-tabs-container">
          <button className="diary-left-tab-btns">Compose</button>
          <br />
          <button className="diary-left-tab-btns">Sent</button>
        </div>
        <div className="compose-container">
          <p>Compose</p>
          <hr />

          {/* what is the use of htmlFor or For */}
          <label>Send To:</label>
          <br />

          <select
            className="ms-auto"
            placeholder="Select Kid Name"
            id="examName"
            value={selectedKidId}
            onChange={onChangeKidObjHandler}
          >
            <option value="Select Kid Name">Select Kid Name</option>
            {/* fullnameofKid extracted from fetched data */}
            {classKidsList.map((eachKid) => {
              const fullNameOfKid = `${eachKid.mas_firstName} ${eachKid.mas_lastName}`;
              return <option value={eachKid.mas_kidId}>{fullNameOfKid}</option>;
            })}
          </select>
          <br />
          <label>Subject:</label>
          <br />
          <input />
          <br />
          <label>Message:</label>
          <br />
          <textarea></textarea>
          <br />
          <button>Send</button>
          <button>Cancel</button>
        </div>
      </div>

      <div>
        <div className="compose-container">
          <div className="diary-each-notification-container">
            <h1 className="diary-first-letter">name</h1>
            <p>Subject sample notify</p>
            <p>To: all kids</p>
            <p>date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
