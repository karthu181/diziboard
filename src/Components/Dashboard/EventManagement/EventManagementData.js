// import axios from 'axios';
// import React,{ useEffect, useState} from 'react';
// import EventTable from './EventManagementTable/EventTable';
// import './Event.css';
// import { FaRegEye } from "react-icons/fa";

// function Event() {
//   const [dataTable,setDataTable] = useState([]);

//   useEffect(() => {
//    axios.get('https://192.168.0.116:8243/mas_EventManagement/1.0/mas_getevents?mas_SchoolUniqueId=5911355945&mas_class=SECOND CLASS&mas_section=&mas_guid=123&mas_requestedFrom=234&mas_requestedOn=324&mas_geoLocation=324',
//     {
//   headers: {
//     Authorization: `Bearer df0a65ea-bd42-3ff7-8c57-8f72d53a2a0c`
//   }
// })
//     .then(res => setDataTable(res.data))
//     .catch(err => console.log(err))
//   }, []);

//   const column = [
//     {heading: 'Action', value: <FaRegEye />},
//     {heading: 'Event Name', value: 'mas_eventname',sort: true },
//     {heading: 'Event Group', value: 'mas_eventgroup',sort: true },
//     {heading: 'Event From Date', value: 'mas_eventFromDate',sort: true },
//     {heading: 'Event To Date', value: 'mas_eventToDate',sort: true },
//     {heading: 'Event From Time', value: 'mas_eventFromTime',sort: true },
//     {heading: 'Event To Time', value: 'mas_eventToTime',sort: true },
//     {heading: 'Event Location', value: 'mas_eventVenue',sort: true },
//     {heading: 'Description', value: 'mas_eventdescription',sort: true },
//   ]

// return (
//   <div>
//     <EventTable data= {dataTable} column = {column} />

//   </div>
// )

// }

// export default Event;

// import React, {useEffect, useState} from "react";
// import  axios  from 'axios';
// import _ from 'lodash';
// import './Event.css';
// import { ImEye } from "react-icons/im";
// import {BsTrash} from "react-icons/bs";
// import {BiEdit} from "react-icons/bi";
// import Popup from 'reactjs-popup';

// import 'reactjs-popup/dist/index.css'

// const pageSize = 15;

// const Event = () => {
//   const [posts,setPosts] = useState();
//   const [paginatedPosts, setPaginatedPosts] = useState();
//   const [currentPage, setcurrentPage] = useState(1)

//   useEffect(() => {
//     axios
//       .get('https://192.168.0.116:8243/mas_EventManagement/1.0/mas_getevents?mas_SchoolUniqueId=5911355945&mas_class=SECOND%20CLASS&mas_section=&mas_guid=123&mas_requestedFrom=234&mas_requestedOn=324&mas_geoLocation=324',
//       {
//         headers: {
//           Authorization: `Bearer df0a65ea-bd42-3ff7-8c57-8f72d53a2a0c`,
//         }
//       })
//       .then((res) => {console.log(res.data)
//       .catch((err) => {console.log(err)})
//       setPosts(res.data)
//       setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
//     })
//  }, []);

//       const pageCount = posts? Math.ceil(posts.length/pageSize) : 0;
//       if(pageCount === 1) return null;
//       const page = _.range(1, pageCount+1);

//       const pagination = (pageNo) => {
//         setcurrentPage(pageNo);
//         const startIndex = (pageNo -1)* pageSize;
//         const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
//         setPaginatedPosts(paginatedPost)
//       }

//   return (
//     <div>
//       {
//         !paginatedPosts ? ("No data found") : (
//           <table className="table table-bordered" >
//             <thead>
//               <tr className='table-head'>
//                 <th>Action</th>
//                 <th>Event Name</th>
//                 <th>Event Group</th>
//                 <th>Event From Date</th>
//                 <th>Event To Date</th>
//                 <th>Event From Time</th>
//                 <th>Event To Time</th>
//                 <th>Event Location</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody className="body">
//               {
//                 paginatedPosts.map((post, index) =>(
//                   <tr key = {index} className="table-body-container body">
//                     <td className="body">
//                     <div className="all-popup-container">
//         <div className='pop-up-container'>
//         <Popup modal
//           trigger={
//               <button type="button" className="eye-button">
//                   <span><ImEye className="eye"/> </span>
//               </button>}>

