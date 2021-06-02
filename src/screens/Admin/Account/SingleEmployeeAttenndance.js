import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import PreLoading from "../../../components/PreLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faEye,faClock } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@material-ui/core/Dialog";
import { Modal } from "react-bootstrap";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ApiUrls from "./../../../utils/ApiUrls";
import { GET, formatDate,POST } from "./../../../utils/Functions";
import "./../../Admin/Leads/LeadsAdmin.css";
import { dummyData } from "../../../assests/constants/todoList";
import { publicURL,publicURLimage } from "./../../../utils/Config";
import DatePick, { YearPicking } from "../../../utils/YearPicker";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
  KeyboardDatePickerAttendance,
  StaticTimePicker,
} from "../../../utils/KeyboardTimePickerExample";
import Pagination from "../../../components/Pagination/Pagination";
import Image from "../../../components/imageupload";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";


 
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function EmployeeReport(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState();
  const [image, setImage] = React.useState("");
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [timeError, setTimeError] = useState([]);
  // const [data, setData] = useState(dummyData);
  const [data, setData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [empdata, setEmpData] = useState();
  const [summary, setSummary] = useState();
  const [open, setOpen] = React.useState("signin");
  const [attTime, setAttTime] = useState();

  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [time, setTime] = useState();

  const [type, setType] = useState("");
  let timeVal = new Date();
  var today = new Date();
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const [days, setDays] = useState({
    day: "",
    month: "",
    year: "",
  });
  // const [time, setTime] = useState(timee);
  const to12Format = (time) => {
    if(time){
      let hour = time?.split(':')?.[0];
      let min = time?.split(':')?.[1];
      let  res= {
        time: `${hour % 12 == 0 ? 12 : hour % 12}:${min}`,
        format: `${hour < 12 ? 'AM' : 'PM'}`,
      };
      return `${res.time} ${res.format}`  
    }
   
  };
  
  const compare = (start,end,index) => {
    var startHour = start?.split(':')?.[0];
    var startMinute = start?.split(':')?.[1];
    var startSecond = start?.split(':')?.[2];
   
    var endHour = end?.split(':')?.[0];
    var endMinute = end?.split(':')?.[1];
    var endSecond = end?.split(':')?.[2];
   
    //Create date object and set the time to that
    var startTimeObject = new Date();
    startTimeObject.setHours(startHour, startMinute, startSecond);
   
    //Create date object and set the time to that
    var endTimeObject = new Date(startTimeObject);
    endTimeObject.setHours(endHour, endMinute, endSecond);
   
    //Now we are ready to compare both the dates
    if(startTimeObject > endTimeObject)
    {
    // alert('End time should be after start time.');

  if(!timeError.includes(index)){
    setTimeError(state=>state.concat(index))
  }
    console.log("End time should be after start time.");
    }
    else 
    {
      if(timeError.includes(index)){
        setTimeError(state=>state.filter(id=>id!=index))
      }
     
    // alert('Entries are perfect.');
    console.log("Entries are perfect.")
    }

  } 
  console.log("timer error",timeError)
  const timeFormat = (time) => {
    if(time){

      let hour = time?.split(':')?.[0];
      let min = time?.split(':')?.[1];
      let sec = time?.split(':')?.[2];
      let d = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getHours(),hour,min,sec)
      // console.log("----------------",d)
      return d ;
    }
    let d1 = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getHours(),'00','00','00');
    return d1;
  };
 
  const handleDateValue = (value) => {
    const str = value.toString();

    // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
    setDate(formatDate(value, "-"));
  };
 
  const EmpID=props?.match?.params?.id;
  const name=props?.location?.query?.item?.name;
  const designation=props?.location?.query?.item?.designation;
  const date_of_joining=props?.location?.query?.item?.date_of_joining;
  // setImage(props?.location?.query?.item?.image);
  console.log("emp props",props);
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    let formData = { 
      employee_id: EmpID,
    
      year: days.year,
      month: days.month,
    
    };
    let res = await GET( ApiUrls.GET_FILTER_ATTENDANCE_LIST +
      `?employee_id=${EmpID}&&year=${days.year}&&month=${days.month}`);
      if (res?.success != false) {
        if(res.hasOwnProperty("success"))
        setMessage(res.success);
          // setMessage("Record find ");
          setShowSuccessAlert(true);
         
        setData(res?.data?.attendance);
        setEmp(res?.data?.employe[0]);
        // setImage(emp?.image);
        setSummary(res?.data);

      }
      else  if(res.hasOwnProperty("error")){
        setMessage(res.error);
        setShowErrorAlert(true);
      }
  setImage(emp?.image);
      
      console.log("0----image---",image)
      // setIsLoading(false);
    
   

   
    console.log("------filter------", res);
  
   
  };

 
  console.log(EmpID,"idddddddd",empdata,image);
    const handleFetchData = async () => {
      // setIsLoading(true);
      let res = await GET(ApiUrls.GET_SINGLE_EMPLOYEE_ATTENDANCE+`?employee_id=${EmpID}`);
      console.log("ress0", res);
      if (res?.success != false) {
        setData(res?.data?.attendance);
        setEmp(res?.data?.employe[0]);
        // setImage(emp?.image);
        setSummary(res?.data);

      }
  setImage(emp?.image);
      
      console.log("0----image---",image)
      // setIsLoading(false);
    };

    useEffect(() => {
      if (EmpID!= undefined) handleFetchData();
      handleFetchData();
    }, []);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    const [interest, SetInterest] = useState("");
    const [attTime, setAttTime] = useState();

    const handleTimeValue = (value) => {
      const timeStr = value.toString();
      var time = timeStr.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
      setAttTime(time);
      // setTime(time);
      console.log(time);
      // setShowAdd(false);
    };
   
    // };

    return (
      <div className="bg-transparent">

        <Modal
        
          show={showAdd}
          onHide={() => {
            setShowAdd(false);
          }}
        >
          {/* <Modal.Header
            closeButton
            className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
          >
            <Modal.Title style={{ color: "#818181" }}>Add Interest</Modal.Title>
          </Modal.Header> */}
          <form
            onSubmit={(e) => {
              // SendRecordToServer(e);
            }}
          >
            <div className=" shadow bg-white rounded w-100">
              <Modal.Body>
                <div className="pb-3">
                 
                 <StaticTimePicker
                // value={timeFormat(item.sign_in)}
                // value={d}
                showTime={handleTimeValue}
                // setAttTime={handleTimeValue}
                // onClick={() => {
                //   setShowAdd(false);
                // }}

              /> 
              {console.log(attTime)}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{ backgroundColor: "#2258BF" }}
                  onClick={() => {
                    setShowAdd(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  style={{ backgroundColor: "#2258BF" }}
                  onClick={() => {
                    setTime(attTime);
                    setShowAdd(false);
                    if(attTime!=null){
                      let updateData=JSON.parse(JSON.stringify(data))
                      if(open=="signin"){
                        updateData[selectedID].sign_in=attTime;
                      }
                      else{
                        compare(updateData[selectedID].sign_in,attTime,selectedID);
                        updateData[selectedID].sign_out=attTime;
                      }
                     
                      setData(updateData);
                    }
                    else{
                      let updateData=JSON.parse(JSON.stringify(data))
                      if(open=="signin"){
                        updateData[selectedID].sign_in=timee;
                      }
                      else{
                        updateData[selectedID].sign_out=timee;
                      }
                    
                      setData(updateData);
                    }
                      // setData(data);
                    
                   
                    }
                   }
                >
                  
                  Ok
                </Button>
              </Modal.Footer>
            </div>
          </form>
        </Modal>
    
      </div>
  );
  };
  const Table = ({ item, index }) => {
    //  ;

    let d=new Date(item.created_at);
    // let time=d.toString(d);
    // var timing = time.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

    let timedata=JSON.stringify(timeFormat(item.sign_in))
    setAttTime(item.sign_in);
    setType(item.status);


    const sendRecordToServer = async (event) => {
    
      //api
      //*--------------------------------------
      let postData = {
        employee_id: EmpID,
          date: item.date,
         sign_in: item.sign_in,
         sign_out: item.sign_out,
         status:item.status
      };
      let res = await POST(ApiUrls.POST_ATTENDANCE, postData);
      // console.log("post request",postData, res);
      if (res?.error === false) {
        setMessage("Updated successfully");
        setShowSuccessAlert(true);
        console.log("record submitted")
        
      } else {
        setMessage("Attendance not Updated");
        setShowErrorAlert(true);
        console.log("record submitted")
      }
      setRefresh(!refresh);
      
    
    };
    return (
      <tr>
        <td key={index + 1 + "table"}>{index + 1}</td>
        <td>{item.date}</td>
        <td>

          {/* {JSON.stringify(timeFormat(item.sign_in))} */}
          {
            <div  className="d-flex d-inline "
            >
           <input className="form-control  w-100"  readOnly value={to12Format(item.sign_in)} />
             <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setOpen("signin");
                setShowAdd(true);
                setSelectedID(index);
              }}
            >
               {/* <KeyboardTimePickerExample
              value={timeFormat(item.sign_in)}
              // value={d}
              showTime={handleTimeValue}
            />  */}
            <FontAwesomeIcon style={{ fontSize: 15 }} icon={faClock} />
            </button>
            {/* <StaticTimePicker
              // value={timeFormat(item.sign_in)}
              // // value={d}
              // showTime={handleTimeValue}
            />  */}
            </div>
          }
        </td>
        <td>

{/* {JSON.stringify(timeFormat(item.sign_in))} */}
{
  <div  className="d-flex d-inline "
  >
 <input className="form-control  w-100"  readOnly value={to12Format(item.sign_out)} />
 
   <button
    data-tip
    data-for="EditTip"
    type="button "
    disabled={item.sign_in==null}
    className="bg-transparent  button-focus mr-2"
    onClick={() => {
      setOpen("signout");
      setShowAdd(true);
      setSelectedID(index);
    }}
  >
     {/* <KeyboardTimePickerExample
    value={timeFormat(item.sign_in)}
    // value={d}
    showTime={handleTimeValue}
  />  */}
  <FontAwesomeIcon style={{ fontSize: 15 }} icon={faClock} />
  </button>
  {/* <StaticTimePicker
    // value={timeFormat(item.sign_in)}
    // // value={d}
    // showTime={handleTimeValue}
  />  */}
  </div>
}
{timeError.includes(index)==true?(
   <small
   className="form-text  text-red"
   style={{ color: "red" }}
 >
   Sign Out time should be after Sign In time
 </small>
): null}
</td>

        <td>{item.working_hours}</td>
        <td>
          {" "}
          <select
            value={item.status}
            onChange={(e) => {
              let updateData=JSON.parse(JSON.stringify(data))
              updateData[index].status=e.target.value
              setData(updateData);
            }}
            className="form-control form-control-sm w-100"
          >
            <option></option>
            <option value={"Leave"}>Leave</option>
            <option value={"Absent"}>Absent</option>
            <option value={"Short Leave"}>Short Leave</option>
          </select>
        </td>

        <td>
          {timeError.includes(index)==false?(
 
 <Button
 
   onClick={() => {
     sendRecordToServer();
   }}
 >
   Update
 </Button>

          ):"----"}
         
        </td>
      </tr>
    );
   
  };
  

  return (
    <Container fluid className="Laa">
      <PreLoading startLoading={isLoading} />
      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={message}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={message}
        closeError={setShowErrorAlert}
      />

      <Row className=" shadow p-3  bg-white rounded mt-4 ml-1 mr-1">
     
        <Col lg={5} md={5} sm={12} xs={12} xl={6}>
      
          <h4 style={{ color: "#818181", paddingTop: "12px" }}>
          <IconButton
          onClick={() => {
            history.push("/admin/attendance");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
            Employee Attendance Details
          </h4>
        </Col>

        <Col lg={2} md={2} sm={12} xs={12} xl={2}>
          {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}

          <h6 style={{ color: "#818181", paddingTop: "7px" }}> Select Year </h6>

          <div className="form-control w-100">
            {/* <YearPicker setDays={setDays}/> */}
            <YearPicking controlid="year" setDays={setDays} />
          </div>
        </Col>
        <Col lg={2} md={2} sm={12} xs={12} xl={2} className=" pb-0 ">
          <h6 style={{ color: "#818181", paddingTop: "7px" }}>
            {" "}
            Select Month{" "}
          </h6>

          <div className="form-control w-100">
            {/* <YearPicker setDays={setDays}/> */}
            <DatePick controlid="month" setDays={setDays} />
          </div>
        </Col>
        <Col lg={1} md={1} sm={4} xs={6} xl={1}>
          <Form.Control
            className="w-100"
            style={{
              marginTop: "32px",
              backgroundColor: "#2258BF",
              color: "white",
            }}
            // disabled

            as="button"
            defaultValue=""
            onClick={(e) => {
              SendRecordToServer(e);
            }}
          >
            Search
          </Form.Control>
        </Col>
       
       
      </Row>
      <Container fluid>
        <Row className="mt-4">
          <Col lg={2} sm={12} xs={12} xl={2}>
          On Time Arrival:
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.onTimeArrival}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
          Over Time
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.overTime}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
          Late Arrival
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.lateArrival}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
          Leaves
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.leavsCount}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
          Absent
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.absentCount}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
          Short Leave
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              readOnly
              value={summary?.shortLeaveCount}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          
        </Row>
      </Container>
     
      <Row className=" shadow p-3  bg-white rounded mb-4 mt-4 ml-1 mr-1">
          <Col className="ml-3"> 
      {/* <div className="col-md-6 col-sm-12 d-flex ">
        <div  className="col-md-6 col-sm-12 mr-1"><h4 style={{ color: "#818181" }}>Name:</h4></div>
        <div  className="col-md-6 col-sm-12" ><h5 style={{ color: "black" }}>{name}</h5> </div>
      </div>
      <div className="col-md-6 col-sm-12 d-flex">
        <div  className="col-md-6  col-sm-12 mr-1"><h4 style={{ color: "#818181" }}>Designation:</h4></div>
        <div  className="col-md-6 col-sm-12" ><h5 style={{ color: "black" }}>{designation}</h5> </div>
      </div>
      <div className="col-md-6 col-sm-12 d-flex">
        <div  className="col-md-6 col-sm-12 text-nowrap mr-1"><h4 style={{ color: "#818181" }}>Date of joining:</h4></div>
        <div  className="col-md-6 col-sm-12 " ><h5 style={{ color: "black" }}>{date_of_joining}</h5> </div>
      </div> */}
              <h5 style={{ color: "#818181" }}>Name:<span className="ml-5" style={{ color: "black"}}>{emp?.name}</span></h5>
              <h5 style={{ color: "#818181" }}>Designation:<span className="ml-5" style={{ color: "black" }}>{emp?.designation}</span></h5>
              <h5 style={{ color: "#818181" }}>Date of joining<span className="ml-5" style={{ color: "black" }}>{emp?.date_of_joining}</span></h5>
            
              </Col>
          <Col className="ml-5">
            {/* <div><Image {...{setImage,image}}/>
            </div> */}
             <div
           
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <img style={{ width: "120px", height: "100px" }}  className="zoom" src={publicURLimage+emp?.image} />
          </div>
             </Col>
         
        <div className="table-responsive mt-5" >
          <table className="table table-hover">
            <thead>
              <tr>
              <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                  ID
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                  Date
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                  Sign In
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                  Sign Out
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                Working Hours
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                  Status
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                  Update
                  </span>
                </th>
               
              </tr>
            </thead>
            <tbody>
           
              {data?.map((item, index) => {
                return <Table index={index} item={item} />;
              })}
            </tbody>
          </table>
          <ModalAdd  />
          {/* <Row>
            <div className="col-md-12 ml-5 mt-5">

          <h4 style={{ color: "#818181" }}>Summary</h4>
          </div>
          <Col className="ml-5 mt-2"> <div>
              <h5 style={{ color: "#818181" }}>On Time Arrival:<span className="ml-5" style={{ color: "black"}}>{summary?.onTimeArrival}</span></h5>
              <h5 style={{ color: "#818181" }}>Over Time<span className="ml-5" style={{ color: "black"}}>{summary?.overTime}</span></h5>
              <h5 style={{ color: "#818181" }}>Late Arrival<span className="ml-5" style={{ color: "black"}}>{summary?.lateArrival}</span></h5>
              </div></Col>
          <Col  className=" mt-2 "><div> <h5 style={{ color: "#818181" }}>Leaves:<span className="ml-5" style={{ color: "black"}}>{summary?.leavsCount}</span></h5>
              <h5 style={{ color: "#818181" }}>Absent:<span className="ml-5" style={{ color: "black"}}></span></h5>
              <h5 style={{ color: "#818181" }}>Short Leave<span className="ml-5" style={{ color: "black"}}>{summary?.shortLeaveCount}</span></h5></div> </Col>
          </Row>
          */}
        </div>
        {/*  */}
      </Row>
    </Container>
  );
  
}
