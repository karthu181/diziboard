import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import AddMarksButton from "./AddMarksButton/AddMarksButton";
import SaveButton from "./SaveButton/SaveButton";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ExcelUploadButton from "./ExcelUploadButton/ExcelUploadButton";
import { v4 as uuidv4 } from "uuid";
import "./KidMarks.css";

const KidMarks = () => {
  let loginToken = Cookies.get("loginToken");
  const loggedInUserProfile = JSON.parse(
    localStorage.getItem("diziUserProfile")
  );
  console.log(loggedInUserProfile.mas_userRef);

  const [subMaxMarks, setSubMaxMarks] = useState(0);
  const [schoolExamTypes, setSchoolExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState();

  const [inputExamType, setInputExamType] = useState("");

  const [addExamTypeModalShow, setAddExamTypeModalShow] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);

  const [addMarksArray, setAddMarksArray] = useState([]);
  const [classKidsList, setClassKidsList] = useState([]);

  const [schoolSubjects, setSchoolSubjects] = useState([]);
  const [addMarksClicked, setAddMarksClicked] = useState(false);

  const handleJustClose = () => {
    setAddExamTypeModalShow(false);
  };

  const [addedExamType, setAddedExamType] = useState("");

  const handleClose = async () => {
    setAddExamTypeModalShow(false);
    //dont give query parameters as hardcode (in string static) add params and in variables
    //params must be dynamic, that varibale might change==> parameters might change
    const addExamUrl =
      "https://192.168.0.116:8243/mas-examtypes/1.0/insertexamtypes";
    const addExamBody = {
      header: {
        guid: uuidv4(),
        responseOn: "",
        responseFrom: "",
        userRef: loggedInUserProfile.mas_userRef,
        geoLocation: "anonymous",
        status: "success",
        statuscode: "0",
      },
      body: {
        mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId,
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
    //get exams fetch api
    const getSchoolExamTypes = async () => {
      try {
        //dont give query parameters as hardcode (in string static) add params and in variables
        //params must be dynamic, that varibale might change==> parameters might change
        let getSchoolExamTypesUrl =
          "https://192.168.0.116:8243/mas-examtypes/1.0/getexamtypes";
        let bodyData = {
          header: {
            guid: uuidv4(),
            responseOn: "",
            responseFrom: "",
            userRef: loggedInUserProfile.mas_userRef,
            geoLocation: "",
            status: "success",
            statuscode: "0",
          },
          body: { mas_SchoolUniqueId: loggedInUserProfile.mas_schoolUniqueId },
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
        console.log(schoolExamTypesData);
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
        //dont give query parameters as hardcode (in string static) add params and in variables
        //params must be dynamic, that varibale might change==> parameters might change
        let getClasskidsListUrl =
          "https://192.168.0.116:8243/mas_getclasskidlist/v1/mas_getclasskidlist?mas_SchoolUniqueId=5911355945&mas_Class=SECOND%20CLASS&mas_Section=B&mas_guid=xyz&mas_geoLocation=xyz&mas_requestedFrom=xyz&mas_requestedOn=anonymous";
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

    //get examtypes

    const getSchoolSubjects = async () => {
      try {
        //dont give query parameters as hardcode (in string static) add params and in variables
        //params must be dynamic, that varibale might change==> parameters might change
        let getSchoolSubjectsUrl =
          "http://192.168.0.116:8280/mas_get_schoolsubjects/1.0/getexamtype?mas_SchoolUniqueId=5911355945&Guid=k&GeoLocation=kjkj&RequestedFrom=kj&RequestedOn=k";

        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        let response = await fetch(getSchoolSubjectsUrl, options);
        let schoolSubjectsData = await response.json();
        // setSchoolExamTypes(classKidsListData);
        console.log(schoolSubjectsData.body.common);
        setSchoolSubjects(schoolSubjectsData.body.common);
      } catch (e) {
        console.log(e);
      }
    };

    getSchoolSubjects();
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

  //addMarksClickedOrNot getting as argument

  const addMarksClickedOrNot = (clickedOrNot) => {
    setAddMarksClicked(clickedOrNot);
  };

  //display red warning text to select examtype

  const displayWarningToSelectExamType = () => {
    console.log(selectedExamType);
    console.log(addMarksClicked);
    if (
      (selectedExamType === "" ||
        selectedExamType === undefined ||
        selectedExamType === "Select Exam Type") &&
      addMarksClicked === true
    ) {
      return (
        <p style={{ "font-size": "16px" }} className="pt-3">
          Please Select Exam Type
        </p>
      );
    } else {
      return null;
    }
  };

  //warning popup to enter marks >=0 subMax marks
  const popoverMarksWarningSubMaxMarks = (
    <Popover id="popover-positioned-right" className="max-sub-marks-popover">
      <strong>Enter a number greater than or equal to 0.</strong>
    </Popover>
  );

  return (
    <div className="container-fluid kidmarks-container">
      <div className="row kidmarks-1st-row">
        <div className="col-md-4 col-12 row-1st-column-containers pb-3">
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
        <div className="col-md-4 col-12 row-1st-column-containers pb-3">
          <label htmlFor="kidmarksClass">Class</label>
          <input
            className="kidmarks-input kidmarks-input-disabled no-border"
            type="text"
            disabled
            placeholder="SECOND CLASS"
            id="kidmarksClass"
          />
        </div>
        <div className="col-md-4 col-12 row-1st-column-containers pb-3">
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
        <div className="col-md-4 col-12 containers-2nd-row pb-4 ps-3">
          <label className="kidmarks-bold-input-labels" htmlFor="sub-max-marks">
            Sub Max Marks
          </label>
          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={popoverMarksWarningSubMaxMarks}
            arrowOffsetLeft="top"
          >
            <input
              className="kidmarks-input "
              type="text"
              id="sub-max-marks"
              placeholder="Sub Max Marks"
              value={subMaxMarks > 0 ? subMaxMarks : 0}
              onChange={subMaxMarksHandler}
            />
          </OverlayTrigger>
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
        <div className="col-md-4 col-12 containers-2nd-row pb-4">
          <label className="kidmarks-bold-input-labels" htmlFor="exam-type">
            Exam Type
          </label>
          <select
            className="select-exam-type-dropdown"
            id="exam-type"
            value={selectedExamType}
            onChange={onChangeSelectedExamType}
          >
            <option value="Select Exam Type" className="italic">
              Select Exam Type
            </option>
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
        <div className="col-md-4 col-12 containers-2nd-row pb-4">
          <Button className="kidmarks-buttons" onClick={handleShow}>
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
        <div className="text-danger">{displayWarningToSelectExamType()}</div>
        <div className="add-marks-exel-save-btn-container ms-auto">
          {/* since it is margin you should give to element directly not to container */}
          <AddMarksButton
            addMarksToTable={addMarksToTable}
            classKidsList={classKidsList}
            subMaxMarks={subMaxMarks}
            selectedExamType={selectedExamType}
            addMarksClickedOrNot={addMarksClickedOrNot}
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
      <div className="kidsmarks-table-scroll-container">
        <div className="table-in-kidmarks-container mt-2">
          <div className="table-responsive kidmarks-table-2nd-container">
            <table className="table table-bordered border-light">
              <thead className="table-header">
                <tr>
                  <th scope="col" className="kidmarks-table-headings">
                    Kid Id
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Class
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Section
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Hindi
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    LabSkills
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    IT
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    English
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Telugu
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Maths
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Science
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Social
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Total
                  </th>
                  <th scope="col" className="kidmarks-table-headings">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="table-body-in-kid-marks">
                {addMarksArray.map((eachMarksObj) => (
                  <tr>
                    <td scope="row" className="table-body-each-col">
                      {eachMarksObj.selectedKidId}
                    </td>
                    <td className="table-body-each-col">SECOND CLASS</td>
                    <td className="table-body-each-col">B</td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addHindi}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addLabSkills}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addIt}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addEnglish}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addTelugu}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addMaths}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addScience}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addSocial}
                    </td>
                    <td className="table-body-each-col">
                      {parseInt(eachMarksObj.addHindi) +
                        parseInt(eachMarksObj.addLabSkills) +
                        parseInt(eachMarksObj.addIt) +
                        parseInt(eachMarksObj.addEnglish) +
                        parseInt(eachMarksObj.addTelugu) +
                        parseInt(eachMarksObj.addMaths) +
                        parseInt(eachMarksObj.addScience) +
                        parseInt(eachMarksObj.addSocial)}
                    </td>
                    <td className="table-body-each-col">
                      {eachMarksObj.addPercentage}
                    </td>
                  </tr>
                ))}
                {/* in plain js we do is element.append but here we do like this
            but here we use state and on update, we get updated data  */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidMarks;