//           <div className='eye-bg-container'>
//             <h1 className='eye-head'>view Event</h1>
//           </div>
//         <div>

//           <h4 className='event-head'>Event</h4>
//           <p>{post.mas_eventname}</p>

//     <p><label htmlFor='holidayGroup' className='paragrph'>Description:</label></p>
//     <textarea id="holidayGroup" name="holidayGroup" rows="10" cols="80">
//     {post.mas_eventdescription}
//     </textarea>
//     <div className='button-container'>
//       <button type="submit" className="trigger-button">
//             Ok
//       </button>
//       </div>
//   </div>

//     </Popup>
//     </div>
//     <div>
//     <BiEdit className="edit"/>
//     </div>
// <div >

// <Popup
// modal
// trigger={
// <button type="button" className="trash-popup-button" >
// <BsTrash className="trash"/>
// </button>}>
// {close => (
//   <>
//   <div className='trash-container'>
//   <div className='trash-heading-container'>
//     <h1 className='trash-popup-heading'> Delete Event</h1>
//     <button type="button" className="close " onClick={() => close()} aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//     </button>
//   </div>
//     <p className='trash-para'>Are you sure you want to Delete The selected Event?</p>
//     <div className="trash-button">
//     <button
//     type="button"
//     className="trigger-button"
//     onClick={() => close()}>
//       YES
//     </button>
//   <button
//     type="button"
//     className="trigger-button "
//     onClick={() => close()}>
//       NO
//     </button>
//     </div>
//   </div>
//   </>)}
// </Popup>
// </div>
// </div>
//         </td>
//                     <td className="body">{post.mas_eventname}</td>
//                     <td className="body">{post.mas_eventgroup}</td>
//                     <td className="body">{post.mas_eventFromDate}</td>
//                     <td className="body">{post.mas_eventToDate}</td>
//                     <td className="body">{post.mas_eventFromTime}</td>
//                     <td className="body">{post.mas_eventToTime}</td>
//                     <td className="body">{post.mas_eventVenue}</td>
//                     <td className="body">{post.mas_eventdescription}</td>

//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//         )
//       }

//       <nav className="d-flex justify-content-center ">
//         <ul className="pagination">
//           {
//             page.map((page) => (
//               <li className={
//               page === currentPage? "page-item active":"page-item"
//               }>
//               <p className="page-link"
//               onClick={()=>pagination(page)}>{page}</p>
//               </li>
//             ) )
//           }
//         </ul>
//       </nav>
//     </div>
//     );
// }

// export default Event;

import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { ImEye } from "react-icons/im";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import "./EventManagementData.css";

const pageSize = 15;

