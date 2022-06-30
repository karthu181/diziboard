import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DiarySentRightContainer from "./DiarySentRightContainer/DiarySentRightContainer";
import "./Diary.css";

// conditional rendering in react:
// keep in state setShow (compose)/setshow(sent )
// and keep condition if setShow(compose) then return <div></div>
// else return <div></div>

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

  const [notificationPosted, setNotificationPosted] = useState("");
  const diaryNotifiSendHandler = () => {
    //post notification or message sending message to api
    const postNotification = async () => {
      const postNotificationUrl =
        "http://192.168.0.116:8280/postNotificationsInformation/v1/postNotifications";
      const postNotifiBody = {
        header: {
          guid: "fd7f8de3-559f-3281-5119-55b717d12c03",
          requestedOn: "2022-6-29.17:17:27",
          requestedFrom:
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
          geoLocation: "anonymous",
        },
        body: {
          type: "no",
          mas_notificationID:
            Math.floor(Math.random() * 9000000000) + 1000000000,
          mas_subject: subject,
          mas_kiduserID: [{ kidId: selectedKidId }],
          mas_SchoolUniqueId: "5911355945",
          mas_class: "SECOND CLASS",
          mas_section: "B",
          mas_createdBy: "155AAdfi",
          mas_createdOn: "2022-6-29.17:17:27",
          mas_modifiedBy: "155AAdfi",
          mas_modifiedOn: "2022-6-29.17:17:27",
          mas_notificationType: "individual",
          mas_description: message,
        },
      };
      let options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postNotifiBody),
      };

      let response = await fetch(postNotificationUrl, options);
      let postNotificationResponse = await response.json();
      setNotificationPosted("posted");
    };
    postNotification();
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
        setNotificationsByTeacher(notificationsByTeacherData.body);
      } catch (error) {
        console.log(error);
      }
    };
    getNotificationsByClassTeacher();
  }, [notificationPosted]);

  // event handlers buttons
  const [selectedButton, setSelectedButton] = useState("compose");

  const onClickCompose = () => {
    setSelectedButton("compose");
  };

  const onClickSent = () => {
    setSelectedButton("sent");
  };

  // checked or unchecked

  const [allKidsChecked, setAllKidsChecked] = useState(false);

  const diaryAllkidsCheckboxHandler = (event) => {
    setAllKidsChecked(!allKidsChecked);
  };

  // subject input
  const [subject, setSubject] = useState("");
  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };
  //message change handler
  const [message, setMessage] = useState("");
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  //selected notification handler

  const [selectedNotification, setSelectedNotification] = useState({});
  const [selectedNotifibgColor, setSelectedNotifiColor] = useState("");

  const displayComponent = (selected) => {
    if (selected === "compose") {
      return (
        <div className="compose-container">
          <p className="diary-compose-subhead">Compose</p>

          <hr className="diary-hrline-below-compose" />
          <div className="diary-compose-sub-sub-container">
            {/* what is the use of htmlFor or For */}
            <label className="diary-sub-sub-headings">Send To:</label>
            <div className="diary-input-and-checkbox-container">
              <div>
                {!allKidsChecked ? (
                  <select
                    className="diary-compose-inputbox"
                    placeholder="Select Kid Name"
                    id="examName"
                    value={selectedKidId}
                    onChange={onChangeKidObjHandler}
                  >
                    <option value="Select Kid Name">Select Kid Name</option>
                    {/* fullnameofKid extracted from fetched data */}
                    {classKidsList.map((eachKid) => {
                      const fullNameOfKid = `${eachKid.mas_firstName} ${eachKid.mas_lastName}`;
                      return (
                        <option value={eachKid.mas_kidId}>
                          {fullNameOfKid}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </div>
              <div className="diary-allkids-checkbox-container">
                <input
                  type="checkbox"
                  id="allkids"
                  onChange={diaryAllkidsCheckboxHandler}
                />
                <label htmlFor="allkids" className="diary-input-allkids-label">
                  All Kids
                </label>
              </div>
            </div>
            <label className="diary-sub-sub-headings">Subject:</label>
            <br />
            <input
              className="diary-compose-inputbox"
              onChange={subjectChangeHandler}
            />
            <br />
            <label className="diary-sub-sub-headings">Message:</label>
            <br />
            <textarea
              className="diary-compose-inputbox diary-text-area"
              onChange={messageChangeHandler}
            ></textarea>
            <br />
            <div className="diary-buttons-container">
              <button
                className="diary-send-cancel-buttons"
                onClick={diaryNotifiSendHandler}
              >
                Send
              </button>
              <button className="diary-send-cancel-buttons ms-2">Cancel</button>
            </div>
          </div>
        </div>
      );
    } else if (selected === "sent") {
      return (
        <div className="diary-sent-container">
          <div className="diary-sent-left-allnotifications-container">
            <ul className="diary-sent-ul-container">
              {/* mapping notifications, from notification data */}

              {notificationsByTeacher.map((eachNotifi) => {
                //selected notification handler
                const selectedNotificationHandler = () => {
                  setSelectedNotification(eachNotifi);
                };
                console.log(selectedNotification);
                return (
                  <li
                    className="diary-each-notification-container"
                    onClick={selectedNotificationHandler}
                  >
                    <div className="diary-each-noti-list-item">
                      <div className="diary-first-letter-container w-15">
                        <h1 className="diary-first-letter">
                          {eachNotifi.mas_notificationType === "single"
                            ? eachNotifi.kidName[0].toUpperCase()
                            : "A"}
                        </h1>
                      </div>
                      <div className="diary-sent-each-flex-item w-45">
                        <p className="diary-sub-sub-headings">
                          Subject
                          <span className="diary-sent-subhead-ans">
                            {eachNotifi.mas_subject}
                          </span>
                        </p>
                      </div>
                      <div className="diary-sent-each-flex-item w-15">
                        <p className="diary-sub-sub-headings">
                          To:
                          <span className="diary-sent-subhead-ans">
                            {eachNotifi.mas_notificationType === "single"
                              ? eachNotifi.kidName
                              : "all kids"}
                          </span>
                        </p>
                      </div>
                      <div className="diary-sent-each-flex-item w-25">
                        <p className="diary-sub-sub-headings">
                          date:
                          <span className="diary-sent-subhead-ans">
                            {eachNotifi.mas_createdOn}
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="diary-sent-right-detailed-notifi-container">
            <DiarySentRightContainer
              selectedNotification={selectedNotification}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="diary-bg-container">
      <div className="diary-notifi-heading-container">
        <h1 className="diary-notifi-heading">Notifications</h1>
      </div>
      <div className="notifications-whole-container">
        <ul className="diary-left-tabs-container">
          {/* use curly braces when used string liters as class names to whole classname==>
          means string literals gets evaluated to normal strings
          to add string and variable as classnames, use string literals */}
          <li
            className={`diary-left-tab-btns ${
              selectedButton === "compose" ? "diary-btns-selected-bg" : null
            }`}
            onClick={onClickCompose}
          >
            Compose
          </li>
          <br />
          <li
            className={`diary-left-tab-btns diary-sent-btn ${
              selectedButton === "sent" ? "diary-btns-selected-bg" : null
            }`}
            onClick={onClickSent}
          >
            Sent
          </li>
        </ul>
        {displayComponent(selectedButton)}
      </div>
    </div>
  );
};

export default Diary;
