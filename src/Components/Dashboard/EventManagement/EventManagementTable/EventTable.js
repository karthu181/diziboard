import React from "react";
import "./EventTable.css";

const EventTable = ({ data, column }) => {
  return (
    <div className="table-bg-contaner">
      <div className="table-inner-container">
        <table className="table">
          <thead>
            <tr className="table-head">
              {column.map((item, index) => (
                <TableHeadItem item={item} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow item={item} column={column} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      return <td className="body">{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default EventTable;

// import React from 'react';
// import Popup from 'reactjs-popup'
// import { useState } from "react";
// import './AddHoliday.css'
// import 'reactjs-popup/dist/index.css'

// const EventTable = () => {
//     const [holidayName, setHolidayName] = useState("");

//     const onUserInputChange = (event) => {
//         setHolidayName(event.target.value);
//       };

//       const letMeInHandler = async (event) => {
//         event.preventDefault();
//       }
// console.log(holidayName)

//     return (
// <div className='pop-up-container'>
// <Popup modal
//      trigger={
//        <button type="button" className="trigger-button">
//          <span className='span-pop'>+</span>
//        </button>
//      }>
//     <div>
//     <div className='pop-bg-container'>
//         <h1 className='head'>Add Holiday</h1>

//     </div>
//     <div className='form-pop-container'>
//         <form onSubmit={letMeInHandler}>
//             <p >
//                 <label htmlFor='Holiday' className='paragrph'>Holiday</label>
//                 <input type='text'
//                     name='holidayName'
//                     onChange={onUserInputChange}
//                     className='input'
//                 />
//             </p>
//             <p >
//                 <label htmlFor='holidayGroup' className='paragrph'>Holiday Group</label>
//                 <input type='text'
//                     name='holidayGroup'
//                     onChange={onUserInputChange}
//                     className='input'
//                 />
//             </p>
//             <p  >
//                 <label htmlFor='date' className='paragrph' >Date</label>
//                 <input type='date'
//                     name='date'
//                     onChange={onUserInputChange}
//                     className='input'
//                 />
//             </p>
//             <p >
//                 <label htmlFor='description' className='paragrph'>Description</label>
//                 <input type='text'
//                     name='description'
//                     onChange={onUserInputChange}
//                     className='input'
//                 />
//             </p>
//             <p>
//             <label htmlFor='notify'>Notify</label>
//                 <input type='checkbox'
//                     name='notify'
//                 />
//             </p>
//         <div className='button-container'>
//             <button
//            type="submit"
//            className="trigger-button"

//          >
//            Save
//            </button>
//             <button
//            type="submit"
//            className="trigger-button"

//          >
//            Cancle
//            </button>
//         </div>
//         </form>
//         </div>
//     </div>

// </Popup>

// </div>

// )
// }

// export default EventTable;

// import './EventTable.css';
// import React from 'react';
// import { ImEye } from "react-icons/im";
// import {BsTrash} from "react-icons/bs";
// import {BiEdit} from "react-icons/bi";
// import Popup from 'reactjs-popup';

// const EventTable = () => {
//     return (
//         <div><div>
//         <div className='pop-up-container'>
//         <Popup modal
//           trigger={
//               <button type="button" className="eye-button">
//                   <span><ImEye className="eye"/> </span>
//               </button>}>

//           <div className='eye-bg-container'>
//             <h1 className='eye-head'>view Event</h1>
//           </div>
//         <div>

//           <h4 className='event-head'>Event</h4>
//           <p>Culturer Fest event-2018</p>

//     <p><label htmlFor='holidayGroup' className='paragrph'>Description:</label></p>
//     <textarea id="holidayGroup" name="holidayGroup" rows="4" cols="50">
//         CulturerFest
//     </textarea>
//     <div className='button-container'>
//       <button type="submit" className="trigger-button">
//             Ok
//       </button>
//       </div>
//   </div>

//     </Popup>
//     </div>
//     </div>
// <div >
// <Popup
// modal
// trigger={
// <button type="button" className="popup-button" >
// <BsTrash className="trash"/>
// </button>}>
// {close => (
//   <>
//   <div className='container'>
//   <div className='heading-container'>
//     <h1 className='popup-heading'> Delete Event</h1>
//     <button type="button" className="close close-button" onClick={() => close()} aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//     </button>
//   </div>
//     <p className='para'>Do You Really Want To Change The Status..?</p>
//     <button
//     type="button"
//     className="trigger-button"
//     onClick={() => close()}>
//       YES
//     </button>
//   <button
//     type="button"
//     className="trigger-button "
//     onClick={() => close()}>
//       NO
//     </button>
//   </div>
//   </>)}
// </Popup>
// </div>
//         <BiEdit className="edit"/>
//         </div>
//      );
// }

// export default EventTable;
