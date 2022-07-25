import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ParentsEachkidMarks.css";
import Cookies from "js-cookie";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ParentsEachkidMarks = (props) => {
  const { kidDetailsObj } = props;
  const loginToken = Cookies.get("loginToken");
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState();
  const [subWiseMarksArr, setSubWiseMarksArr] = useState([]);

  const currentDateAndTime = () => {
    const dateObj = new Date();
    const month =
      dateObj.getMonth() + 1 <= 9
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const onlyDate =
      dateObj.getDate() <= 9 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const hours =
      dateObj.getHours() <= 9 ? `0${dateObj.getHours()}` : dateObj.getHours();
    const seconds =
      dateObj.getSeconds() <= 9
        ? `0${dateObj.getSeconds()}`
        : dateObj.getSeconds();
    const minutes =
      dateObj.getMinutes() <= 9
        ? `0${dateObj.getMinutes()}`
        : dateObj.getSeconds();
    const currentDateTime = `${dateObj.getFullYear()}-${month}-${onlyDate} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
  };
  useEffect(() => {
    const getExamType = async () => {
      try {
        const getExamTypeUrl =
          "http://192.168.0.116:8280/mas_KidExamType/1.0/getKidExamtype";
        const getExamTypeParams = `?mas_SchoolUniqueId=${
          kidDetailsObj.mas_SchoolUniqueId
        }&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=${currentDateAndTime()}`;

        const res = await axios.get(getExamTypeUrl + getExamTypeParams, {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            Accept: "application/json",
          },
        });

        // in fetch we convert body javascript obj  to json string
        // in axios data  auto converts to json string we just give data js obj
        const parsedRes = res.data;
        const examTypeData = parsedRes.body;
        console.log(examTypeData);
        setExamTypes(examTypeData);
      } catch (error) {
        console.log(error);
      }
    };
    getExamType();
  }, []);

  const onChangeExamTypeHandler = (event) => {
    setSelectedExamType(event.target.value);
  };

  const getMarksHandler = () => {
    const getSubWiseMarks = async () => {
      try {
        const getSubWiseMarksUrl =
          "http://192.168.0.116:8280/mas_subwisekidmarks/1.0/getsubwise_kidmarks";
        const getSubWiseMarksparams = `?mas_kiduserid=${
          kidDetailsObj.mas_kidId
        }&mas_SchoolUniqueId=${
          kidDetailsObj.mas_SchoolUniqueId
        }&mas_examtype=${selectedExamType}&Guid=aa&GeoLocation=aa&RequestedFrom=aa&RequestedOn=${currentDateAndTime()}`;

        const res = await axios.get(
          getSubWiseMarksUrl + getSubWiseMarksparams,
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
              Accept: "application/json",
            },
          }
        );

        // in fetch we convert body javascript obj  to json string
        // in axios data  auto converts to json string we just give data js obj
        const parsedRes = res.data;
        const subWiseMarksData = parsedRes.body;
        console.log(subWiseMarksData);
        setSubWiseMarksArr(subWiseMarksData);
      } catch (error) {
        console.log(error);
      }
    };
    getSubWiseMarks();
  };
//getting array ofname of subjects from response of subWise marks
  const subNamesArr=subWiseMarksArr.map((eachSub)=>{
    return eachSub.name
  })
// getting array of marks obtained in each subject
  const marksObtainedArr=subWiseMarksArr.map((eachSub)=>{
    return eachSub.marks_obtained
  })
// getting max marks of each subject
const maxMarksOfSubjectsArr=subWiseMarksArr.map((eachSub)=>{
    return eachSub.total
  })  


  // highcharts option

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "SubWise Marks",
    },
    subtitle: {
      text: "Source: WorldClimate.com",
    },
    xAxis: {
      categories:subNamesArr,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rainfall (mm)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total Marks",
        data: [
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
        ],
      },
      
      {
        name: "Scored Marks",
        data: [
          42.4,
          33.2,
          34.5,
          39.7,
          52.6,
          75.5,
          57.4,
          60.4,
          47.6,
          39.1,
          46.8,
          51.1,
        ],
      },
    ],
  };

  return (
    <div>
      <div>
        <label>
          Exam Type:
          <select value={selectedExamType} onChange={onChangeExamTypeHandler}>
            {examTypes.map((eachExam) => {
              return (
                <option value={eachExam.mas_examtype}>
                  {eachExam.mas_examtype}
                </option>
              );
            })}
          </select>
        </label>
        <button type="button" onClick={getMarksHandler}>
          Get Marks
        </button>
      </div>
      
        <form className="parents-eachkid-marks-sublabels-container w-50">
          <div className="w-50">
            <h2 className="parents-eachkid-marks-sublabels">
              Kid Id : <span>{kidDetailsObj.mas_kidId}</span>
            </h2>
            <h2 className="parents-eachkid-marks-sublabels">
              Kid Class : <span>{kidDetailsObj.mas_Class}</span>
            </h2>
          </div>
          <div className="w-50">
            <h6 className="parents-eachkid-marks-sublabels">
              Kid Section : <span>{kidDetailsObj.mas_Section}</span>
            </h6>
            <h6 className="parents-eachkid-marks-sublabels">
              School UniqueId : <span>{kidDetailsObj.mas_SchoolUniqueId}</span>
            </h6>
          </div>
        </form>
        {/* table and chart */}
        <div className="d-flex flex-row">
        <div className="parents-eachkid-marks-left-cont">
        <div>
          <table className="table table-bordered border-light">
            <thead className="kidmarks-table-header">
              <tr>
                <th scope="col" className="kidmarks-table-headings">
                  Subjects
                </th>
                <th scope="col" className="kidmarks-table-headings">
                  Max Marks
                </th>
                <th scope="col" className="kidmarks-table-headings">
                  Marks Gained
                </th>
              </tr>
            </thead>
            <tbody className="table-body-in-kid-marks">
              {subWiseMarksArr.map((eachSub) => (
                <tr>
                  <td scope="row" className="kidmarks-table-body-each-col">
                    {eachSub.name}
                  </td>
                  <td className="kidmarks-table-body-each-col">
                    {eachSub.total}
                  </td>
                  <td className="kidmarks-table-body-each-col">
                    {eachSub.marks_obtained}
                  </td>
                </tr>
              ))}
              {/* in plain js we do is element.append but here we do like this
            but here we use state and on update, we get updated data  */}
            </tbody>
          </table>
          <div>
            <button type="button">Download</button>
          </div>
        </div>
        
      </div>
      <div className="parents-eachkid-marks-right-cont">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
        </div>
    </div>
  );
};

export default ParentsEachkidMarks;
