import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DiarySentRightContainer from "./DiarySentRightContainer/DiarySentRightContainer";
import "./Diary.css";
import { faN } from "@fortawesome/free-solid-svg-icons";

// conditional rendering in react:
// keep in state setShow (compose)/setshow(sent )
// and keep condition if setShow(compose) then return <div></div>
// else return <div></div>

const Diary = () => {
  const loginToken = Cookies.get("loginToken");
  const [selectedKidsArr, setSelectedKidsArr] = useState([]);
  const [displayKidsListDropdown, setDisplayKidsListDropdown] = useState(false);

  // issue or problem if you dont give empty array inside useState because if u use array methods
  // then you using methods to undefined so: cannot use array methoda to undefined
  // dont forget to give empty array as initialisation
  const [classKidsList, setClassKidsList] = useState([]);
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
    selectedKidsArr.map((selectedKid) => {
      selectedKidIdsArr.push({ kidId: selectedKid.mas_kidId });
    });
    console.log(selectedKidIdsArr);
  };

  //send message button handler
  const newMessageSendBtnHandler = () => {
    //post notification or message sending message to api
    const postNotification = async () => {
      try {
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
          body: allKidsChecked
            ? {
                type: "yes",
                //only for jsx we use curly braces for expression evaluation for others no need curly braces
                mas_notificationID:
                  Math.floor(Math.random() * 9000000000) + 1000000000,
                mas_subject: subject,
                mas_SchoolUniqueId: "5911355945",
                mas_class: "SECOND CLASS",
                mas_section: "B",
                mas_createdBy: "155AAdfi",
                //get created by from local storage from role data, from userProfile api call
                mas_createdOn: currentDateAndTime(),
                mas_modifiedBy: "155AAdfi",
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
                mas_SchoolUniqueId: "5911355945",
                mas_class: "SECOND CLASS",
                mas_section: "B",
                mas_createdBy: "155AAdfi",
                //get created by from local storage from role data, from userProfile api call
                mas_createdOn: currentDateAndTime(),
                mas_modifiedBy: "155AAdfi",
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
      } catch (error) {}
    };
    //condition to send message is all fields must be entered
    if (subject === "" || message === "") {
      alert("all Fields are mandatory");
    } else {
      postNotification();
      setNotificationPosted("yes");
      setSubject("");
      setMessage("");
      setSelectedKidsArr([]);
      alert("sent");
    }
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
        const response = await fetch(getClasskidsListUrl, options);
        const classKidsListData = await response.json();
        // setSchoolExamTypes(classKidsListData);
        setClassKidsList(classKidsListData.body);
      } catch (e) {
        console.log(e);

        const testObj = {
          body: [
            {
              mas_Section: "B",
              mas_Image: "",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-30 16:16:30",
              mas_firstName: "Himan",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "27-02-2018 06:34:51",
              mas_lastName: "P",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "parent271519723568092",
              mas_createdBy: "parent271519723568092",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-03-22",
              mas_kidId: "1161702417",
              mas_logstatus: "true",
              mas_roolNumber: "625",
              mas_gender: "Male",
              mas_modifiedBy: "parent271519723568092",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-06 12:58:50",
              mas_firstName: "mohan",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-27.18:59:13",
              mas_lastName: "r",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-02-04",
              mas_kidId: "1574988565",
              mas_logstatus: "true",
              mas_roolNumber: "66666",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-28 14:47:58",
              mas_firstName: "roohit",
              mas_Class: "SECOND CLASS",
              mas_createdOn: null,
              mas_lastName: "p",
              mas_Relationship: "",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "kumar@2018-2-14.13:21:3",
              mas_createdBy: null,
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-02-04",
              mas_kidId: "1723922358",
              mas_logstatus: "true",
              mas_roolNumber: "382",
              mas_gender: "MALE",
              mas_modifiedBy: null,
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-06 12:33:14",
              mas_firstName: "nikhil ",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-19.16:11:37",
              mas_lastName: "varma",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2013-02-01",
              mas_kidId: "1902101016",
              mas_logstatus: "true",
              mas_roolNumber: "6666",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: "1",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-09 11:58:39",
              mas_firstName: "leela",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-20.14:33:44",
              mas_lastName: "m",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "alex.m@2018-2-16.18:39:59",
              mas_createdBy: "alex.m@2018-2-16.18:39:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-02-04",
              mas_kidId: "3468106380",
              mas_logstatus: "true",
              mas_roolNumber: "33333",
              mas_gender: "MALE",
              mas_modifiedBy: "alex.m@2018-2-16.18:39:59",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-23 10:27:43",
              mas_firstName: "venkat",
              mas_Class: "SECOND CLASS",
              mas_createdOn: null,
              mas_lastName: "paandu",
              mas_Relationship: "",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: null,
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-02-04",
              mas_kidId: "3790887058",
              mas_logstatus: "true",
              mas_roolNumber: "765",
              mas_gender: "MALE",
              mas_modifiedBy: null,
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-02-16 16:07:29",
              mas_firstName: "tiru",
              mas_Class: "SECOND CLASS",
              mas_createdOn: null,
              mas_lastName: "p",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: null,
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: null,
              mas_kidId: "4506988875",
              mas_logstatus: "true",
              mas_roolNumber: "963",
              mas_gender: "MALE",
              mas_modifiedBy: null,
            },
            {
              mas_Section: "B",
              mas_Image: "",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-30 16:05:57",
              mas_firstName: "nikhil ",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-19.16:13:41",
              mas_lastName: "varma",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2013-02-01",
              mas_kidId: "4668982885",
              mas_logstatus: "true",
              mas_roolNumber: "6666",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-06 12:48:01",
              mas_firstName: "nikhil",
              mas_Class: "SECOND CLASS",
              mas_createdOn: null,
              mas_lastName: "goutham",
              mas_Relationship: "",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: null,
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: null,
              mas_kidId: "6365610255",
              mas_logstatus: "true",
              mas_roolNumber: "987",
              mas_gender: "MALE",
              mas_modifiedBy: null,
            },
            {
              mas_Section: "B",
              mas_Image: "1",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-09 11:58:50",
              mas_firstName: "varsh",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-19.16:4:17",
              mas_lastName: "p",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2013-02-01",
              mas_kidId: "6475448910",
              mas_logstatus: "true",
              mas_roolNumber: "6666",
              mas_gender: "FEMALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-30 16:18:04",
              mas_firstName: "rahman",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-23.10:55:39",
              mas_lastName: "ss",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2018-02-16",
              mas_kidId: "7169574855",
              mas_logstatus: "true",
              mas_roolNumber: "66666",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: "",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-23 12:14:41",
              mas_firstName: "pooja",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-20.12:58:22",
              mas_lastName: "s",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2013-02-01T00:00:00",
              mas_kidId: "7257318526",
              mas_logstatus: "true",
              mas_roolNumber: "604",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-22 13:07:44",
              mas_firstName: "arpita",
              mas_Class: "SECOND CLASS",
              mas_createdOn: null,
              mas_lastName: "p",
              mas_Relationship: "",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "kumar@2018-2-14.13:21:3",
              mas_createdBy: null,
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: null,
              mas_kidId: "7423086502",
              mas_logstatus: "true",
              mas_roolNumber: "66",
              mas_gender: "MALE",
              mas_modifiedBy: null,
            },
            {
              mas_Section: "B",
              mas_Image: null,
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-21 11:10:53",
              mas_firstName: "arif",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-22.12:28:54",
              mas_lastName: "md",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "tiru.p@2018-2-14.15:45:59",
              mas_createdBy: "tiru.p@2018-2-14.15:45:59",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2014-02-11",
              mas_kidId: "7549810066",
              mas_logstatus: "true",
              mas_roolNumber: "66666",
              mas_gender: "MALE",
              mas_modifiedBy: "tiru.p@2018-2-14.15:45:59",
            },
            {
              mas_Section: "B",
              mas_Image: "7660350460",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2022-06-24 16:00:49",
              mas_firstName: "Balu",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "04-04-2018 11:02:13",
              mas_lastName: "B",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "babu1522819472852",
              mas_createdBy: "babu1522819472852",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: "2016-04-03 00:00:00",
              mas_kidId: "7660350460",
              mas_logstatus: "true",
              mas_roolNumber: "9563",
              mas_gender: "Male",
              mas_modifiedBy: "babu1522819472852",
            },
            {
              mas_Section: "B",
              mas_Image: "5",
              mas_kidStatus: "Active",
              mas_modifiedOn: "2018-03-09 11:58:15",
              mas_firstName: "nikila",
              mas_Class: "SECOND CLASS",
              mas_createdOn: "2018-2-16.18:42:20",
              mas_lastName: "p",
              mas_Relationship: "Parent",
              mas_schoolName: "santosh high school",
              mas_parentUserRef: "parent16@2018-2-16.18:36:11",
              mas_createdBy: "parent16@2018-2-16.18:36:11",
              mas_SchoolUniqueId: "5911355945",
              mas_date_of_birth: null,
              mas_kidId: "8210428956",
              mas_logstatus: "true",
              mas_roolNumber: "56565656",
              mas_gender: "FEMALE",
              mas_modifiedBy: "parent16@2018-2-16.18:36:11",
            },
          ],
          header: {
            mas_requestedOn: "2022-7-1.18:42:1",
            mas_Class: "SECOND CLASS",
            mas_requestedFrom:
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36",
            mas_SchoolUniqueId: "5911355945",
            mas_guid: "2dcf8ad0-d904-eb8c-a215-8124100713fd",
            mas_Section: "B",
            mas_geoLocation: "anonymous",
          },
        };
        setClassKidsList(testObj.body);
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

  console.log(selectedKidsArr);

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
            <div className="diary-selectedKidsList-container">
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
                      {fullNameOfKid}{" "}
                      <span>
                        <button onClick={deleteSelectedKidHandler}>x</button>
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="diary-input-and-checkbox-container">
              <div>
                {/* if all kids checked=> no dropdown input, else show input dropdown */}
                {!allKidsChecked ? (
                  <input
                    className="diary-compose-inputbox"
                    placeholder="Select Kid Name"
                    id="examName"
                    onClick={() => {
                      setDisplayKidsListDropdown((prevDisplay) => !prevDisplay);
                    }}
                  />
                ) : null}
                {displayKidsListDropdown ? (
                  <div className="diary-kidslist-dropdown-container">
                    {/* fullnameofKid extracted from fetched data */}
                    {classKidsList.map((eachKid) => {
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
                          return [...prevArr, eachKid];
                          // donot directly use array methods because its recommended to not update this.state.
                          // best practice is to keep state immutable==> dont update it, replca it instead
                        });
                      };
                      return (
                        <p onClick={selectingKidsHandler}>{fullNameOfKid}</p>
                      );
                    })}
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
