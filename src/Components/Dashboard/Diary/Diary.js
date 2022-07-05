import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DiarySentRightContainer from "./DiarySentRightContainer/DiarySentRightContainer";
import { v4 as uuidv4 } from "uuid";
import "./Diary.css";

// conditional rendering in react:
// keep in state setShow (compose)/setshow(sent )
// and keep condition if setShow(compose) then return <div></div>
// else return <div></div>

const Diary = () => {
  const loginToken = Cookies.get("loginToken");
  const loggedInUserProfile = localStorage.getItem("diziUserProfile");

  const [selectedKidsArr, setSelectedKidsArr] = useState([]);
  const [displayKidsListDropdown, setDisplayKidsListDropdown] = useState(false);
  const [classKidsList, setClassKidsList] = useState([]);
  const [searchedKidsList, setSearchedKidsList] = useState([]);
  const [searchWOrdInKidsList, setSearchWordInKidsList] = useState("");

  // issue or problem if you dont give empty array inside useState because if u use array methods
  // then you using methods to undefined so: cannot use array methoda to undefined
  // dont forget to give empty array as initialisation

  const [notificationsByTeacher, setNotificationsByTeacher] = useState([]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const currentDateAndTime = () => {
    const dateObj = new Date();
    const currentDate = `${dateObj.getFullYear()}-${dateObj.getMonth() +
      1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
    return currentDate;
  };

  // checked or unchecked

  const [allKidsChecked, setAllKidsChecked] = useState(false);

  const diaryAllkidsCheckboxHandler = (event) => {
    setAllKidsChecked(!allKidsChecked);
  };

  const [notificationPosted, setNotificationPosted] = useState(false);

  // get only selected kid ids not other details for fetching

  const getSelectedKidIdsArr = () => {
    let selectedKidIdsArr = [];
    selectedKidsArr.forEach((selectedKid) => {
      selectedKidIdsArr.push({ kidId: selectedKid.mas_kidId });
    });
    return selectedKidIdsArr;
  };

  //send message button handler
  const newMessageSendBtnHandler = () => {
    //post notification or message sending message to api
    const postNotification = async () => {
      try {
        //dont give query parameters as hardcode (in string static) add params and in variables
        //params must be dynamic, that varibale might change==> parameters might change
        const postNotificationUrl =
          "http://192.168.0.116:8280/postNotificationsInformation/v1/postNotifications";
        const postNotifiBody = {
          header: {
            guid: uuidv4(),
            requestedOn: "2022-6-29.17:17:27",
            requestedFrom:
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
            geoLocation: "anonymous",
          },
          body: allKidsChecked
            ? {
                type: "yes",
                //only for jsx we use curly braces for expression evaluation for others no need curly braces
                mas_notificationID:
                  Math.floor(Math.random() * 9000000000) + 1000000000,
                mas_subject: subject,
                mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
                mas_class: loggedInUserProfile.mas_class,
                mas_section: loggedInUserProfile.mas_section,
                mas_createdBy: loggedInUserProfile.mas_userRef,
                //get created by from local storage from role data, from userProfile api call
                mas_createdOn: currentDateAndTime(),
                mas_modifiedBy: loggedInUserProfile.mas_userRef,
                mas_modifiedOn: currentDateAndTime(),
                mas_notificationType: "all",
                mas_description: message,
              }
            : {
                type: "no",
                //only for jsx we use curly braces for expression evaluation for others no need curly braces
                mas_notificationID:
                  Math.floor(Math.random() * 9000000000) + 1000000000,
                mas_subject: subject,
                mas_kiduserID: getSelectedKidIdsArr(),
                mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
                mas_class: loggedInUserProfile.mas_class,
                mas_section: loggedInUserProfile.mas_section,
                mas_createdBy: loggedInUserProfile.mas_userRef,
                //get created by from local storage from role data, from userProfile api call
                mas_createdOn: currentDateAndTime(),
                mas_modifiedBy: loggedInUserProfile.mas_userRef,
                mas_modifiedOn: currentDateAndTime(),
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

        const response = await fetch(postNotificationUrl, options);
        const postNotificationResponse = await response.json();
        console.log(postNotificationResponse);
      } catch (error) {}
    };
    //condition to send message is all fields must be entered
    if (subject === "" || message === "") {
      alert("all Fields are mandatory");
    } else {
      postNotification();
      setNotificationPosted(!notificationPosted);
      setSubject("");
      setMessage("");
      setSelectedKidsArr([]);
      alert("sent");
    }
  };

  useEffect(() => {
    const getClasskidsList = async () => {
      try {
        //dont give query parameters as hardcode (in string static) add params and in variables
        //params must be dynamic, that varibale might change==> parameters might change
        let getClasskidsListUrl =
          "https://192.168.0.116:8243/mas_getclasskidlist/v1/mas_getclasskidlist?mas_SchoolUniqueId=5911355945&mas_Class=SECOND%20CLASS&mas_Section=B&mas_guid=xyz&mas_geoLocation=xyz&mas_requestedFrom=xyz&mas_requestedOn=anonymous";

        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(getClasskidsListUrl, options);
        const classKidsListData = await response.json();
        // setSchoolExamTypes(classKidsListData);
        setClassKidsList(classKidsListData.body);
        setSearchedKidsList(classKidsListData.body);
      } catch (e) {}
    };
    getClasskidsList();
  }, []);

  useEffect(() => {
    // get notification by classteacher
    const getNotificationsByClassTeacher = async () => {
      try {
        const data = {
          header: {
            guid: uuidv4(),
            requestedOn: "2022-6-24.18:22:10",
            requestedFrom:
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
            geoLocation: "anonymous",
          },
          body: {
            mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
            mas_class: loggedInUserProfile.mas_class,
            mas_section: loggedInUserProfile.mas_section,
            mas_createdBy: loggedInUserProfile.mas_userRef,
            mas_createdOn: "2022-6-24.18:22:10",
            mas_modifiedBy: loggedInUserProfile.mas_userRef,
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

  // subject input

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };
  //message change handler

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  //selected notification handler

  const [selectedNotification, setSelectedNotification] = useState([]);
  const [selectedNotifibgColor, setSelectedNotifiColor] = useState("");

  //cancel buttn handler

  const cancelBtnHandler = () => {
    setSubject("");
    setMessage("");
    setSelectedKidsArr([]);
  };

  //search input kids list handler in dropdown
  const searchInputKidlistHandler = (event) => {
    setSearchWordInKidsList(event.target.value);
    setSearchedKidsList(
      classKidsList.filter((eachKid) => {
        const fullNameOfKid = `${eachKid.mas_firstName} ${eachKid.mas_lastName}`;
        const lowerFullNameOfKid = fullNameOfKid.toLowerCase();
        const lowerEnteredInput = event.target.value.toLowerCase();
        if (lowerFullNameOfKid.includes(lowerEnteredInput)) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  //displaying compose or sent on rightside
  const displayComponent = (selected) => {
    if (selected === "compose") {
      return (
        <div className="compose-container">
          <p className="diary-compose-subhead">Compose</p>

          <hr className="diary-hrline-below-compose" />
          <div className="diary-compose-sub-sub-container">
            {/* what is the use of htmlFor or For */}
            <label className="diary-sub-sub-headings">Send To:</label>

            {/* displaying selected kids names on selection*/}
            <div className="diary-input-and-checkbox-container">
              <div>
                {/* if all kids checked=> no dropdown input, else show input dropdown */}
                {!allKidsChecked ? (
                  <div
                    className="diary-selectedKidsList-container diary-compose-inputbox"
                    placeholder="Select Kid Name"
                    id="examName"
                    onClick={() => {
                      setDisplayKidsListDropdown((prevDisplay) => !prevDisplay);
                    }}
                  >
                    {selectedKidsArr.map((selectedKidObj) => {
                      const fullNameOfKid = `${selectedKidObj.mas_firstName} ${selectedKidObj.mas_lastName}`;
                      // deleteing handler ofselected kid
                      const deleteSelectedKidHandler = () => {
                        setSelectedKidsArr((prevArr) => {
                          //   donot directly delete value from array dont use pop or other method
                          //==> keep anything in state as immutable
                          // donot modify array. so add new array filter returns new arr
                          const filteredArr = prevArr.filter(
                            (eachObj) =>
                              eachObj.mas_kidId !== selectedKidObj.mas_kidId
                          );
                          return filteredArr;
                        });
                      };
                      return (
                        <div>
                          <p>
                            {fullNameOfKid}
                            <span>
                              <button onClick={deleteSelectedKidHandler}>
                                x
                              </button>
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {displayKidsListDropdown ? (
                  <div className="diary-kidslist-dropdown-search-container">
                    <input
                      className="diary-search-in-dropdown"
                      type="search"
                      onChange={searchInputKidlistHandler}
                      value={searchWOrdInKidsList}
                    />
                    <div className="diary-kidlist-only-dropdown-container">
                      {/* fullnameofKid extracted from fetched data */}
                      {searchedKidsList.map((eachKid) => {
                        const fullNameOfKid = `${eachKid.mas_firstName} ${eachKid.mas_lastName}`;

                        // //selecting kids to whom msg to be sent pushing to array
                        // Important: event handler can be used inside map function
                        //   we cannot pass argument to event handler
                        // so to pass anything from map fn you must use event handler inside map fn
                        //Benefit of array methods is that 1.we can use event handlers inside
                        //2.we can return jsx inside array methods

                        //The thing here is: 2 things should happen on selection of kid
                        //1.selected kid ids must be passed in fetch req as arr =[{kidId:number}, ...]
                        //2.name of kids selected must be displayed
                        //so only keeping kidID or kidName in state is not useful so keep selectedwhole kid object in state
                        //then we can take kid id and name where we want with extra function or direclty

                        const selectingKidsHandler = () => {
                          setSelectedKidsArr((prevArr) => {
                            if (
                              prevArr.some((eachItem) => {
                                return eachItem.mas_kidId === eachKid.mas_kidId;
                              })
                            ) {
                              return [...prevArr];
                            }
                            return [...prevArr, eachKid];
                            // donot directly use array methods because its recommended to not update this.state.
                            // best practice is to keep state immutable==> dont update it, replca it instead
                          });
                        };
                        return (
                          <p
                            className="diary-eachkid-name-in-dropdown"
                            onClick={selectingKidsHandler}
                          >
                            {fullNameOfKid}
                          </p>
                        );
                      })}
                    </div>
                    {/* passed uniquekid id as value to option */}
                  </div>
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
              value={subject}
            />
            <br />
            <label className="diary-sub-sub-headings">Message:</label>
            <br />
            <textarea
              className="diary-compose-inputbox diary-text-area"
              onChange={messageChangeHandler}
              value={message}
            ></textarea>
            <br />
            <div className="diary-buttons-container">
              <button
                className="diary-send-cancel-buttons"
                onClick={newMessageSendBtnHandler}
              >
                Send
              </button>
              <button
                className="diary-send-cancel-buttons ms-2"
                onClick={cancelBtnHandler}
              >
                Cancel
              </button>
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
                console.log(eachNotifi);
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
                          {eachNotifi.kidName === null
                            ? "A"
                            : eachNotifi.kidName[0].toUpperCase()}
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
                    <hr className="diary-sent-each-notification-hr-line" />
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
