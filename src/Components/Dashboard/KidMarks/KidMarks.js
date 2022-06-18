import React from "react";
import { useState } from "react";

const KidMarks = () => {
  const [subMaxMarks, setSubMaxMarks] = useState(0);

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
      <div className="row">
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
      <div className="row">
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
          </select>
        </div>
        <div className="col-2">
          <button>Add Exam Type</button>
        </div>
      </div>
      <div className="mr-auto">
        <button>Add Marks</button>
        <button>Excel Upload</button>
        <button>Save</button>
      </div>
    </div>
  );
};

export default KidMarks;
