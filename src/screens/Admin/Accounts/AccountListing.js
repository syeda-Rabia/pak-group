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
import "./../Dashboard/AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Route } from "react-router-dom";
import {
  faEye,
  faPencilAlt,
  faTrash, 
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faRedo,
 faTimesCircle,
 faCheckDouble
} from "@fortawesome/free-solid-svg-icons";

function AdminAccounts() {
  const [employees, setEmployees] = React.useState("");
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
    // getEmployeeDetails();
    // getLeadReport();
  }, [refresh]);

  // const getLeadReport= async () => {
  //   let resp = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
  //   console.log("-----------dashboard-----".resp)
  //   setData(resp?.report);
  // };
  
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    // console.log()
    // let formData = {
      
    //   from_date:formatDate(Start) ,
    //   to_date: formatDate(End),
    // };
    // // console.log("formdata----", formData);
    // let resp = await POST(ApiUrls.POST_LEAD_FILTER, formData);

    // // console.log("console----", resp);
    // if (resp?.hasOwnProperty("success")){
    //   setMessage(resp?.success);
    //   setShowSuccessAlert(true);
    //   setIsFilter(true);
    //   setData(resp?.report);
     

    // }
    // else if (resp?.hasOwnProperty("error")){
    //   setMessage(resp.error);
    //   setShowErrorAlert(true);
    //   setIsFilter(false);
    // }
  
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
          <Col lg={7} md={7} sm={12} xs={12} xl={7}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Account Listing</h4>
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
          </Col>
        </Row>
      </Container>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        <Row className=" pl-2  w-100 d-flex justify-content-between align-items-center">
          <div>
            <div className="ml-2">
             
             

              <Link to="/admin/addAccount">
                <button
                  type="button"
                  className="btn btn-primary"
                 
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Account
                </button>
              </Link>
              <Link to="/admin/addhome">
                <button
                  type="button"
                  className="btn btn-primary"
                 
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Home and office
                </button>
              </Link>
              <Link to="/admin/loan-details">
                <button
                  type="button"
                  className="btn btn-primary"
                 
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Loan
                </button>
              </Link>
              </div>
              </div>
             
             

         
        </Row>
<Row className="mt-3 mb-2 ml-2"><h4>Total Summary :____________________</h4></Row>
        <div className="table-responsive "  
        // style={{height: "500px", overflow: "auto"}} 
        >
          <table className="table table-hover " >
            <thead >
              <tr>
             
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    ID
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Account Name
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Total Amount
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Amount Spent
                  </span>
                </th>
                

                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Remaining Amount
                  </span>
                </th>

                {/* <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th> */}
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Action
                  </span>
                </th>

               
               

                
              </tr>
            </thead>
            <tbody>
              {/* {allLeads?.length > 0 ? (
                allLeads?.map((lead, index) => (
                  <LeadTable item={lead} index={index} />
                ))
              ) : null} */}
             
            </tbody>
          </table>
        </div>
        {/* {allLeads?.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={allLeads[selectedID]} />
            <ModalDelete item={allLeads[selectedID]} />
            <ModalView item={allLeads[selectedID]} />
            <ModalEdit item={allLeads[selectedID]} />
            <ModalClose item={allLeads[selectedID]} />
          </> 
        ) : null}
        <ModalAdd /> */}
       
      </Row>
   
      </Container>
  );
}
export default AdminAccounts;
