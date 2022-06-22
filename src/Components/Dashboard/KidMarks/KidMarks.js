import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import AddMarksButton from "./AddMarksButton/AddMarksButton";
import SaveButton from "./SaveButton/SaveButton";

import "./KidMarks.css";

const KidMarks = () => {
  let loginToken = Cookies.get("loginToken");
  const [subMaxMarks, setSubMaxMarks] = useState(0);
  const [schoolExamTypes, setSchoolExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState();

  const [addExamTypeModalShow, setAddExamTypeModalShow] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);

  const [addMarksArray, setAddMarksArray] = useState([]);
  const [classKidsList, setClassKidsList] = useState([]);

  const handleJustClose = () => {
    setAddExamTypeModalShow(false);
  };

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
        geoLocation: "",
        status: "success",
        statuscode: "0",
      },
      body: {
        mas_SchoolUniqueId: "5911355945",
        ExamType: "abcd",
        Shortcode: "ab",
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

  const [selectedKidId, setSelectedKidId] = useState("");
  const getSelectedKidId = (id) => {
    setSelectedKidId(id);
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <div className="col-4">
          <label>User Name</label>
          <input placeholder="Class Teacher2 CT " type="text" disabled />
        </div>
        <div className="col-4">
          <label>Class</label>
          <input type="text" disabled placeholder="SECOND CLASS" />
        </div>
        <div className="col-4">
          <label>Section</label>
          <input type="text" disabled placeholder="B" />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-4">
          <label htmlFor="sub-max-marks">Sub Max Marks</label>
          <input
            type="text"
            id="sub-max-marks"
            placeholder="Sub Max Marks"
            value={subMaxMarks > 0 ? subMaxMarks : 0}
            onChange={subMaxMarksHandler}
          />
          <button type="button" onClick={decrease10}>
            down
          </button>
          <button type="button" onClick={increase10}>
            up
          </button>
        </div>
        <div className="col-3">
          <label htmlFor="exam-type">Exam Type</label>
          <select
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
          <Button variant="primary" onClick={handleShow}>
            Add Exam Type
          </Button>
        </div>
        {/* modal */}
        <div>
          <Modal show={addExamTypeModalShow} onHide={handleJustClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Exam Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="examName">Exam Type:</label>
              <input
                className="ms-auto"
                placeholder="Enter Type"
                id="examName"
                type="text"
              />
              <br />
              <label htmlFor="examShort">Exam ShortCode:</label>
              <input
                placeholder="Enter Type ShortCode"
                id="examShort"
                type="text"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="row pt-4 ">
        <div className="col-3 ms-auto">
          {/* since it is margin you should give to element directly not to container */}
          <AddMarksButton
            addMarksToTable={addMarksToTable}
            classKidsList={classKidsList}
            getSelectedKidId={getSelectedKidId}
          />
          <button>Excel Upload</button>
          <SaveButton addMarksArray={addMarksArray} />
        </div>
      </div>
      <div className="mt-2">
        <table className="table table-bordered border-dark">
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
          <tbody>
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
