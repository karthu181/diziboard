import React from "react";
import Popup from "reactjs-popup";
import "./EventPopup.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EventPopup = (props) => {
  const { getEventPostRes } = props;

  const [eventTo, setEventTo] = useState("All");
  const [showClass, setShowClass] = useState(false);
  const [showSection, setShowSection] = useState(false);

  const [eventName, setEventName] = useState("");
  const [inputRedBorder, setInputRedBorder] = useState(false);
  const [eventGroup, setEventGroup] = useState("");
  const [eventGroupRedBorder, setEventGroupRedBorder] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const [eventLocationRedBorder, setEventLocationRedBorder] = useState(false);
  const [eventFromDate, setEventFromDate] = useState("");
  const [eventFromDateRedBorder, setEventFromRedBorder] = useState(false);
  const [eventToDate, setEventToDate] = useState("");
  const [eventToDateRedBorder, setEventToDateRedBorder] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionredborder, setdescriptionRedBorder] = useState(false);
  // // const [error, setError] = useState(false)

  //   const [response, setResponse] = useState(res)
  //   const [eventTo, setEventTo] = useState();

  const dropdownHandleEvent = (event) => {
    setEventTo(event.target.value);
    console.log(event.target.value);
  };

  //   const sendResponseToHigherComp=()=>{
  //     getEventPostRes(response)
  //   }

  //   const onChangeEventTo = (event) => {
  //     setEventTo(event.target.value)
  //   }

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeEventName = (event) => {
    setEventName(event.target.value);
  };

  const onChangeEventGroup = (event) => {
    setEventGroup(event.target.value);
  };

  const onChangeEventLocation = (event) => {
    setEventLocation(event.target.value);
  };

  const onChangeEventFromDate = (event) => {
    setEventFromDate(event.target.value);
  };

  const onChangeEventToDate = (event) => {
    setEventToDate(event.target.value);
  };
  const loginToken = Cookies.get("loginToken");

  //get classes

  useEffect(() => {
    axios
      .get(
        "http://192.168.0.116:8280/mas_KidClasses/1.0/getkidclass?Guid=11&mas_schoolUniqueId=5911355945&GeoLocation=anonymous&RequestedFrom=11&RequestedOn=11",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
          data:
            "Guid=11&mas_schoolUniqueId=5911355945&GeoLocation=anonymous&RequestedFrom=11&RequestedOn=11",
        }
      )
      .then((res) => {
        console.log(res.data.body);
        setShowClass(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get  sections

  useEffect(() => {
    axios
      .get(
        "http://192.168.0.116:8280/mas_KidSection/1.0/getkidSection?mas_schoolUniqueId=5911355945&mas_class=SECOND%20CLASS&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=aa",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
          data:
            "mas_schoolUniqueId=5911355945&mas_class=SECOND%20CLASS&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=aa",
        }
      )
      .then((res) => {
        console.log(res.data.body);
        setShowSection(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDisplayEventTo = () => {
    switch (eventTo) {
      case "All":
        return null;
      case "Class":
        return (
          <div>
            <label className="lable-font-size-color">class</label> <br />
            <select className="drop-down-add-event">
              <option>-select class-</option>
              {showClass.map((eachClass, index) => (
                <option key={index}>{eachClass.mas_class}</option>
              ))}
              ;
            </select>
          </div>
        );
      case "Section":
        return (
          <>
            <div>
              <label className="lable-font-size-color">class</label> <br />
              <select className="drop-down-add-event">
                <option>-select class-</option>
                {showClass.map((eachClass, index) => (
                  <option key={index}>{eachClass.mas_class}</option>
                ))}
                ;
              </select>
            </div>
            <div>
              <label className="lable-font-size-color">Section</label> <br />
              <select className="drop-down-add-event">
                <option>-select section-</option>
                {showSection.map((eachSection, index) => (
                  <option key={index}>{eachSection.mas_section}</option>
                ))}
                ;
              </select>
            </div>
          </>
        );
      default:
    }
  };

  console.log(getDisplayEventTo());

  return (
    <div>
      <div>
        <Popup
          modal
          trigger={
            <button type="button" className="add-event-span-plus-button">
              <span className="add-event-span-button">+</span>
            </button>
          }
        >
          {(close) => {
            const onsaveEventHandler = () => {
              close();
              eventName === ""
                ? setInputRedBorder(true)
                : setInputRedBorder(false);
              eventGroup === ""
                ? setEventGroupRedBorder(true)
                : setEventGroupRedBorder(false);
              eventLocation === ""
                ? setEventLocationRedBorder(true)
                : setEventLocationRedBorder(false);
              eventFromDate === ""
                ? setEventFromRedBorder(true)
                : setEventFromRedBorder(false);
              eventToDate === ""
                ? setEventToDateRedBorder(true)
                : setEventToDateRedBorder(false);
              description === ""
                ? setdescriptionRedBorder(true)
                : setdescriptionRedBorder(false);

              const postAddEvent = async () => {
                const response = await fetch(
                  "http://192.168.0.116:8280/mas_EventManagement/1.0/mas_postEvent",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${loginToken}`,
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      header: {
                        guid: "6ebd46fd-2f88-154b-94ee-fd7bff35be2d",
                        requestedOn: "2022-7-4 15:5:19",
                        requestedFrom:
                          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                        geoLocation: "anonymous",
                      },
                      body: {
                        mas_eventId: 6223436360,
                        mas_SchoolUniqueId: "5911355945",
                        mas_eventname: eventName,
                        mas_eventgroup: eventGroup,
                        mas_eventVenue: eventLocation,
                        mas_eventdescription: description,
                        mas_createdby: "155AAdfi",
                        mas_createdon: "2022-7-4 15:5:19",
                        mas_modifiedby: "155AAdfi",
                        mas_modifiedon: "2022-7-4 15:5:19",
                        mas_eventFromDate: eventFromDate,
                        mas_eventToDate: eventToDate,
                        mas_eventFromTime: "00:00",
                        mas_eventToTime: "00:00",
                        mas_eventTo: "school",
                        mas_class: "",
                        mas_section: "null",
                      },
                    }),
                  }
                );

                const respJson = await response.json();
                getEventPostRes(respJson);
              };
              postAddEvent();
            };

            const onBlurInput = () => {
              eventName === ""
                ? setInputRedBorder(true)
                : setInputRedBorder(false);
            };

            const onBlurEventGroup = () => {
              eventGroup === ""
                ? setEventGroupRedBorder(true)
                : setEventGroupRedBorder(false);
            };

            const onBlurEventLocation = () => {
              eventLocation === ""
                ? setEventLocationRedBorder(true)
                : setEventLocationRedBorder(false);
            };

            const onBlurEventFromDate = () => {
              eventFromDate === ""
                ? setEventFromRedBorder(true)
                : setEventFromRedBorder(false);
            };

            const onBlurEventToDate = () => {
              eventToDate === ""
                ? setEventToDateRedBorder(true)
                : setEventToDateRedBorder(false);
            };

            const onblurDescription = () => {
              description === ""
                ? setdescriptionRedBorder(true)
                : setdescriptionRedBorder(false);
            };

            return (
              <>
                <div className="add-event-heading-container">
                  <div className="eye-heading-inner-container">
                    <h1 className="eye-event-heading">View Event</h1>
                    <button
                      type="button"
                      className="close eye-close-button"
                      onClick={() => close()}
                      aria-label="close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="label-add-event-pop-up-container">
                    <div className="event-add-event-column-container">
                      <div className="add-event-width add-event-padding">
                        <label className="lable-font-size-color">Event</label>{" "}
                        <br />
                        <input
                          type="text"
                          onChange={onChangeEventName}
                          value={eventName}
                          className={inputRedBorder && "invalid"}
                          onBlur={onBlurInput}
                        />
                      </div>
                      <div className="add-event-width add-event-padding">
                        <label className="lable-font-size-color">
                          Event Group
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          onChange={onChangeEventGroup}
                          value={eventGroup}
                          className={eventGroupRedBorder && "invalid"}
                          onBlur={onBlurEventGroup}
                        />
                      </div>

                      <div className="add-event-width add-event-padding">
                        <label className="lable-font-size-color">
                          Event Location
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          onChange={onChangeEventLocation}
                          value={eventLocation}
                          className={eventLocationRedBorder && "invalid"}
                          onBlur={onBlurEventLocation}
                        />
                      </div>
                    </div>
                    <div className="event-add-event-column-container">
                      <div className="add-event-width">
                        <label className="lable-font-size-color">
                          Event From Date
                        </label>{" "}
                        <br />
                        <input
                          type="datetime-local"
                          onChange={onChangeEventFromDate}
                          value={eventFromDate}
                          className={eventFromDateRedBorder && "invalid"}
                          onBlur={onBlurEventFromDate}
                        />
                      </div>
                      <div className="add-event-width">
                        <label className="lable-font-size-color">
                          From To Date
                        </label>{" "}
                        <br />
                        <input
                          type="datetime-local"
                          onChange={onChangeEventToDate}
                          value={eventToDate}
                          className={eventToDateRedBorder && "invalid"}
                          onBlur={onBlurEventToDate}
                        />
                      </div>
                      {/* <div className="add-event-width">
                                    {/* <label className="lable-font-size-color" for='students'>Event</label> <br />
                                    <input type='text'/>  
                                </div> */}

                      <div className="add-event-width">
                        <label className="lable-font-size-color">
                          Description
                        </label>{" "}
                        <br />
                        <textarea
                          type="text"
                          rows="3"
                          cols="22"
                          onChange={onChangeDescription}
                          value={description}
                          className={descriptionredborder && "invalid"}
                          onBlur={onblurDescription}
                        />
                      </div>
                    </div>
                    <div className="event-add-event-column-container">
                      <div className="add-event-width">
                        <label className="lable-font-size-color" for="students">
                          Event To
                        </label>{" "}
                        <br />
                        <select
                          name="students"
                          id="students"
                          className="drop-down-add-event"
                          onChange={dropdownHandleEvent}
                        >
                          <option value="All">All</option>
                          <option value="Class">Class</option>
                          <option value="Section">Section</option>
                        </select>
                      </div>
                      <div>{getDisplayEventTo()}</div>
                      <div className="add-event-width">
                        <input type="checkbox" />
                        <label className="lable-font-size-color">Notify</label>
                        {/* <label className="lable-font-size-color">Event</label> <br />
                                    <input type='text' /> */}
                      </div>
                    </div>
                  </div>
                  <div className="save-cancle-buttons">
                    <button
                      type="button"
                      className="add-event-save-trigger-button"
                      onClick={onsaveEventHandler}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="add-event-cancle-trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                {/* </div>
                            </div>  */}
              </>
            );
          }}
        </Popup>
      </div>
    </div>
  );
};

export default EventPopup;
