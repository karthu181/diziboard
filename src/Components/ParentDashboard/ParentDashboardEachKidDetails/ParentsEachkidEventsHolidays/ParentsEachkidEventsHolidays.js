import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ParentsEachkidEventsHolidays.css";
import Cookies from "js-cookie";

const ParentsEachkidEventsHolidays = (props) => {
  const { kidDetailsObj } = props;

  const loginToken = Cookies.get("loginToken");
  const [monthlyEvents, setMonthlyEvents] = useState();
  const [monthlyHolidays, setMonthlyHolidays]=useState();
  const [shortEvents, setShortEvents]=useState()
  const [holidaysDats,setHolidaysData]=useState()

  // get current date and time
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
    const getMonthlyEvents = async () => {
      try {
        const getMonthlyEventsUrl =
          "http://192.168.0.116:8280/mas_getmonthlyeventdetails/v1/mas_getmonthlyeventdetails";

        const getMonthlyEventsParams = `?mas_SchoolUniqueId=${
          kidDetailsObj.mas_SchoolUniqueId
        }&mas_class=${kidDetailsObj.mas_Class}
              &mas_section=${
                kidDetailsObj.mas_Section
              }&mas_monthindex=${currentDateAndTime().slice(
          5,
          7
        )}&mas_year=${currentDateAndTime().slice(
          0,
          4
        )}&mas_guid=6547cd02-327a-ad9a-0b61-d0aa87ddb37e&mas_requestedOn=${currentDateAndTime()}&mas_requestedFrom=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.5060.134%20Safari%2F537.36%20Edg%2F103.0.1264.71&mas_geoLocation=anonymous`;

        const res = await axios.get(
          getMonthlyEventsUrl + getMonthlyEventsParams,
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
        const eventsMonthly = parsedRes.body;
        console.log(eventsMonthly);
        setMonthlyEvents(eventsMonthly);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthlyEvents();

    const getMonthlyHolidays = async () => {
      try {
        const getMonthlyHolidaysUrl =
          "http://192.168.0.116:8280/mas_getmonthlyholidaydetails/v1/mas_getmonthlyholidaydetails";
        const getMonthlyHolidaysParams = `?mas_SchoolUniqueId=${
          kidDetailsObj.mas_SchoolUniqueId
        }&mas_monthindex=${currentDateAndTime().slice(
          5,
          7
        )}&mas_year=${currentDateAndTime().slice(
          0,
          4
        )}&mas_guid=2cd0fc2c-36ba-8bf2-0045-a68d677c2dc7&mas_requestedFrom=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.5060.134%20Safari%2F537.36%20Edg%2F103.0.1264.71&mas_requestedOn=${currentDateAndTime()}&mas_geoLocation=anonymous`;

        const res = await axios.get(
          getMonthlyHolidaysUrl + getMonthlyHolidaysParams,
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
        const holidaysMonthly = parsedRes.body;
        console.log(holidaysMonthly);
        setMonthlyHolidays(holidaysMonthly);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthlyHolidays();


    const getshortevents2parents = async () => {
        try {
          const getshortevents2parentsUrl =
          "http://192.168.0.116:8280/getEventNotificationsByParentOnSchoolBased/v1/getshortevents2parents"
          const getshortevents2parentsParams = `?mas_guid=3095e3ae-6762-7a7a-dce2-89307ee9fda8&mas_requestedFrom=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.5060.134%20Safari%2F537.36%20Edg%2F103.0.1264.71&mas_requestedOn=${currentDateAndTime()}&mas_geoLocation=anonymous&mas_schoolUniqueId=${
            kidDetailsObj.mas_SchoolUniqueId
          }&mas_parentUserRef=${kidDetailsObj.mas_parentUserRef}`

          
          const res = await axios.get(
            getshortevents2parentsUrl + getshortevents2parentsParams,
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
          const eventsShort = parsedRes.body;
          console.log(eventsShort);
          setShortEvents(eventsShort);
        } catch (error) {
          console.log(error);
        }
      };
      getshortevents2parents();


      const getHolidaysData = async () => {
        try {
          const getHolidaysDataUrl =
            "http://192.168.0.116:8280/mas_getholidaysdata/1.0/mas_getholidaysdata";
  
          const res = await axios.post(getHolidaysDataUrl, {
            headers: {
                "content-type":"application/json",
              Authorization: `Bearer ${loginToken}`,
              Accept: "application/json",
            },
            data: 
            {
                header: {
                  guid: "a36fabed-8d79-862a-07da-f54343506c04",
                  responseOn: "2022-7-25.13:2:33",
                  responseFrom: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.71",
                  userRef: kidDetailsObj.mas_parentUserRef,
                  geoLocation: "anonymous",
                  status: "success",
                  statuscode: "0"
                },
                body: {
                  mas_SchoolUniqueId:kidDetailsObj.mas_SchoolUniqueId,
                  year: currentDateAndTime().slice(
                        0,
                        4
                      ),
                  month: currentDateAndTime().slice(
                                      5,
                                      7
                                    )
                }
              },
            
          });
  
          // in fetch we convert body javascript obj  to json string
          // in axios data  auto converts to json string we just give data js obj
          const parsedRes = res.data;
          const holidaysDataRes = parsedRes.body;
          setHolidaysData(holidaysDataRes);
        } catch (error) {
          console.log(error);
        }
      };
      getHolidaysData();
  }, []);
  return <div>events</div>;
};

export default ParentsEachkidEventsHolidays;
