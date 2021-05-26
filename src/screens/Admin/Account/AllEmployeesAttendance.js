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
  // const [date, setDate] = useState();
  const [image, setImage] = React.useState("");
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

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
  var today = new Date();
   const [date, setDate] = useState(today);

  const [type, setType] = useState("");
  let timeVal = new Date();
 
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
 
  const EmpID=props?.location?.query?.item?.id;
  const name=props?.location?.query?.item?.name;
  const designation=props?.location?.query?.item?.designation;
  const date_of_joining=props?.location?.query?.item?.date_of_joining;
  // setImage(props?.location?.query?.item?.image);
  
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
        setData(res?.data?.attendance);
        setEmp(res?.data?.employe[0]);
        // setImage(emp?.image);
        setSummary(res?.data);

      }
  setImage(emp?.image);
      
      console.log("0----image---",image)
      setIsLoading(false);
    
   

   
    console.log("------filter------", res);
  
    // let resp = await GET(ApiUrls.GET_FILTER_DATA+`?client_name=${client}&&project_id=${project}&&year=${days.year}&&month=${days.month}&& day=${days.day}`);
    // console.log("---------filter response--------------",resp);
    // console.log(resp);
    // if(resp.success!=false)
    // setRefresh(!refresh);
  };

  // const val=props?.location?.query?.item;
  // setEmpData(props?.location?.query?.item?.name);
  // setImage(empdata?.image);
  console.log(EmpID,"idddddddd",empdata,image);
    const handleFetchData = async () => {
      setIsLoading(true);
      let res = await GET(ApiUrls.GET_ALL_EMPLOYEES_ATTENDANCE_LIST+`?date=${date}`);
      console.log("ress0", res);
      if (res?.success != false) {
        setData(res?.data?.attendance);
        console.log("success", res);
       
      }

      setIsLoading(false);
    };

    useEffect(() => {
     
      handleFetchData();
    }, [refresh,date]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
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
                        updateData[selectedID].sign_out=attTime;
                      }
                     
                      setData(updateData);
                    }
                    else{
                      setData(data);
                    }
                   
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
        employee_id: item.employee.id,
          date: date,
         sign_in: item.sign_in,
         sign_out: item.sign_out,
         status:item.status,
      };
      let res = await POST(ApiUrls.POST_ATTENDANCE, postData);
      console.log("post request",postData, res);
      if (res?.error === false) {
        setMessage("Attendance created successfully");
        setShowSuccessAlert(true);
        console.log("record submitted")
        
      } else {
        setMessage("Attendance not created");
        setShowErrorAlert(true);
        console.log("record submitted")
      }
      setRefresh(!refresh);
      
    
    };
    return (
      <tr>
        <td key={index + 1 + "table"}>{index + 1}</td>
        <td>{item.employee.name}</td>
        <td>

          {/* {JSON.stringify(timeFormat(item.sign_in))} */}
          {
            <div  className="d-flex d-inline "
            >
           <input className="form-control  w-100" value={to12Format(item.sign_in)} />
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
 <input className="form-control  w-100" value={to12Format(item.sign_out)} />
   <button
    data-tip
    data-for="EditTip"
    type="button "
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
</td>

       
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
          <>
            <Button
              onClick={() => {
                sendRecordToServer();
              }}
            >
              Update
            </Button>
          </>
        </td>
      </tr>
    );
   
  };
  

  return (
    <Container fluid className="Laa">
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
      <PreLoading startLoading={isLoading} />

      <Row className=" shadow p-3  bg-white rounded mt-4 ml-1 mr-1">
      
        <Col lg={5} md={5} sm={12} xs={12} xl={6}>
          <h4 style={{ color: "#818181", paddingTop: "12px" }}>
          <IconButton
          onClick={() => {
            history.push("/admin/accounts");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
            Attendance
          </h4>
        </Col>
        
      </Row>
      
      <Row className=" shadow p-3  bg-white rounded mb-4 mt-5 ml-1 mr-1">
         
      <div > <h5>Date:{" "}</h5></div>
         
         <div>
           <Col><KeyboardDatePickerAttendance value={date} showDate={handleDateValue}/></Col>
         
         </div>
        <div className="table-responsive mt-5" style={{height: "500px", overflow: "auto"}}>
          <table className="table table-hover">
            <thead>
              <tr>
              <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                  ID
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                  Name
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
          
        </div>
        {/*  */}
      </Row>
    </Container>
  );
  
}
