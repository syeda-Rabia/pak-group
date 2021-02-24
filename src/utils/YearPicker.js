import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 function DatePick({setDays}) {
  const [startDate, setStartDate] = useState(new Date());
  const months=['JAN','FEB','MAR','APR',"MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return <DatePicker  
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
  showMonthYearPicker
/>;
}

export default DatePick;
