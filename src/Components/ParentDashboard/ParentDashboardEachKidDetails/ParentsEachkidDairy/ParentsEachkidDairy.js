import React, { useEffect , useState} from "react"
import axios from "axios"
import ParentsEachkidDairyRightCont from "./ParentsEachkidDairyRightCont/ParentsEachkidDairyRightCont"
import "./ParentsEachkidDairy.css"
import Cookies from "js-cookie"

const ParentsEachkidDairy=(props)=>{
    const loginToken = Cookies.get("loginToken");
    const currentDateAndTime = () => {
        const dateObj = new Date();
        const month=(dateObj.getMonth()+1)<=9?`0${dateObj.getMonth()+1}`:dateObj.getMonth()+1
        const onlyDate=(dateObj.getDate())<=9?`0${dateObj.getDate()}`:dateObj.getDate()
        const hours=(dateObj.getHours())<=9?`0${dateObj.getHours()}`:dateObj.getHours()
        const seconds=(dateObj.getSeconds())<=9?`0${dateObj.getSeconds()}`:dateObj.getSeconds()
        const minutes=(dateObj.getMinutes())<=9?`0${dateObj.getMinutes()}`:dateObj.getSeconds()
        const currentDateTime = `${dateObj.getFullYear()}-${month}-${onlyDate} ${hours}:${minutes}:${
          seconds
        }`;
        return currentDateTime;
      };
    const {kidDetailsObj}=props
    const [notificationsByParent, setNotificationsByParent] = useState([]);
    const [selectedNotification, setSelectedNotification]=useState([])
    useEffect(()=>{
        const getNotificationsByParent = async () => {
            try {
              const getNotificationsByParentUrl =
                "http://192.168.0.116:8280/postNotificationsInformation/v1/getNotificationsByParent";
      
              const res = await axios.post(getNotificationsByParentUrl, {
                headers: {
                    "content-type":"application/json",
                  Authorization: `Bearer ${loginToken}`,
                  Accept: "application/json",
                },
                data: {
                  header: {
                    guid: "1374cdbf-a47e-5a49-e4cc-eab56b879d6d",
                    requestedOn: currentDateAndTime(),
                    requestedFrom:
                      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36",
                    geoLocation: "anonymous",
                  },
                  body: {
                    mas_kiduserID: kidDetailsObj.mas_kidId,
                    mas_SchoolUniqueId: kidDetailsObj.mas_SchoolUniqueId,
                    mas_class: kidDetailsObj.mas_Class,
                    mas_section: kidDetailsObj.mas_Section,
                    mas_createdBy: kidDetailsObj.mas_createdBy,
                    mas_createdOn: kidDetailsObj.mas_createdOn,
                    mas_modifiedBy: kidDetailsObj.mas_modifiedBy,
                    mas_modifiedOn: kidDetailsObj.mas_modifiedOn,
                  },
                },
              });
      
              // in fetch we convert body javascript obj  to json string
              // in axios data  auto converts to json string we just give data js obj
              const parsedRes = res.data;
              const notifionsArr = parsedRes.body;
              setNotificationsByParent(notifionsArr);
            } catch (error) {
              console.log(error);
            }
          };
          getNotificationsByParent();
          
    },[])
    return (
        <div>
           <div className="diary-sent-container">
          <div className="diary-sent-left-allnotifications-container">
            <ul className="diary-sent-ul-container">
              {/* mapping notifications, from notification data */}

              {notificationsByParent.map((eachNotifi) => {
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
                      <div className="diary-first-letter-container">
                        <h1 className="diary-first-letter">
                          {eachNotifi.kidName === null
                            ? "A"
                            : eachNotifi.kidName[0].toUpperCase()}
                        </h1>
                      </div>
                      <div className="diary-sent-each-flex-item">
                        <p className="diary-sub-sub-headings">
                          Subject
                          <span className="diary-sent-subhead-ans">
                            {eachNotifi.mas_subject}
                          </span>
                        </p>
                      </div>
                      <div className="w-25 diary-sent-each-flex-item">
                        <p className="diary-sub-sub-headings">
                          To:
                          <span className="diary-sent-subhead-ans">
                            {eachNotifi.mas_notificationType === "single"
                              ? eachNotifi.kidName
                              : "all kids"}
                          </span>
                        </p>
                      </div>
                      <div className="diary-sent-each-flex-item">
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
            <ParentsEachkidDairyRightCont
              selectedNotification={selectedNotification}
            />
          </div>
        </div>
        </div>
    )
}

export default ParentsEachkidDairy