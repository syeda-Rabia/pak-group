import React, { Component, useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import { Container, Form, Row, Col } from "react-bootstrap";
import LeadReport_chart from "../../../components/Charts/LeadReport_chart";
import QuarterlyLead_chart from "../../../components/Charts/QuarterlyLead_chart";
import PendingTaskForToday from "../../../components/Charts/PendingTaskForToday";
import QuarterlyPerformanceChart from "../../../components/Charts/QuarterlyPerformanceChart";
import CallReportChart from "../../../components/Charts/CallReportChart";
import RecordTable from "./RecordTable";
import DateRangePicking from "../../../utils/DateRangePicker";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import EnhancedTable from "./MaterialUITable";
import "./AdminDashboard.css";
import DataTable from "./DataTable";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
  YearPicker,
  MonthPicker,
  DayPicker,
} from "../../../utils/KeyboardTimePickerExample";

import { GET, POST, getDays, formatDate } from "../../../utils/Functions";
import DatePick, { YearPicking, DayPicking } from "../../../utils/YearPicker";
import ApiUrls from "../../../utils/ApiUrls";
function AdminDashboard() {
  const [employees, setEmployees] = React.useState([]);
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [TargetAssigned, setTargetAssigned] = useState("");
  const [TargetAchieved, setTargetAchieved] = useState("");
  const [NoOfMeetings, setNoOfMeetings] = useState("");
  var today = new Date();
  var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const [data, setData] = useState({});
  const [pendingTask, setPendingTask] = useState({});
  const [quarterlyTask, setQuarterlyTask] = useState({});
  const [callReport, setCallReport] = useState({});
  const [TaskReport, setTaskReport] = useState({});
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
    getEmployeeDetails();
    getLeadReport();
  }, []);

  // const getLeadReport= async () => {
  //   let resp = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
  //   console.log("-----------dashboard-----".resp)
  //   setData(resp?.report);
  // };
  const getLeadReport = async () => {
    let res = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
    console.log("leads__________>", res);


    if (res.status===200) {
      setData(res?.report);
      setPendingTask(res?.pending)
      setCallReport(res?.call_report)
      setQuarterlyTask(res?.quarterly)

    }
  };
  const getEmployeeDetails = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    console.log("employessss__________>", res);
    // ;

    if (res.data != null) {
      setAllEmployees(res.data.users.data);
    }
  };
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    let formData = {
      emp_id: employees,
      from_date: Start,
      to_date: End,
    };
    let resp = await POST(ApiUrls.POST_LEAD_FILTER, formData);
    console.log("console----", resp);
    if(resp.error === false){
      setData(resp?.report);
      setPendingTask(resp?.pending)
      setCallReport(resp?.call_report)
      setQuarterlyTask(resp?.quarterly)

    }
    //   if (resp.hasOwnProperty("interest_id")) {
    //     setMessage("Lead Not Submitted. Interest field is Required.");
    //     setShowErrorAlert(true);
    //   }
    //   setMessage("Lead added Successfully");
    //   setShowSuccessAlert(true);
  };
  return (
    <Container fluid>
      {/* Ist Row */}
      <Container fluid>
        <Row className="shadow mb-3 bg-white rounded mt-4 pb-2 ">
          <Col lg={5} md={5} sm={12} xs={12} xl={6}>
            <h4 style={{ color: "#818181" }}>Admin Dashboard</h4>
          </Col>
          <Col lg={2}    md={2} sm={12} xs={12} xl={2}>
            {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}
            <Form.Label>
              <b>Employee</b>
            </Form.Label>
            <Form.Control
              className="w-100"
              controlId="Sale Person"
              as="select"
              value={employees}
              onChange={(e) => {
                console.log("select client ID is -----", e.target.value);
                setEmployees(e.target.value);
              }}
            >
              <option>{null}</option>
              {allEmployees.length > 0
                ? allEmployees.map((e) => (
                    <option
                      style={{ color: "#2258BF" }}
                      key={e.id}
                      value={e.id}
                    >
                      {e.first_name}
                      {/* {e.first_name + " " + e.last_name} */}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Col>
          <Col lg={4}  md={4} sm={6} xs={12} xl={3} className="pt-2 ">
            
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
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="">
          <Col lg={2} sm={12} xs={12} xl={2}>
            Target Assigned:
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              value={data?.leads}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
            Target Achieved:
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              value={data?.allocation}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
            No Of Meetings:
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              value={NoOfMeetings}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
          </Col>
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
                <h6 style={{ color: "#818181" }}>Target Assigend</h6>
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
            <h6 style={{ color: "#818181" }}>Pending Task for Today</h6>
            <h3 style={{ color: "#818181" }}>Pending task</h3>
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
            <QuarterlyLead_chart />
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
                <h6 style={{ color: "#818181" }}>Quartely Lead Performance</h6>
                <h3 style={{ color: "#818181" }}>Quarterly Lead</h3>
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
            <h6 style={{ color: "#818181" }}>Call Summary</h6>
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
            xl={7}
            lg={12}
            sm={12}
            xs={12}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "30px",
              marginBottom: "30px",
              padding: "30px",
            }}
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