const EventManagementData = (props) => {
  const [eventPosted, setEventPosted] = useState();
  const { postedEvent } = props;
  console.log(postedEvent);

  useEffect(() => {
    setEventPosted(postedEvent);
  });

  const [posts, setPosts] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [deletedEvent, setDeletedEvent] = useState({});
  const [eventTo, setEventTo] = useState("All");
  const [showClass, setShowClass] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [saveEvent, setSaveEvent] = useState();

  const dropdownHandleEvent = (event) => {
    setEventTo(event.target.value);
    console.log(event.target.value);
  };

  const loginToken = Cookies.get("loginToken");

  useEffect(() => {
    // get classes
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
  }, [saveEvent]);

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
  }, [saveEvent]);

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

  //table data

  useEffect(() => {
    axios
      .get(
        "http://192.168.0.116:8280/mas_EventManagement/1.0/mas_getevents?mas_SchoolUniqueId=5911355945&mas_class=SECOND%20CLASS&mas_section=B&mas_guid=32ce8ac8-cad5-0a4f-dd23-e147bc94f158&mas_requestedFrom=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/102.0.0.0%20Safari/537.36&mas_requestedOn=2022-6-28%2014:30:47&mas_geoLocation=123",
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setPaginatedPosts(
          _(res.data)
            .slice(0)
            .take(pageSize)
            .value()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventPosted, deletedEvent]);

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const page = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(posts)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedPosts(paginatedPost);
  };

  return (
    <div>
      {!paginatedPosts ? (
        "No data found"
      ) : (
        <table className="table">
          <thead className="event-management-table-border-head">
            <tr className="event-management-table-head">
              <th className="event-management-table-head-hover">Action</th>
              <th className="event-management-table-head-hover">Event Name</th>
              <th className="event-management-table-head-hover">Event Group</th>
              <th className="event-management-table-head-hover">
                Event From Date
              </th>
              <th className="event-management-table-head-hover">
                Event To Date
              </th>
              <th className="event-management-table-head-hover">
                Event From Time
              </th>
              <th className="event-management-table-head-hover">
                Event To Time
              </th>
              <th className="event-management-table-head-hover">
                Event Location
              </th>
              <th className="event-management-table-head-hover">Description</th>
            </tr>
          </thead>
          <tbody className="body event-management-mobile-view-scroll">
            {paginatedPosts.map((post, index) => {
              return (
                <tr key={index} className="table-body-container body">
                  <td className="body">
                    {/* <div className="all-popup-container"> */}
                    {/* <div className='pop-up-container'> */}
                    <div className="event-popup-buttons-container">
                      <div className="eye-popup-container">
                        <Popup
                          modal
                          trigger={
                            <button
                              type="button"
                              className="eye-trigger-button"
                            >
                              <ImEye className="eye" />
                            </button>
                          }
                        >
                          {(close) => (
                            <>
                              <div className="eye-heading-container">
                                <div className="eye-heading-inner-container">
                                  <h1 className="eye-event-heading">
                                    View Event
                                  </h1>
                                  <button
                                    type="button"
                                    className="close eye-close-button"
                                    onClick={() => close()}
                                    aria-label="close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>

                                <div>
                                  <p className="eye-paragraph-event">Event</p>
                                  <p className="eye-paragraph-event">
                                    {post.mas_eventname}
                                  </p>
                                  <p className="eye-paragraph-event">
                                    Description
                                  </p>
                                  <textarea
                                    id="w3review"
                                    name="w3review"
                                    rows="8"
                                    cols="50"
                                    className="eye-paragraph-textarea eye-paragraph-event"
                                    value={post.mas_eventdescription}
                                  ></textarea>
                                  <textarea
                                    id="w3review"
                                    name="w3review"
                                    rows="5"
                                    cols="35"
                                    className="eye-paragraph-textarea-mobile eye-paragraph-event"
                                    value={post.mas_eventdescription}
                                  ></textarea>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="eye-ok-trigger-button-popup"
                                    onClick={() => close()}
                                  >
                                    Ok
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </Popup>
                      </div>
                      <div>
                        <Popup
                          modal
                          trigger={
                            <button
                              type="button"
                              className="eye-trigger-button"
                            >
                              <BiEdit className="edit" />
                            </button>
                          }
                        >
                          {(close) => {
                            const onsaveEventHandler = () => {
                              close();
                              axios
                                .post(
                                  "http://192.168.0.116:8280/mas_EventManagement/1.0/mas_postEvent",
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                      Accept: "application/json",
                                      Authorization: `Bearer ${loginToken}`,
                                    },
                                    data: {
                                      header: {
                                        guid:
                                          "24c87e65-2329-38d9-a9ec-72042c3e50f2",
                                        requestedOn: "2022-7-4 11:0:53",
                                        requestedFrom:
                                          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                        geoLocation: "anonymous",
                                      },
                                      body: {
                                        mas_SchoolUniqueId: "5911355945",
                                      },
                                    },
                                  }
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  setSaveEvent(res.data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            };
                            return (
                              <>
                                <div className="add-event-heading-container">
                                  <div className="eye-heading-inner-container">
                                    <h1 className="eye-event-heading">
                                      Edit Event
                                    </h1>
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
                                        <label className="lable-font-size-color">
                                          Event
                                        </label>{" "}
                                        <br />
                                        <input
                                          type="text"
                                          value={post.mas_eventname}
                                        ></input>
                                      </div>
                                      <div className="add-event-width add-event-padding">
                                        <label className="lable-font-size-color">
                                          Event Group
                                        </label>{" "}
                                        <br />
                                        <input
                                          type="text"
                                          value={post.mas_eventgroup}
                                        />
                                      </div>

                                      <div className="add-event-width add-event-padding">
                                        <label className="lable-font-size-color">
                                          Event Location
                                        </label>{" "}
                                        <br />
                                        <input
                                          type="text"
                                          value={post.mas_eventVenue}
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
                                          value={post.mas_eventFromTime}
                                        />
                                      </div>
                                      <div className="add-event-width">
                                        <label className="lable-font-size-color">
                                          From To Date
                                        </label>{" "}
                                        <br />
                                        <input
                                          type="datetime-local"
                                          value={post.mas_eventToTime}
                                        />
                                      </div>

                                      <div className="add-event-width">
                                        <label className="lable-font-size-color">
                                          Description
                                        </label>{" "}
                                        <br />
                                        <textarea
                                          type="text"
                                          rows="3"
                                          cols="22"
                                        >
                                          {post.mas_eventdescription}
                                        </textarea>
                                      </div>
                                    </div>
                                    <div className="event-add-event-column-container add-event-class-section-mobile">
                                      <div className="add-event-width">
                                        <label
                                          className="lable-font-size-color"
                                          for="students"
                                        >
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
                                          <option value="Section">
                                            Section
                                          </option>
                                        </select>
                                      </div>
                                      <div>{getDisplayEventTo()}</div>
                                      <div className="add-event-width">
                                        <input type="checkbox" />
                                        <label className="lable-font-size-color">
                                          Notify
                                        </label>
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
                                  <div className="mobile-view-for-add-event">
                                    <div className="add-event-width">
                                      <label
                                        className="lable-font-size-color"
                                        for="students"
                                      >
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
                                      <label className="lable-font-size-color">
                                        Notify
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          }}
                        </Popup>
                      </div>

                      <div className="trash-popup-container">
                        <Popup
                          modal
                          trigger={
                            <button
                              type="button"
                              className="trash-trigger-button"
                            >
                              <BsTrash className="trash" />
                            </button>
                          }
                        >
                          {(close) => {
                            //yes event handler
                            const deleteEventHandle = () => {
                              close();

                              // delete event
                              axios
                                .delete(
                                  `http://192.168.0.116:8280/mas_EventManagement/1.0/${post.mas_eventId}`,
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                      Accept: "application/json",
                                      Authorization: `Bearer ${loginToken}`,
                                    },
                                    data: {
                                      header: {
                                        guid:
                                          "a7e714ca-95c6-a291-1d5d-a35819826c70",
                                        requestedOn: "2022-6-30 17:33:14",
                                        requestedFrom:
                                          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                        geoLocation: "anonymous",
                                      },
                                      body: {
                                        mas_SchoolUniqueId: "5911355945",
                                      },
                                    },
                                  }
                                )
                                .then((res) => {
                                  console.log(res.data);
                                  setDeletedEvent(res.data);
                                });
                            };
                            return (
                              <>
                                <div className="trash-heading-container">
                                  <div className="trash-heading-container-mobile">
                                    <div className="eye-heading-inner-container">
                                      <h1 className="eye-event-heading">
                                        Delete Event
                                      </h1>
                                      <button
                                        type="button"
                                        className="close eye-close-button"
                                        onClick={() => close()}
                                        aria-label="close"
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>

                                    <div>
                                      <p className="eye-paragraph-event">
                                        Are you sure you want to Delete The
                                        selected Event?
                                      </p>
                                    </div>
                                    <div className="add-event-save-cancle-buttons">
                                      <button
                                        type="button"
                                        className="trash-ok-trigger-button-yes"
                                        onClick={deleteEventHandle}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        type="button"
                                        className="trash-ok-trigger-button-No"
                                        onClick={() => close()}
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          }}
                        </Popup>
                      </div>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                  </td>
                  <td className="body">{post.mas_eventname}</td>
                  <td className="body">{post.mas_eventgroup}</td>
                  <td className="body">{post.mas_eventFromDate}</td>
                  <td className="body">{post.mas_eventToDate}</td>
                  <td className="body">{post.mas_eventFromTime}</td>
                  <td className="body">{post.mas_eventToTime}</td>
                  <td className="body">{post.mas_eventVenue}</td>
                  <td className="body">{post.mas_eventdescription}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <nav className="d-flex justify-content-center ">
        <ul className="pagination">
          {page.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EventManagementData;
