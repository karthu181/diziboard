import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

import "./ExcelUploadButton.css";

const ExcelUploadButton = () => {
  const [excelUploadPopupShow, setExcelUploadPopup] = useState(false);

  const handleClose = () => setExcelUploadPopup(false);
  const handleShow = () => setExcelUploadPopup(true);

  return (
    <>
      <Button
        className="excel-upload-button"
        variant="primary"
        onClick={handleShow}
      >
        Excel Upload
      </Button>

      <Modal
        className="excel-upload-modal"
        show={excelUploadPopupShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Excel Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="excel-upload-green-text">
            Please Take Reference of Sample File Before Uploading Marks
          </p>
          <button type="button" className="excel-upload-modal-sample-file-btn">
            Sample File
          </button>
          <br />
          <div className="choose-file-btn-text-container">
            <button
              type="button"
              className="excel-upload-modal-choose-file-btn"
            >
              Choose File
            </button>
            <p className="excel-upload-modal-no-file-chosen-text">
              No file chosen
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="excel-upload-modal-update-marks-btn"
            variant="primary"
            onClick={handleClose}
          >
            Update Marks
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExcelUploadButton;
