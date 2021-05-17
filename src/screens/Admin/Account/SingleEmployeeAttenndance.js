import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import PreLoading from "../../../components/PreLoading";
import ApiUrls from "./../../../utils/ApiUrls";
import { GET, formatDate } from "./../../../utils/Functions";
import "./../../Admin/Leads/LeadsAdmin.css";
import { dummyData } from "../../../assests/constants/todoList";
import DatePick, { YearPicking } from "../../../utils/YearPicker";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import Pagination from "../../../components/Pagination/Pagination";
import Image from "../../../components/imageupload";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function EmployeeReport() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState();

  const [showView, setShowView] = useState(false);
  const [data, setData] = useState(dummyData);
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [type, setType] = useState();
  let timeVal = new Date();
  var today = new Date();
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const [days, setDays] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [time, setTime] = useState(timee);

  const handleDateValue = (value) => {
    const str = value.toString();

    // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
    setDate(formatDate(value, "-"));
  };
  const handleTimeValue = (value) => {
    const timeStr = value.toString();
    var time = timeStr.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
    setTime(time);
    console.log(time);
  };
  //   const handleFetchData = async () => {
  //     setIsLoading(true);
  //     let res = await GET(ApiUrls.GET_EMPLOYEE_LEAD_REPORT_DATA);
  //     // console.log("ress0", res);
  //     if (res?.success != false) {
  //       setData(res?.employeesReport?.data);
  //       setPageSize(res?.employeesReport?.per_page);
  //       setTotalRecord(res?.employeesReport?.total);
  //       setCurrentPage(res?.employeesReport?.current_page);

  //     }
  //     setIsLoading(false);
  //   };

  //   useEffect(() => {
  //     handleFetchData();
  //   }, [refresh]);
  const history = useHistory();

  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td key={index + 1 + "table"}>{index + 1}</td>
        <td></td>
        <td>
          {" "}
          {
            <KeyboardTimePickerExample
              value={timeVal}
              showTime={handleTimeValue}
            />
          }
        </td>
        <td>
          {" "}
          <KeyboardTimePickerExample
            value={timeVal}
            showTime={handleTimeValue}
            // onChange={(e) => {
            //   setTime(formatDate(e.target.value));

            // }}
          />
        </td>
        <td>
          {" "}
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
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
                // SendFileToServer();
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
      <PreLoading startLoading={isLoading} />

      <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={5} md={5} sm={12} xs={12} xl={6}>
          <h4 style={{ color: "#818181", paddingTop: "12px" }}>
            Employee Attendance Details
          </h4>
        </Col>

        <Col lg={2} md={2} sm={12} xs={12} xl={2}>
          {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}

          <h6 style={{ color: "#818181", paddingTop: "7px" }}> select Year </h6>

          <div className="form-control w-100">
            {/* <YearPicker setDays={setDays}/> */}
            <YearPicking controlid="year" setDays={setDays} />
          </div>
        </Col>
        <Col lg={2} md={2} sm={12} xs={12} xl={2} className=" pb-0 ">
          <h6 style={{ color: "#818181", paddingTop: "7px" }}>
            {" "}
            select month{" "}
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
              // SendRecordToServer(e);
            }}
          >
            Search
          </Form.Control>
        </Col>

       
      </Row>

      <Row className=" shadow p-3  bg-white rounded mb-4">
          <Col className="ml-5"> <div>
              <h5 style={{ color: "#818181" }}>Name:</h5>
              <h5 style={{ color: "#818181" }}>Designation</h5>
              <h5 style={{ color: "#818181" }}>Date of joining</h5>
              </div></Col>
          <Col><div><Image/></div> </Col>
         
        <div className="table-responsive mt-5">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ color: "#818181" }}>
                  ID
                </th>

                <th scope="col" style={{ color: "#818181" }}>
                  Employee Name
                </th>
                <th scope="col" style={{ color: "#818181" }}>
                  SignIn
                </th>
                <th scope="col" style={{ color: "#818181" }}>
                  SignOut
                </th>
                <th scope="col" style={{ color: "#818181" }}>
                  other
                </th>
                <th scope="col" style={{ color: "#818181" }}>
                  update
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {data
                 
                  .map((item, index) => {
                    return <Table item={item} index={index} />;
                  })} */}
              {data?.map((item, index) => {
                return <Table index={index} item={item} />;
              })}
            </tbody>
          </table>
          <Row>
            <div className="col-md-12 ml-5 mt-5">

          <h4 style={{ color: "#818181" }}>Summary</h4>
          </div>
          <Col className="ml-5 mt-2"> <div>
              <h5 style={{ color: "#818181" }}>On Time Arrival:</h5>
              <h5 style={{ color: "#818181" }}>Over Time</h5>
              <h5 style={{ color: "#818181" }}>Late Arrival</h5>
              </div></Col>
          <Col  className=" mt-2 "><div> <h5 style={{ color: "#818181" }}>Leaves:</h5>
              <h5 style={{ color: "#818181" }}>Absent:</h5>
              <h5 style={{ color: "#818181" }}>Short Leave</h5></div> </Col>
          </Row>
         
        </div>
        {/*  */}
      </Row>
    </Container>
  );
}
