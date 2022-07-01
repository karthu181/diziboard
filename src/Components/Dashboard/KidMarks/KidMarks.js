import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import AddMarksButton from "./AddMarksButton/AddMarksButton";
import SaveButton from "./SaveButton/SaveButton";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ExcelUploadButton from "./ExcelUploadButton/ExcelUploadButton";

import "./KidMarks.css";

const KidMarks = () => {
  let loginToken = Cookies.get("loginToken");
  const [subMaxMarks, setSubMaxMarks] = useState(0);
  const [schoolExamTypes, setSchoolExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState();

  const [inputExamType, setInputExamType] = useState("");

  const [addExamTypeModalShow, setAddExamTypeModalShow] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);

  const [addMarksArray, setAddMarksArray] = useState([]);
  const [classKidsList, setClassKidsList] = useState([]);

  const handleJustClose = () => {
    setAddExamTypeModalShow(false);
  };

  const [addedExamType, setAddedExamType] = useState("");

  const handleClose = async () => {
    setAddExamTypeModalShow(false);
    const addExamUrl =
      "https://192.168.0.116:8243/mas-examtypes/1.0/insertexamtypes";
    const addExamBody = {
      header: {
        guid: "",
        responseOn: "",
        responseFrom: "",
        userRef: "",
        geoLocation: "anonymous",
        status: "success",
        statuscode: "0",
      },
      body: {
        mas_SchoolUniqueId: "5911355945",
        ExamType: inputExamType,
        Shortcode: inputExamTypeShortcut,
      },
    };
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addExamBody),
    };

    let response = await fetch(addExamUrl, options);
    let addedExamOrNot = await response.json();
    setAddedExamType(addedExamOrNot);
    console.log(addedExamOrNot);
  };
  const handleShow = () => setAddExamTypeModalShow(true);

  useEffect(() => {
    const getSchoolExamTypes = async () => {
      try {
        let getSchoolExamTypesUrl =
          "https://192.168.0.116:8243/mas-examtypes/1.0/getexamtypes";
        let bodyData = {
          header: {
            guid: "",
            responseOn: "",
            responseFrom: "",
            userRef: "",
            geoLocation: "",
            status: "success",
            statuscode: "0",
          },
          body: { mas_SchoolUniqueId: "5911355945" },
        };
        let options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        };
        let response = await fetch(getSchoolExamTypesUrl, options);
        let schoolExamTypesData = await response.json();
        setSchoolExamTypes(schoolExamTypesData.body);
      } catch (e) {
        console.log("Failed to fetch schoolExamtypes");
      }
    };

    getSchoolExamTypes();
  }, [addedExamType]);

  useEffect(() => {
    //getClasskidsList
    const getClasskidsList = async () => {
      try {
        let getClasskidsListUrl =
          "https://192.168.0.116:8243/mas_getclasskidlist/v1/mas_getclasskidlist?mas_SchoolUniqueId=5911355945&mas_Class=SECOND%20CLASS&mas_Section=B&mas_guid=xyz&mas_geoLocation=xyz&mas_requestedFrom=xyz&mas_requestedOn=anonymous";
        // let bodyData = {
        //   mas_SchoolUniqueId: "5911355945",
        //   mas_Class: "SECOND CLASS",
        //   mas_Section: "B",
        //   mas_guid: "xyz",
        //   mas_requestedOn: "xyz",
        //   mas_requestedFrom: "xyz",
        //   mas_geoLocation: "anonymous",
        // };
        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        let response = await fetch(getClasskidsListUrl, options);
        let classKidsListData = await response.json();
        // setSchoolExamTypes(classKidsListData);
        setClassKidsList(classKidsListData.body);
      } catch (e) {
        console.log(e);
      }
    };
    getClasskidsList();
  }, []);

  // if u use function directly in functional component it getting called infinitely
  // the above getSchoolExamTypes fn, so called inside useEffect()
  // using useEffect the fn getting called only oncuechange, if not its getting called infinitely
  // know the reason

  const decrease10 = () => {
    subMaxMarks >= 10 &&
      setSubMaxMarks((prevSubMaxMarks) => prevSubMaxMarks - 10);
  };

  const increase10 = () => {
    setSubMaxMarks((prevSubMaxMarks) => prevSubMaxMarks + 10);
  };

  const subMaxMarksHandler = (event) => {
    setSubMaxMarks(parseInt(event.target.value));
  };

  const onChangeSelectedExamType = (event) => {
    setSelectedExamType(event.target.value);
  };

  //addMarksToTable function props
  const addMarksToTable = (marksArray) => {
    setAddMarksArray(marksArray);
  };

  useEffect(() => {
    if (addMarksArray.length > 0) {
      setDisableSaveButton(false);
    } else {
      setDisableSaveButton(true);
    }
  }, [addMarksArray]);

  const [inputExamTypeShortcut, setInputExamTypeShortcut] = useState();
  //onChangeInputExamTypeHandler
  const onChangeInputExamTypeHandler = (event) => {
    setInputExamType(event.target.value);
  };

  const onChangeInputExamTypeShortcut = (event) => {
    setInputExamTypeShortcut(event.target.value);
  };

  return (
    <div className="container-fluid kidmarks-container">
      <div className="row kidmarks-1st-row">
        <div className="col-4 row-1st-column-containers">
          <label
            className="kidmarks-bold-input-labels"
            htmlFor="kidmarksUsername"
          >
            User Name
          </label>
          <input
            className="kidmarks-input kidmarks-input-disabled no-border"
            placeholder="Username"
            id="kidmarksUsername"
            value="Class Teacher2 CT"
            type="text"
            disabled
          />
        </div>
        <div className="col-4 row-1st-column-containers">
          <label htmlFor="kidmarksClass">Class</label>
          <input
            className="kidmarks-input kidmarks-input-disabled no-border"
            type="text"
            disabled
            placeholder="SECOND CLASS"
            id="kidmarksClass"
          />
        </div>
        <div className="col-4 row-1st-column-containers">
          <label
            className="kidmarks-non-bold-input-labels"
            htmlFor="kidmarksSection"
          >
            Section
          </label>
          <input
            className="kidmarks-input kidmarks-input-disabled no-border"
            type="text"
            disabled
            placeholder="B"
            id="kidmarksSection"
          />
        </div>
      </div>
      <div className="row kidmarks-2nd-row">
        <div className="col-4 containers-2nd-row">
          <label className="kidmarks-bold-input-labels" htmlFor="sub-max-marks">
            Sub Max Marks
          </label>
          <input
            className="kidmarks-input "
            type="text"
            id="sub-max-marks"
            placeholder="Sub Max Marks"
            value={subMaxMarks > 0 ? subMaxMarks : 0}
            onChange={subMaxMarksHandler}
          />
          <button
            className="up-down-buttons-kidmarks"
            type="button"
            onClick={decrease10}
          >
            <AiOutlineDown />
          </button>
          <button
            className="up-down-buttons-kidmarks"
            type="button"
            onClick={increase10}
          >
            <AiOutlineUp />
          </button>
        </div>
        <div className="col-4 containers-2nd-row">
          <label className="kidmarks-bold-input-labels" htmlFor="exam-type">
            Exam Type
          </label>
          <select
            className="select-exam-type-dropdown"
            id="exam-type"
            value={selectedExamType}
            onChange={onChangeSelectedExamType}
          >
            <option value="Select Exam Type">Select Exam Type</option>
            <option value="Annual">Annual</option>
            <option value="Quarterly">Quarterly</option>
            <option value="HalfYearly">HalfYearly</option>
            <option value="Slip Test">Slip Test</option>
            <option value="Unit Test">Unit Test</option>
            <option value="Flash Test">Flash Test</option>
            {schoolExamTypes.map((eachObj) => (
              <option>{eachObj.mas_examtype}</option>
            ))}
          </select>
        </div>
        <div className="col-3 containers-2nd-row">
          <Button variant="primary kidmarks-buttons" onClick={handleShow}>
            Add Exam Type
          </Button>
          {/* modal */}
          <div>
            <Modal
              className="add-exam-type-modal"
              show={addExamTypeModalShow}
              onHide={handleJustClose}
              size="md"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Exam Type</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="add-exam-type-modal-input-container">
                  <label
                    className="kidmarks-add-exam-type-label"
                    htmlFor="examName"
                  >
                    Exam Type:
                  </label>
                  <input
                    className="add-exam-type-modal-input"
                    placeholder="Enter Type"
                    id="examName"
                    type="text"
                    value={inputExamType}
                    onChange={onChangeInputExamTypeHandler}
                  />
                </div>
                <div className="add-exam-type-modal-input-container">
                  <label
                    className="kidmarks-add-exam-type-label"
                    htmlFor="examShort"
                  >
                    Exam ShortCode:
                  </label>
                  <input
                    placeholder="Enter Type ShortCode"
                    className="add-exam-type-modal-input"
                    id="examShort"
                    type="text"
                    value={inputExamTypeShortcut}
                    onChange={onChangeInputExamTypeShortcut}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="kidmarks-buttons"
                  variant="primary"
                  onClick={handleClose}
                >
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div className="row pt-4 ">
        <div className="add-marks-exel-save-btn-container ms-auto">
          {/* since it is margin you should give to element directly not to container */}
          <AddMarksButton
            addMarksToTable={addMarksToTable}
            classKidsList={classKidsList}
            subMaxMarks={subMaxMarks}
          />
          <ExcelUploadButton />
          <SaveButton
            selectedExamType={selectedExamType}
            addMarksArray={addMarksArray}
            disableSaveButton={disableSaveButton}
            subMaxMarks={subMaxMarks}
          />
        </div>
      </div>
      <div className="table-in-kidmarks-container mt-2">
        <table className="table table-bordered border-light">
          <thead className="table-header">
            <tr>
              <th scope="col">Kid Id</th>
              <th scope="col">Class</th>
              <th scope="col">Section</th>
              <th scope="col">Hindi</th>
              <th scope="col">LabSkills</th>
              <th scope="col">IT</th>
              <th scope="col">English</th>
              <th scope="col">Telugu</th>
              <th scope="col">Maths</th>
              <th scope="col">Science</th>
              <th scope="col">Social</th>
              <th scope="col">Total</th>
              <th scope="col">Percentage</th>
            </tr>
          </thead>
          <tbody className="table-body-in-kid-marks">
            {addMarksArray.map((eachMarksObj) => (
              <tr>
                <th scope="row">{eachMarksObj.selectedKidId}</th>
                <td>SECOND CLASS</td>
                <td>B</td>
                <td>{eachMarksObj.addHindi}</td>
                <td>{eachMarksObj.addLabSkills}</td>
                <td>{eachMarksObj.addIt}</td>
                <td>{eachMarksObj.addEnglish}</td>
                <td>{eachMarksObj.addTelugu}</td>
                <td>{eachMarksObj.addMaths}</td>
                <td>{eachMarksObj.addScience}</td>
                <td>{eachMarksObj.addSocial}</td>
                <td>
                  {parseInt(eachMarksObj.addHindi) +
                    parseInt(eachMarksObj.addLabSkills) +
                    parseInt(eachMarksObj.addIt) +
                    parseInt(eachMarksObj.addEnglish) +
                    parseInt(eachMarksObj.addTelugu) +
                    parseInt(eachMarksObj.addMaths) +
                    parseInt(eachMarksObj.addScience) +
                    parseInt(eachMarksObj.addSocial)}
                </td>
                <td>{eachMarksObj.addPercentage}</td>
              </tr>
            ))}
            {/* in plain js we do is element.append but here we do like this
            but here we use state and on update, we get updated data  */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KidMarks;
