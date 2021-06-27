import zIndex from "@material-ui/core/styles/zIndex";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col } from "react-bootstrap";
 function DatePick({setDays}) {
  const [startDate, setStartDate] = useState("");
  const months=['JAN','FEB','MAR','APR',"MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return <DatePicker  className="border-0"
  style={{border:"1px solid white"}}
  
  value={startDate}
  selected={startDate}
  onChange={(date) => {
    setStartDate(date);
    if(date!=null){
      let m=date.toString().split(" ")[1];
      let monthNumber=months.findIndex((item)=>item.toUpperCase()==m.toUpperCase())+1;
  
      console.log(monthNumber,date);
    
  
      setDays(state=>({...state,month:monthNumber>10?monthNumber:"0"+monthNumber}))
    }
   
    console.log(date);
    // showDate(date);
   
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
console.log("date...",date)
    if(date!=null)

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
export function DayPicking({ value,setStart, setEnd,Start:startDate,End:endDate }) {
 
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  // const onChange = dates => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };
 
  return (
    <>
    <Row >
    <Col className="col-md-6 col-sm=12">
      <h6 style={{ color: "#818181", }}>Start Date</h6>
      
    <DatePicker
     className="form-control w-100 bg-white"
     
        selected={startDate}
        required="true"
        onChange={(date) => {setStartDate(date)
          // let start=date.toString().split(" ")[1];
          
          setStart(date)
        
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        format="yyyy/MM/dd"
      />
      {end!="" && start==""?(
         <small className="form-text  text-red mb-1" 
         style={{ color: "red",fontSize: 15 }}
         >
           *This field is required
         </small>
      ):null
      }
      <p></p>
    </Col>
    <Col className="col-md-6 col-sm=12" style={{float: "right" ,border:"none" ,paddingLeft:"5px"}} >
    <h6 style={{ color: "#818181" }}>End date</h6>
    <DatePicker
    className="form-control w-100 bg-white"
        selected={endDate}
        required="true"
        onChange={(date) => {setEndDate(date)
          // let end=date.toString().split(" ")[1];
          setEnd(date)
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        format="yyyy/MM/dd"
        popperPlacement="bottom mr-2"
      />
       {start!="" && end==""?(
         <small className="form-text  text-red mb-1" 
         style={{ color: "red",fontSize: 15 }}
         >
           *This field is required
         </small>
      ):null
      }
    </Col>
    </Row>
   
      
      </>
  );
  }
  
export default DatePick;
