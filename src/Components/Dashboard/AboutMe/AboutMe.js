import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AboutMe.css";

const AboutMe = () => {
  const [data1, setData] = useState({});

  const loginToken = Cookies.get("loginToken");

  useEffect(() => {
    axios
      .get(
        "http://192.168.0.116:8280/mas_getuserprofiles/v1/getUserProfile?mas_userId=ct2%40gmail.com&mas_guid=dfg&mas_requestedOn=hfgh&mas_requestedFrom=gfh&mas_geoLocation=gfh",
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const inputFileHandler = () => {
    setShowSaveBtn(!showSaveBtn);
  };
  console.log(showSaveBtn);

  return (
    <div>
      <div className="about-layout abt-lyt">
        <div className="container-fluid abt-bg-cnt">
          <div className="row">
            <div class="col-md-12" style={{ "text-align": "center" }}>
              <h1 className="abt-hed">
                <span className="shad">About Me</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="frm-layout" id="form-container">
                <div></div>
                <form>
                  <div className="padding-about">
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-name">Name:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>
                          {data1.mas_firstName} {data1.mas_lastName}
                        </p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-id">School UniqueId:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p className="uniqueid-paragraph">
                          {data1.mas_schoolUniqueId}
                        </p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-school">School Role:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>{data1.Role}</p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-email">Email ID:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>{data1.mas_userId}</p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-class">Class:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>{data1.mas_class}</p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-created">Created On:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>{data1.mas_createdOn}</p>
                      </div>
                    </div>
                    <div className="name-lastname-firstname-container">
                      <div className="aboutme-subheadings-container">
                        <label className="lable-status">Status:</label>
                      </div>
                      <div className="aboutme-subans-container">
                        <p>Active</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="row" style={{ "margin-bottom": "45px" }}>
            <div class="col-md-4 col-md-offset-4">
              <h2 className="tech-img">Teacher Image</h2>
              <img
                width="150px"
                height="150px"
                style={{ "padding-bottom": "5px" }}
                src="http://192.168.0.116:8080/getimages/classteacher/5911355945/ct2@gmail.com.jpg"
                alt="teacher img"
                className="img-tech"
              />
              <input
                type="file"
                id="filePicker"
                onChange={inputFileHandler}
                className="input-file"
              />
              <div>
                {showSaveBtn ? (
                  <button
                    className="aboutme-save-button"
                    type="submit"
                    id="btnUpld"
                    data-bind="click: updateimage"
                  >
                    Save Image
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
