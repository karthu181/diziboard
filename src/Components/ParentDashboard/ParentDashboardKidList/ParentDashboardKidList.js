import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ParentDashboardKidList.css"
import Cookies from "js-cookie";

const ParentDashboardKidList = () => {
    const loginToken = Cookies.get("loginToken")
    const [kidlistArr, setKidlistArr] = useState([])
    const loggedInUserProfile = JSON.parse(localStorage.getItem("diziUserProfile"))
    const currentDateAndTime = () => {
        const dateObj = new Date();
        const month = (dateObj.getMonth() + 1) <= 9 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1
        const onlyDate = (dateObj.getDate()) <= 9 ? `0${dateObj.getDate()}` : dateObj.getDate()
        const hours = (dateObj.getHours()) <= 9 ? `0${dateObj.getHours()}` : dateObj.getHours()
        const seconds = (dateObj.getSeconds()) <= 9 ? `0${dateObj.getSeconds()}` : dateObj.getSeconds()
        const minutes = (dateObj.getMinutes()) <= 9 ? `0${dateObj.getMinutes()}` : dateObj.getSeconds()
        const currentDateTime = `${dateObj.getFullYear()}-${month}-${onlyDate} ${hours}:${minutes}:${seconds
            }`;
        return currentDateTime;
    };
    console.log(currentDateAndTime())

    const getKidlist = async () => {
        const getKidlistUrl = "http://192.168.0.116:8280/parentKidList/1.0/kidList"
        const getKidlistParams = `?mas_parentUserRef=${loggedInUserProfile.mas_userRef}&Guid=84f4cea4-626a-681e-997d-9e6361f530ce&GeoLocation=anonymous&RequestedFrom=Mozilla%2F5.0%20(Linux%3B%20Android%206.0%3B%20Nexus%205%20Build%2FMRA58N)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F103.0.0.0%20Mobile%20Safari%2F537.36&RequestedOn=${currentDateAndTime()}`
        try{
        const res = await axios.get(getKidlistUrl + getKidlistParams, {
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        });
        const data = res.data
        console.log(data.body)
        setKidlistArr(data.body)
    }catch(error){
        console.log(error)
    }
    };
    useEffect(() => {
        getKidlist();
    }, [])


    return (
        <div className="parent-db-kidlist-bg-container">
            <div className="parent-db-kidlist-btn-container">
                <h4>List of Kids</h4>
                <div>
                    <button
                        className="parent-db-kidlist-button"
                    >Add Kids</button>
                </div>
            </div>
            <ul className="parent-db-kidlist-container">
                {kidlistArr.map((eachKidObj) => {
                    return (
                        <li className="parent-db-eachkid-outer-container">
                            <div className="parent-db-eachkid-inner-container">
                                <div className="parent-db-eachkid-img-container">
                                    <img alt="profile-image"
                                        className="parent-db-eachkid-img"
                                        src="http://192.168.0.116:8080/css/images/kidImages/download.jpg" />
                                </div>
                                <h2 className="parent-db-kid-name">Nikil</h2>
                                <p className="text-center">{eachKidObj.mas_schoolName}</p>
                                <p className="text-center">{eachKidObj.mas_Class}</p>
                                <p className="text-center">{eachKidObj.mas_Section}</p>
                                <p className="text-center">{eachKidObj.mas_kidStatus}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default ParentDashboardKidList