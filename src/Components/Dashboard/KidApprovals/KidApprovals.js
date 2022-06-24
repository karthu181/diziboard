import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";

const KidApprovals = () => {
  let loginToken = Cookies.get("loginToken");
  const [kidpendingStatusArray, setKidpendingStatusArray] = useState([]);

  useEffect(() => {
    const getPendingKidStatus = async () => {
      const getPendingKidStatusUrl =
        "http://192.168.0.116:8280/mas_kidStatus/1.0/get_pending_kid_Status?mas_userId=ct2@gmail.com&mas_requestedOn=2022-6-24%2017:20:17&mas_requestedFrom=Mozilla/5.0%20(Linux;%20Android%206.0;%20Nexus%205%20Build/MRA58N)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/102.0.0.0%20Mobile%20Safari/537.36&mas_guId=385bae40-ea6b-ef5c-d5d5-2fbb4e92baef&mas_geoLocation=anonymous&limit=10&offset=0&totalResults=true";
      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(getPendingKidStatusUrl, options);
      const kidPendingStatusData = await response.json();
      setKidpendingStatusArray(kidPendingStatusData);
    };
    getPendingKidStatus();
  }, []);

  return <div></div>;
};

export default KidApprovals;
