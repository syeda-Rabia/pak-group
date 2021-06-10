import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import EmployeeCallReport from "../../../components/EmployeeCharts/EmployeeCallReport";
import EmployeeLeadReportChart from "../../../components/EmployeeCharts/EmployeeLeadReportChart";
import EmployeePendingTaskForToday from "../../../components/EmployeeCharts/EmployeePendingTaskForToday";
import EmployeeQuartelyLeadChart from "../../../components/EmployeeCharts/EmployeeQuartelyLeadChart";
import EmployeeQuarterlyPerformanceChart from "../../../components/EmployeeCharts/EmployeeQuarterlyPerformanceChart";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { formatDate, GET, POST } from "../../../utils/Functions";
import { DayPicking } from "../../../utils/YearPicker";
import "./EmployeeDashboard.css";

function EmployeeDashboard(props) {
  const [employees, setEmployees] = React.useState([]);
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [IsFilter, setIsFilter] = useState(false);
  var today = new Date();
  var datee = formatDate(today, "-");
  const [Start, setStart] = useState(formatDate(today, "-"));
  const [End, setEnd] = useState();
  const [data, setData] = useState({});
  const [pendingTask, setPendingTask] = useState({});
  const [quarterlyTask, setQuarterlyTask] = useState({});
  const [callReport, setCallReport] = useState({});
  const [TaskReport, setTaskReport] = useState({});
  const [result, setResult] = useState({});
  const [quarter, setQuarter] = useState(0);
  const [targetAssign, setTargetAssigned] = useState("");
  const [targetAchieved, setTargetAchieved] = useState(0);
  const [noOfMeeting, setNumberOfMeeting] = useState(0);
  const { RangePicker } = DatePicker;

  const [days, setDays] = useState({
    day: [],
    month: "",
    year: "",
  });
  // const handleDateValue = (value) => {
  //   setStartDate(formatDate(value, "-"));
  //   setEndDate(formatDate(value, "-"));
  //   console.log(formatDate(value, "-"));
  // };
  useEffect(() => {
   
    getLeadReport();
  }, []);
  useEffect(() => {
    SendTargetRecordToServer();
  }, [quarter]);
  const SendTargetRecordToServer = async () => {
   
    // console.log()
    let formData = {
    
      quarter_option: quarter,
    };
    // console.log("formdata----", formData);
    let resp = await POST(ApiUrls.POST_GET_EMPLOYEE_TARGET_DATA, formData);

    console.log("console----", resp);
    if (resp?.hasOwnProperty("success")) {
      // setMessage(resp?.success);
      // setShowSuccessAlert(true);

      setTargetAssigned(resp?.target?.target);
      setTargetAchieved(resp?.target?.complete);
      setNumberOfMeeting(resp?.target?.meetings);
    // setQuarter(2);
    } else if (resp?.hasOwnProperty("error")) {
      // setMessage(resp.error);
      // setShowErrorAlert(true);
      // setIsFilter(false);
    }
  };
  const getLeadReport = async () => {
    let res = await GET(ApiUrls.GET_EMPLOYEE_LEAD_REPORT);
    console.log("-----PROPS---->", props);


    if (res.error===false) {
      setData(res?.report);
      setPendingTask(res?.pending)
      setCallReport(res?.call_report)
      setQuarterlyTask(res?.quarterly)
      setTaskReport(res?.data)
      setResult(res?.result)

    }
  };
 
 
  return (
    <Container fluid>
      {/* Ist Row */}
      <Container fluid>
        <Row className="shadow mb-3 bg-white rounded mt-4 pb-2 ">
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
          <Col lg={5} md={5} sm={12} xs={12} xl={6}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Employee Dashboard</h4> 
          </Col>
          
        
        </Row>
      </Container>
      <Container fluid>
        <Row className="shadow mb-3 bg-white rounded mt-4 pb-2 pt-2">
          <Col lg={1} md={1} sm={12} xs={12} xl={2}>
            <span
              class="text-nowrap"
              style={{ color: "#818181", fontWeight: "bold" }}
            >
              {" "}
              Target Assigned
            </span>

            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="number"
              readOnly
              value={targetAssign}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={1} md={1} sm={12} xs={12} xl={2}>
            <span
              class="text-nowrap"
              style={{ color: "#818181", fontWeight: "bold" }}
            >
              {" "}
              Target Achieved
            </span>

            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
              readOnly
              value={targetAchieved}
              // onChange={(e) => {
              //   // setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={1} md={1} sm={12} xs={12} xl={2}>
            <span
              class="text-nowrap"
              style={{ color: "#818181", fontWeight: "bold" }}
            >
              {" "}
              No Of Meetings
            </span>

            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
              readOnly
              value={noOfMeeting}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={1} md={2} sm={12} xs={12} xl={2}>
            {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}
            <span
              class="text-nowrap"
              style={{ color: "#818181", fontWeight: "bold" }}
            >
              Quarter
            </span>

            <Form.Control
              className="w-100 "
              style={{ height: "32px", fontSize: "13px" }}
              controlid="Sale Person"
              as="select"
              value={quarter}
              onChange={(e) => {
                console.log("select client ID is -----", e.target.value);
                setQuarter(e.target.value);
              }}
            >
              <option>{null}</option>
              <option value={1}>JAN-MAR</option>
              <option value={2}>APR-JUN</option>
              <option value={3}>JUL-SEP</option>
              <option value={4}>OCT-DEC</option>
            </Form.Control>
          </Col>
         
          {/* {IsFilter==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn ml-2" 
            onClick={() => {
             
              getLeadReport();
             
              setIsFilter(false);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faRedo} /> reverse filter
          </button>
           ):null}  */}
        </Row>
      </Container>
      {/* 2nd Row */}
      <Container fluid>
        <Row className="mb-2 mt-2 ">
          <Col
            xl={6}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginRight: "5.5rem",
            }}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col style={{ color: "#818181" }}>
                {/* <h6 style={{ color: "#818181" }}>Target Assigend</h6> */}
                <h3 style={{ color: "#818181" }}>Lead Report</h3>
              </Col>
            </Row>
            <EmployeeLeadReportChart data={data} />
          </Col>
          <Col
            xl={5}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            {/* <h6 style={{ color: "#818181" }}>Pending Task for Today</h6> */}
            <h3 style={{ color: "#818181" }}>Pending task for today</h3>
            <EmployeePendingTaskForToday pendingTask={pendingTask}
              style={{ marginLeft: "20px", marginRight: "20px" }}
            />
          </Col>
        </Row>
      </Container>
      {/* 3rd Row */}
      <Container fluid>
        <Row
          className="my-3 "
          // style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <Col
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <Row className="pt-3">
              <Col style={{ color: "#818181" }}>
                <h2 style={{ color: "#818181" }}>Quarterly Action Summary</h2>
                {/* <p style={{ color: "#818181" }}>
                  Lorem ipsum dolor sit amet, consectetur
                </p> */}
              </Col>
            </Row>
            <EmployeeQuartelyLeadChart TaskReport={TaskReport}/>
          </Col>
        </Row>
      </Container>

      {/* New 4th row */}
      <Container fluid>
        <Row className="mb-5 mt-2">
          <Col
            xl={6}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginRight: "5.5rem",
            }}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col style={{ color: "#818181" }}>
                {/* <h6 style={{ color: "#818181" }}>Quartely Lead Performance</h6> */}
                <h3 style={{ color: "#818181" }}>Quarterly Lead Performance</h3>
              </Col>
            </Row>
            <EmployeeQuarterlyPerformanceChart quarterlyTask={quarterlyTask}/>
          </Col>
          <Col
            xl={5}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3"
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            {/* <h6 style={{ color: "#818181" }}>Call Summary</h6> */}
            <h3 style={{ color: "#818181" }}>Call Report</h3>
            <EmployeeCallReport callReport={callReport}/>
          </Col>
        </Row>
      </Container>
     
  
     
    </Container>
  );
}
export default EmployeeDashboard;
