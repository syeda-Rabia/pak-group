import zIndex from "@material-ui/core/styles/zIndex";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 function DatePick({setDays}) {
  const [startDate, setStartDate] = useState("");
  const months=['JAN','FEB','MAR','APR',"MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return <DatePicker  className="border-0"
  style={{border:"1px solid white"}}
  
  value={startDate}
  selected={startDate}
  onChange={(date) => {
    setStartDate(date);
    // console.log(date);
    // showDate(date);
    let m=date.toString().split(" ")[1];
    let monthNumber=months.findIndex((item)=>item.toUpperCase()==m.toUpperCase())+1;

    console.log(monthNumber,date);
    setDays(state=>({...state,month:monthNumber>10?monthNumber:"0"+monthNumber}))
  }}
  
  dateFormat="MM"
  popperClassName="some-custom-class"
  popperPlacement="left"
  popperModifiers={{
    offset: {
      enabled: true,
      offset: "5px, 10px"
    },
    preventOverflow: {
      enabled: true,
      escapeWithReference: false,
      boundariesElement: "viewport"
    }
  }}
  showMonthYearPicker
/>;
}
export function YearPicking({setDays}) {

const [startDate, setStartDate] = useState("");
return (
  <DatePicker className="border-0"
  style={{border:"1px solid white"}}
    selected={startDate}
    value={startDate}
 
    onChange={(date) => {setStartDate(date)
    
      setDays(state=>({...state,year:date.toString().split(" ")[3]}))
    
    }}
    popperClassName="some-custom-class"
    popperPlacement="top"
    popperModifiers={{
      offset: {
        enabled: true,
        offset: "5px, 10px"
      },
      preventOverflow: {
        enabled: true,
        escapeWithReference: false,
        boundariesElement: "viewport"
      }
    }}
    showYearPicker
    dateFormat="yyyy"
  />
);
}
export function DayPicking({ value,setStart, setEnd }) {
 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const onChange = dates => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };
  return (
    <>
    <div className="row">
    <div className="col-md-6 col-sm=12">
      <h6>Start Date</h6>
    <DatePicker
     className="form-control w-100 "
        selected={startDate}
        onChange={(date) => {setStartDate(date)
    
          setStart(date)
        
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
    </div>
    <div className="col-md-6 col-sm=12" style={{float: "right" ,border:"none" ,paddingLeft:"5px"}} >
    <h6>End date</h6>
    <DatePicker
    className="form-control w-100 "
        selected={endDate}
        onChange={(date) => {setEndDate(date)
          setEnd(date)
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
    </div>
   
      
      </>
  );
  }
  
export default DatePick;
