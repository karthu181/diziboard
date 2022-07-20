import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import "./SaveButton.css";

const SaveButton = (props) => {
  const loggedInUserProfile = localStorage.getItem("diziUserProfile");

  const { addMarksArray, disableSaveButton, selectedExamType, subMaxMarks } = props;
  const [saveModalshow, setSaveModalShow] = useState(false);

  let loginToken = Cookies.get("loginToken");

  const handleClose = () => setSaveModalShow(false);

  const handleShow = () => {
    const insertMarks = async () => {
      try {
        const insertMarksUrl =
          "http://192.168.0.116:8280/mas_exam_sheets/1.0/mas_marks_sheet";

        let toAddMarksArray = addMarksArray.map((eachMarksObj) => {
          console.log(eachMarksObj)
          return {
            mas_examtype: selectedExamType,
            mas_lan1_total: subMaxMarks,
            mas_lan1_obtained: eachMarksObj.addTelugu,
            mas_lan2_total: subMaxMarks,
            mas_lan2_obtained: eachMarksObj.addEnglish,
            mas_lan3_total: subMaxMarks,
            mas_lan3_obtained: eachMarksObj.addHindi,
            mas_lan4_total: subMaxMarks,
            mas_lan4_obtained: eachMarksObj.addIt,
            mas_lan5_total: subMaxMarks,
            mas_lan5_obtained: eachMarksObj.addLabSkills,
            mas_lan6_total: subMaxMarks,
            mas_lan7_total: subMaxMarks,
            mas_lan8_total: subMaxMarks,
            mas_lan9_total: subMaxMarks,
            mas_lan10_total: subMaxMarks,
            mas_lan11_total: subMaxMarks,
            mas_lan12_total: subMaxMarks,
            mas_lan13_total: subMaxMarks,
            mas_lan14_total: subMaxMarks,
            mas_lan15_total: subMaxMarks,
            mas_lan16_total: subMaxMarks,
            mas_lan17_total: subMaxMarks,
            mas_sub1_total: subMaxMarks,
            mas_sub1_obtained: eachMarksObj.addMaths,
            mas_sub2_total: subMaxMarks,
            mas_sub2_obtained: eachMarksObj.addScience,
            mas_sub3_total: subMaxMarks,
            mas_sub3_obtained: eachMarksObj.addSocial,
            mas_sub4_total: subMaxMarks,
            mas_sub5_total: subMaxMarks,
            mas_sub6_total: subMaxMarks,
            mas_sub7_total: subMaxMarks,
            mas_sub8_total: subMaxMarks,
            mas_sub9_total: subMaxMarks,
            mas_sub10_total: subMaxMarks,
            mas_sub11_total: subMaxMarks,
            mas_sub12_total: subMaxMarks,
            mas_sub13_total: subMaxMarks,
            mas_sub14_total: subMaxMarks,
            mas_sub15_total: subMaxMarks,
            mas_sub16_total: subMaxMarks,
            mas_sub17_total: subMaxMarks,
            mas_actualtotal: subMaxMarks * 8,
            mas_obtainedtotal: eachMarksObj.addTotal,
            mas_percentage: `${eachMarksObj.addPercentage} %`,
            mas_grade: "A",
            mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
            mas_kiduserid: eachMarksObj.selectedKidId,
            mas_class: loggedInUserProfile.mas_class,
            mas_section: loggedInUserProfile.mas_section,
          };
        });
        console.log(toAddMarksArray)
        const bodyData ={
          header: {
            guid: uuidv4(),
            requestedOn: "b",
            requestedFrom: "c",
            geoLocation: "d",
          },
          body: toAddMarksArray,
        };
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        };
        const response = await fetch(insertMarksUrl, options);
        const insertedResponse = await response.json();
        console.log(insertedResponse);
      } catch (error) {
        console.log(error);
      }
    };

    insertMarks();

    setSaveModalShow(true);
  };
  return (
    <>
      <Button
        className="save-btn-in-kidmarks"
        onClick={handleShow}
        disabled={disableSaveButton}
      >
        Save
      </Button>

      <Modal
        className="save-btn-modal"
        show={saveModalshow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Kid Marks Inserted Successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveButton;
