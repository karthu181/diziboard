// import React from 'react';
// import DatePicker from "react-datepicker";

// const disablePrevDates = (date) => {
//   return date.getDay() === 0;
// }

// const DisbleDate = () => {
//         return (
//             <div>
//                 <DatePicker hintText="Check-in" shouldDisableDate={disablePrevDates} />
//             </div>
//         )

// }

// export default DisbleDate;
// import React from 'react';
// import DatePicker from "react-datepicker";

// const minDate = new Date(Date.now());
// const DisbleDate = () => {
//     return (
//         <div>
//             <div>
//                 <DatePicker hintText="Check-in" minDate={minDate} />
//             </div>
//         </div>
//     )
// }

// export default DisbleDate;

// import React, { Component } from 'react';
// import { render } from 'react-dom';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from 'moment';
// import DisbleDate from './DisbleDate';

// class DisbleDate extends Component {
//   constructor() {
//     super();
//     this.state = {
//       selected: new Date(),
//       minTime: this.calculateMinTime(new Date())
//     };
//   }
//   calculateMinTime = date => {
//     let isToday = moment(date).isSame(moment(), 'day');
//     if (isToday) {
//         let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
//         return nowAddOneHour;
//     }
//     return moment().startOf('day').toDate();
// }

//   handle = (date) => {
//     this.setState({
//       selectedDate: date,
//       minTime: this.calculateMinTime(date)
//     })
//   }
//   render() {
//     return (
//       <div>
//          <DatePicker
//             selected={this.state.selected}
//             onChange={this.handle}
//             excludeOut
//             showTimeSelect
//             timeFormat="HH:mm"
//             timeIntervals={1}
//             dateFormat="MMMM d, yyyy h:mm aa"
//             timeCaption="time"
//             minDate={new Date()}
//             minTime={this.state.minTime}
//             maxTime={moment().endOf('day').toDate()}
//           />
//       </div>
//     );
//   }
// }

// export default DisbleDate;
import DatePicker from "react-datepicker";
import React, { useState } from "react";

const DisbleDate = () => {
  const [startDate, setStartDate] = useState(null);

  // const subDays = () => {

  // }
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={subDays(new Date(), 0)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

export default DisbleDate;
