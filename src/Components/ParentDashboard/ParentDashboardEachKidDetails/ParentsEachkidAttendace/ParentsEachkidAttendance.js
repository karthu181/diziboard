import React, { useEffect , useState} from "react"
import Cookies from "js-cookie";
import axios from "axios";
import "./ParentsEachkidAttendance.css"

const ParentsEachkidAttendance=(props)=>{
    const loginToken = Cookies.get("loginToken");
    const {kidDetailsObj}=props
    const [kidAttendance,setKidAttendance]=useState()

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

useEffect(()=>{
    const getKidAttendanceForParent = async () => {
        try {
          const getKidAttendanceForParentUrl =
            "http://192.168.0.116:8280/kidAttendace/1.0/parent";
  
          const res = await axios.post(getKidAttendanceForParentUrl, {
            headers: {
                "content-type":"application/json",
              Authorization: `Bearer ${loginToken}`,
              Accept: "application/json",
            },
            data: 
                {
                    header: {
                      guid: "78996-7521-8512",
                      geoLocation: "LA",
                      responseFrom: "LA",
                      responseOn: "78-2-2018"
                    },
                    body: {
                      mas_parentId: kidDetailsObj.mas_parentUserRef,
                      mas_kidId: kidDetailsObj.mas_kidId,
                      mas_SchoolId: 
                        kidDetailsObj.mas_SchoolUniqueId,
                      mas_class: kidDetailsObj.mas_Class,
                      mas_monthIndex: currentDateAndTime().slice(
                        0,
                        4
                      )
                    }
                  },
            
          });
  
          // in fetch we convert body javascript obj  to json string
          // in axios data  auto converts to json string we just give data js obj
          const parsedRes = res.data;
          const notifionsArr = parsedRes.body;
          setKidAttendance(notifionsArr);
        } catch (error) {
          console.log(error);
        }
      };
      getKidAttendanceForParent();       
},[])

    return (
        <div>
            attendance
        </div>
    )
}

export default ParentsEachkidAttendance