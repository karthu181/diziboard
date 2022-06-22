import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "./AddMarksButton.css";

const AddMarksButton = (props) => {
  const { addMarksToTable, classKidsList, getSelectedKidId } = props;

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
          ((parseInt(addHindi) +
            parseInt(addLabSkills) +
            parseInt(addIt) +
            parseInt(addEnglish) +
            parseInt(addTelugu) +
            parseInt(addMaths) +
            parseInt(addScience) +
            parseInt(addSocial)) *
            100) /
          800,
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
  const handleShow = () => setAddMarksModalShow(true);

  // onCHange kid dropdown handler
  const onChangeKidObjHandler = (event) => {
    setSelectedKidId(event.target.value);
    getSelectedKidId(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Marks
      </Button>
      {/* modal */}
      <div>
        <Modal show={addMarksModalShow} onHide={handleJustClose}>
          <Modal.Header closeButton>
            <Modal.Title>Kid Marks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="each-input-in-add-marks">
                <label htmlFor="examName">Kid Name:</label>
                <select
                  className="ms-auto"
                  placeholder="Select Kid Name"
                  id="examName"
                  value={selectedKidId}
                  onChange={onChangeKidObjHandler}
                >
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
                <label htmlFor="addMarkskidId">Kid Id:</label>
                <input id="addMarkskidId" type="text" value={selectedKidId} />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksHindi">Hindi:</label>
                <input
                  id="addMarksHindi"
                  type="text"
                  onChange={onChangeHindi}
                  value={addHindi}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksLabSkills">LabSkills:</label>
                <input
                  id="addMarksLabSkills"
                  type="text"
                  onChange={onChangeLabskills}
                  value={addLabSkills}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksIt">IT:</label>
                <input
                  id="addMarksIt"
                  type="text"
                  onChange={onChangeIt}
                  value={addIt}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksEnglish">English:</label>
                <input
                  id="addMarksEnglish"
                  type="text"
                  onChange={onChangeEnglish}
                  value={addEnglish}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksTelugu">Telugu:</label>
                <input
                  id="addMarksTelugu"
                  type="text"
                  onChange={onChangeTelugu}
                  value={addTelugu}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksMaths">Maths:</label>
                <input
                  id="addMarksMaths"
                  type="text"
                  onChange={onChangeMaths}
                  value={addMaths}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksScience">Science:</label>
                <input
                  id="addMarksScience"
                  type="text"
                  onChange={onChangeScience}
                  value={addScience}
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksSocial">Social:</label>
                <input
                  id="addMarksSocial"
                  type="text"
                  onChange={onChangeSocial}
                  value={addSocial}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddMarksButton;
