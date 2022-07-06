import React, { useEffect } from "react";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddMarksButton.css";

const AddMarksButton = (props) => {
  const loggedInUserProfile = JSON.stringify(
    localStorage.getItem("diziUserProfile")
  );

  const {
    addMarksToTable,
    classKidsList,
    subMaxMarks,
    selectedExamType,
    addMarksClickedOrNot,
  } = props;

  const [addHindi, setAddHindi] = useState("");
  const [addLabSkills, setAddLabskills] = useState("");
  const [addIt, setAddIt] = useState("");
  const [addEnglish, setAddEnglish] = useState("");
  const [addTelugu, setAddTelugu] = useState("");
  const [addMaths, setAddMaths] = useState("");
  const [addScience, setAddScience] = useState("");
  const [addSocial, setAddSocial] = useState("");

  const [addedMarksArray, setAddedMarksArray] = useState([]);

  const [selectedKidId, setSelectedKidId] = useState("");

  const onChangeHindi = (event) => {
    setAddHindi(event.target.value);
  };
  const onChangeLabskills = (event) => {
    setAddLabskills(event.target.value);
  };
  const onChangeIt = (event) => {
    setAddIt(event.target.value);
  };
  const onChangeEnglish = (event) => {
    setAddEnglish(event.target.value);
  };
  const onChangeTelugu = (event) => {
    setAddTelugu(event.target.value);
  };
  const onChangeMaths = (event) => {
    setAddMaths(event.target.value);
  };
  const onChangeScience = (event) => {
    setAddScience(event.target.value);
  };
  const onChangeSocial = (event) => {
    setAddSocial(event.target.value);
  };

  const [addMarksModalShow, setAddMarksModalShow] = useState(false);

  const handleJustClose = () => {
    setAddMarksModalShow(false);
  };

  const handleClose = () => {
    setAddMarksModalShow(false);
    const addingMarks = async () => {
      const newAddedMarks = {
        selectedKidId,
        addHindi,
        addLabSkills,
        addIt,
        addEnglish,
        addTelugu,
        addMaths,
        addScience,
        addSocial,
        addTotal:
          parseInt(addHindi) +
          parseInt(addLabSkills) +
          parseInt(addIt) +
          parseInt(addEnglish) +
          parseInt(addTelugu) +
          parseInt(addMaths) +
          parseInt(addScience) +
          parseInt(addSocial),
        addPercentage:
          (((parseInt(addHindi) +
            parseInt(addLabSkills) +
            parseInt(addIt) +
            parseInt(addEnglish) +
            parseInt(addTelugu) +
            parseInt(addMaths) +
            parseInt(addScience) +
            parseInt(addSocial)) *
            100) /
            subMaxMarks) *
          8,
      };
      setAddedMarksArray((prevArray) => {
        return [...prevArray, newAddedMarks];
      });
    };
    addingMarks();
    //   addMarksToTable(addedMarksArray);
    //   console.log(addedMarksArray)

    //using setAddedMarksArray ==>using set not upates immediately
    // logging empty array console.log(addedMarksArray)
  };

  useEffect(() => {
    addMarksToTable(addedMarksArray);
  }, [addedMarksArray]);

  const handleShow = () => {
    console.log(selectedExamType);
    selectedExamType !== "" &&
      selectedExamType !== undefined &&
      setAddMarksModalShow(true);

    addMarksClickedOrNot(true);
  };

  // onCHange kid dropdown handler
  const onChangeKidObjHandler = (event) => {
    setSelectedKidId(event.target.value);
  };

  //warning popup to enter marks >=0
  const popoverMarksWarning = (
    <Popover
      id="popover-positioned-right"
      positionTop={50}
      className="kidmarks-warning-marks-popover"
    >
      <strong>Enter a number greater than or equal to 0.</strong>
    </Popover>
  );

  return (
    <>
      <Button
        variant="primary addmarks-button-in-kidmarks"
        onClick={handleShow}
      >
        Add Marks
      </Button>
      {/* modal */}
      <div>
        <Modal
          className="addmarks-modal"
          show={addMarksModalShow}
          onHide={handleJustClose}
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>KID MARKS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label-no-bold"
                  htmlFor="examName"
                >
                  Kid Name:
                </label>
                <select
                  className="addmarks-modal-input"
                  placeholder="Select Kid Name"
                  id="examName"
                  value={selectedKidId}
                  onChange={onChangeKidObjHandler}
                >
                  <option value="Select Kid Name">Select Kid Name</option>
                  {/* fullnameofKid extracted from fetched data */}
                  {classKidsList.map((eachKid) => {
                    const fullNameOfKid = `${eachKid.mas_firstName} ${eachKid.mas_lastName}`;
                    return (
                      <option value={eachKid.mas_kidId}>{fullNameOfKid}</option>
                    );
                  })}
                </select>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label-no-bold"
                  htmlFor="addMarkskidId"
                >
                  Kid Id:
                </label>
                <input
                  className="addmarks-modal-input"
                  id="addMarkskidId"
                  type="text"
                  value={selectedKidId}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label className="addmarks-modal-label" htmlFor="addMarksHindi">
                  Hindi:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksHindi"
                    type="text"
                    onChange={onChangeHindi}
                    value={addHindi}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label"
                  htmlFor="addMarksLabSkills"
                >
                  LabSkills:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksLabSkills"
                    type="text"
                    onChange={onChangeLabskills}
                    value={addLabSkills}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label className="addmarks-modal-label" htmlFor="addMarksIt">
                  IT:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksIt"
                    type="text"
                    onChange={onChangeIt}
                    value={addIt}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label"
                  htmlFor="addMarksEnglish"
                >
                  English:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksEnglish"
                    type="text"
                    onChange={onChangeEnglish}
                    value={addEnglish}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label"
                  htmlFor="addMarksTelugu"
                >
                  Telugu:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksTelugu"
                    type="text"
                    onChange={onChangeTelugu}
                    value={addTelugu}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label className="addmarks-modal-label" htmlFor="addMarksMaths">
                  Maths:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksMaths"
                    type="text"
                    onChange={onChangeMaths}
                    value={addMaths}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label"
                  htmlFor="addMarksScience"
                >
                  Science:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksScience"
                    type="text"
                    onChange={onChangeScience}
                    value={addScience}
                  />
                </OverlayTrigger>
              </div>
              <div className="each-input-in-add-marks">
                <label
                  className="addmarks-modal-label"
                  htmlFor="addMarksSocial"
                >
                  Social:
                </label>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popoverMarksWarning}
                >
                  <input
                    className="addmarks-modal-input"
                    id="addMarksSocial"
                    type="text"
                    onChange={onChangeSocial}
                    value={addSocial}
                  />
                </OverlayTrigger>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="add-btn-in-addmarks-modal"
              variant="primary"
              onClick={handleClose}
            >
              Add Marks
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddMarksButton;
