import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import CallReportChart from "../../../components/Charts/CallReportChart";
import LeadReport_chart from "../../../components/Charts/LeadReport_chart";
import PendingTaskForToday from "../../../components/Charts/PendingTaskForToday";
import QuarterlyLead_chart from "../../../components/Charts/QuarterlyLead_chart";
import QuarterlyPerformanceChart from "../../../components/Charts/QuarterlyPerformanceChart";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/Functions";
import { DayPicking } from "../../../utils/YearPicker";
import "./AdminDashboard.css";
import EnhancedTable from "./MaterialUITable";
import RecordTable from "./RecordTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faRedo,

} from "@fortawesome/free-solid-svg-icons";
function AdminDashboard() {
  const [employees, setEmployees] = React.useState("");
  const [emp, setEmp] = React.useState("");
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [IsFilter, setIsFilter] = useState(false);
  var today = new Date();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const [data, setData] = useState({});
  const [pendingTask, setPendingTask] = useState({});
  const [showReset, setshowReset] = useState(false);
  const [quarterlyTask, setQuarterlyTask] = useState({});
  const [callReport, setCallReport] = useState({});
  const [TaskReport, setTaskReport] = useState({});
  const [result, setResult] = useState({});
  const [refresh, setRefresh] = useState(false);
  
  const { RangePicker } = DatePicker; 

  const [days, setDays] = useState({
    day: [],
    month: "",
    year: "",
  });
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    getEmployeeDetails();
    getLeadReport();
  }, [refresh]);

  // const getLeadReport= async () => {
  //   let resp = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
  //   console.log("-----------dashboard-----".resp)
  //   setData(resp?.report);
  // };
  const getLeadReport = async () => {
    let res = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
    // console.log("leads__________>", res);


    if (res.error===false) {
      setData(res?.report);
      setPendingTask(res?.pending)
      setCallReport(res?.call_report)
      setQuarterlyTask(res?.quarterly)
      setTaskReport(res?.data)
      setResult(res?.result)

    }
  };
  const getEmployeeDetails = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    // console.log("employessss__________>", res);
    // ;

    if (res.data != null) {
      setAllEmployees(res.data.users.data);
    }
  };
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    // console.log()
    let formData = {
      emp_id: employees,
      from_date:formatDate(Start) ,
      to_date: formatDate(End),
    };
    // console.log("formdata----", formData);
    let resp = await POST(ApiUrls.POST_LEAD_FILTER, formData);

    // console.log("console----", resp);
    if (resp?.hasOwnProperty("success")){
      setshowReset(true);
      setMessage(resp?.success);
      setShowSuccessAlert(true);
      setIsFilter(true);
      setData(resp?.report);
      setPendingTask(resp?.pending)
      setCallReport(resp?.call_report)
      setQuarterlyTask(resp?.quarterly)
      setTaskReport(resp?.data)
      setResult(resp?.result)

    }
    else if (resp?.hasOwnProperty("error")){
      setMessage(resp.error);
      setShowErrorAlert(true);
      setIsFilter(false);
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
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Admin Dashboard</h4>
            
          </Col>
         
          <Col lg={2}    md={2} sm={12} xs={12} xl={2}>
            {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}
           
              <h6 style={{ color: "#818181",paddingTop:"7px" }} >Employee</h6>
           
            <Form.Control
              className="w-100 "
              style={{ height:"32px",fontSize:"13px"}}
              controlid="Sale Person"
              as="select"
              value={employees}
              onChange={(e) => {
                // console.log("select client ID is -----", e.target.value);
                setEmployees(e.target.value);
              }}
            >
              <option>{null}</option>
              {allEmployees.length > 0
                ? allEmployees.map((e) => (
                    <option
                      style={{ color: "#2258BF"}}
                      key={e.id+"employee id"}
                      value={e.id}
                    >
                      {e.first_name}
                      {/* {e.first_name + " " + e.last_name} */}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Col>
          <Col lg={4}  md={4} sm={6} xs={12} xl={3} className="pt-2 pb-0 ">
            
            <DayPicking value={today} setStart={setStart} setEnd={setEnd} />
           
          
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
            {showReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn " 
            onClick={() => {
             
              getLeadReport();
              setshowReset(false);
              setIsFilter(false);
              // setIsLoading(true);
              // setIsEmpty(false);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <span  className="text-nowrap"><FontAwesomeIcon icon={faRedo} /> Reverse</span>
          </button>
           ):null} 
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="">
          <Col lg={1} sm={12} xs={12} xl={1}>
          <span class="text-nowrap"> Target Assigned</span>
           
            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
             
              // value={result?.total_allocation}
              onChange={(e) => {
                // setTargetAssigned(e.target.value);
              }}
            />
          </Col>
          <Col lg={1} sm={12} xs={12} xl={1}>
            <span class="text-nowrap">  Target Achieved</span>
           
            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
              readOnly
              value={result?.total_achieved}
              // onChange={(e) => {
              //   // setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={1} sm={12} xs={12} xl={1}>
          <span class="text-nowrap">  No Of Meetings</span>
         
            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
              readOnly
              value={result?.meetings}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={1}    md={1} sm={12} xs={12} xl={1}>
            {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}
           
              Employee
           
            <Form.Control
              className="w-100 "
              style={{ height:"32px",fontSize:"13px"}}
              controlid="Sale Person"
              as="select"
              value={emp}
              onChange={(e) => {
                // console.log("select client ID is -----", e.target.value);
                setEmp(e.target.value);
              }}
            >
              <option>{null}</option>
              {allEmployees.length > 0
                ? allEmployees.map((e) => (
                    <option
                      style={{ color: "#2258BF"}}
                      key={e.id+"employee id"}
                      value={e.id}
                    >
                      {e.first_name}
                      {/* {e.first_name + " " + e.last_name} */}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Col>
          <Col lg={1} md={1} sm={4} xs={6} xl={1}>
            <Form.Control
              className="w-100"
              style={{
                marginTop: "21px",
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
              Assign
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
            <LeadReport_chart data={data} />
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
            <PendingTaskForToday pendingTask={pendingTask}
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
            <QuarterlyLead_chart TaskReport={TaskReport}/>
          </Col>
        </Row>
      </Container>

      {/* New 4th row */}
      <Container fluid>
        <Row className="mb-2 mt-2">
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
            <QuarterlyPerformanceChart quarterlyTask={quarterlyTask}/>
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
            <CallReportChart callReport={callReport}/>
          </Col>
        </Row>
      </Container>
     
      <RecordTable />
      <Container fluid>
        <Row>
          {/* <Col
            xl={4}
            lg={12}
            sm={12}
            xs={12}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "30px",
              marginRight: "5.5rem",
              marginBottom: "30px",
              padding: "30px",
            }}
          >
            <h3 style={{ color: "#818181" }}>Target Asigned</h3>
            {/* <LeadReport_chart /> */}
          {/* </Col> */} 
          <Col
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            
          >
            <EnhancedTable />
            {/* <RecordTable /> */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default AdminDashboard;
