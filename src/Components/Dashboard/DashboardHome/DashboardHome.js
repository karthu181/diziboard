import React from "react";
import DashboardNav from "../DashboardNav/DashboardNav";
import AttendenceDbHome from "./AttendanceDbHome/AttendanceDbHome";
import BirthdaysDbHome from "./BirthdaysDbHome/BirthdaysDbHome";
import ClassTeacherDbHome from "./ClassTeacherDbHome/ClassTeacherDbHome";
import EventsDbHome from "./EventsDbHome/EventsDbHome";
import HolidaysDbHome from "./HolidaysDbHome/HolidaysDbHome";
import KidApprovalsDbHome from "./KidApprovalsDbHome/KidApprovalsDbHome";
import "./DashboardHome.css";

const DashboardHome = () => {
  return (
    <div className="container-fluid dbhome-bg-container">
      <div className="row">
        <div className="col-8 db-left-container">
          <div className="col-12 db-upper-container">
            <ClassTeacherDbHome className="col-4" />
            {/*useless giving col-4 here*/}
            <BirthdaysDbHome className="col-4" />
            {/*useless giving col-4 here*/}
            <AttendenceDbHome className="col-4" />
            {/*useless giving col-4 here*/}
            {/* you should give width 30%-flexobox to div inside Component
            not to compoenent
            similarly grid system give col-4 to div inside component not to compoenent
            eg: div inside <AttendenceDbHome/> not to <AttendenceDbHome/> directly
            know difference between flex and grid */}
          </div>
          <div className="col-12 db-lower-container">
            <KidApprovalsDbHome />
            <EventsDbHome />
            <HolidaysDbHome />
          </div>
        </div>
        <div className="col-4 dbhome-right-container"></div>
        {/* <HomeFooter /> */}
      </div>
    </div>
  );
};

export default DashboardHome;

// import "./AllPages.css";

// import ClassTeacher from "../ClassTeacher/ClassTeacher";

// import Birthday from "../Birthday/Birthday";

// import Attendence from "../Attendence/Attendence";

// import Events from "../Events/Events";

// import Holiday from "../Holiday/Holiday";

// import KidApprovals from "../KidApprovals/KidApprovals";

// import HomeFooter from "../../HomeFooter/HomeFooter";

// import Header from "../../Header/Header";

// const AllPages = () => {
//   return (
//     <div className="allpage-bg-container">
//       <Header />

//       <div className="upper-container">
//         <ClassTeacher />

//         <Birthday />

//         <Attendence />
//       </div>

//       <div className="lower-container">
//         <KidApprovals />

//         <Events />

//         <Holiday />
//       </div>

//       <HomeFooter />
//     </div>
//   );
// };

// export default AllPages;
