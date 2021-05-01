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

  // const getLeadReport= async () => {
  //   let resp = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
  //   console.log("-----------dashboard-----".resp)
  //   setData(resp?.report);
  // };
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
        <Row className="">
          <Col lg={2} sm={12} xs={12} xl={2}>
            Target Assigned:
            <input
              className="form-control w-100 "
              placeholder=""
              type="text"
              value={result?.total_allocation}
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
              value={result?.total_achieved}
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
              value={result?.meetings}
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
