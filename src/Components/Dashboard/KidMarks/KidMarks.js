import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddMarksButton from "./AddMarksButton/AddMarksButton";
import "./KidMarks.css";

const KidMarks = () => {
  const [subMaxMarks, setSubMaxMarks] = useState(0);
  const [schoolExamTypes, setSchoolExamTypes] = useState([]);

  const [addExamTypeModalShow, setAddExamTypeModalShow] = useState(false);

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
        Authorization: "Bearer 	34913325-5924-374b-9845-cb77dfeb3d4d",
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
            Authorization: "Bearer 	34913325-5924-374b-9845-cb77dfeb3d4d",
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
          <select id="exam-type" value="Select Exam Type">
            <option>Select Exam Type</option>
            <option>Annual</option>
            <option>Quarterly</option>
            <option>HalfYearly</option>
            <option>Slip Test</option>
            <option>Unit Test</option>
            <option>Flash Test</option>
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
          <Modal show={addExamTypeModalShow} onHide={handleClose}>
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
          <button>Add Marks</button>
          <AddMarksButton />
          <button>Excel Upload</button>
          <button disabled>Save</button>
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KidMarks;
