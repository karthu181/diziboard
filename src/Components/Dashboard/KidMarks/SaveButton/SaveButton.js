import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import "./SaveButton.css";

const SaveButton = (props) => {
  const loggedInUserProfile = localStorage.getItem("diziUserProfile");

  const {
    addMarksArray,
    disableSaveButton,
    selectedExamType,
    subMaxMarks,
  } = props;
  const [saveModalshow, setSaveModalShow] = useState(false);

  let loginToken = Cookies.get("loginToken");

  const handleClose = () => setSaveModalShow(false);

  const handleShow = () => {
    const insertMarks = async () => {
      try {
        const insertMarksUrl =
          "http://192.168.0.116:8280/mas_exam_sheets/1.0/mas_marks_sheet";

        let toAddMarksArray = addMarksArray.map((eachMarksObj) => {
          return {
            mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
            mas_actualtotal: null,
            mas_class: loggedInUserProfile.mas_class,
            mas_examtype: selectedExamType,
            mas_grade: "A",
            mas_kiduserid: eachMarksObj.selectedKidId,
            mas_lan1_obtained: eachMarksObj.addTelugu,
            mas_lan2_obtained: eachMarksObj.addEnglish,
            mas_lan3_obtained: eachMarksObj.addHindi,
            mas_lan4_obtained: eachMarksObj.addIt,
            mas_lan5_obtained: eachMarksObj.addLabSkills,
            mas_obtainedtotal: eachMarksObj.addTotal,
            mas_percentage: "NaN %",
            mas_section: loggedInUserProfile.mas_section,
            mas_sub1_obtained: eachMarksObj.addMaths,
            mas_sub2_obtained: eachMarksObj.addScience,
            mas_sub3_obtained: eachMarksObj.addSocial,
          };
        });

        const bodyData = {
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
