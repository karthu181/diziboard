import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "./AddMarksButton.css";

const AddMarksButton = () => {
  const [addMarksModalShow, setAddMarksModalShow] = useState(false);

  const handleClose = async () => {
    setAddMarksModalShow(false);
  };
  const handleShow = () => setAddMarksModalShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Marks
      </Button>
      {/* modal */}
      <div className="add-marks-modal-box">
        <Modal show={addMarksModalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Kid Marks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="each-input-in-add-marks">
                <label htmlFor="examName">Kid Name:</label>
                <input
                  className="ms-auto"
                  placeholder="Enter Type"
                  id="examName"
                  type="text"
                />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarkskidId">Kid Id:</label>
                <input id="addMarkskidId" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksHindi">Hindi:</label>
                <input id="addMarksHindi" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksLabSkills">LabSkills:</label>
                <input id="addMarksLabSkills" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksIt">IT:</label>
                <input id="addMarksIt" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksEnglish">English:</label>
                <input id="addMarksEnglish" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksTelugu">Telugu:</label>
                <input id="addMarksTelugu" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksMaths">Maths:</label>
                <input id="addMarksMaths" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksScience">Science:</label>
                <input id="addMarksScience" type="text" />
              </div>
              <div className="each-input-in-add-marks">
                <label htmlFor="addMarksSocial">Social:</label>
                <input id="addMarksSocial" type="text" />
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
