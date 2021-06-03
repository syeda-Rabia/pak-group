import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dummyData } from "../../../assests/constants/todoList";
import { DayPicking } from "../../../utils/YearPicker";
import DynamicTable from "../../../components/dynamicTable";
import ComplimentDynamicTable from "../../../components/ComplimentDynamicTable";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {  useHistory, Redirect, Route } from "react-router-dom";

export default function AddAccount() {
  const [data, setData] = React.useState(dummyData);
  const [tableData, setTableData] = React.useState([]);
  const [ComplimentData, setComplimentData] = React.useState([]);

  const [accountName, setAccountName] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0);

  var today = new Date();
  const history = useHistory();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();


  console.log("table data",tableData);
  console.log("data",ComplimentData);
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
      <IconButton
          onClick={() => {
            history.push("/admin/account");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Add Account
          </h3>
        </Col>
      </Row>

      <Row className="col-lg-12 shadow p-3  bg-white rounded ml-1 mr-1 ">
      <Container fluid>
        <Row className="">
          <Col lg={2} sm={12} xs={12} xl={2}>
          {/* <span class="text-nowrap"> Account Name</span> */}
          <h6 style={{ color: "#818181", }}> Account Name</h6>
            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="text"
             
              value={accountName}
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
            />
          </Col>
          <Col lg={2} sm={12} xs={12} xl={2}>
            {/* <span class="text-nowrap">Total samount</span> */}
          <h6 style={{ color: "#818181", }}>Total Amount</h6>
           
            <input
              className="form-control w-100 bg-white"
              placeholder=""
              type="number"
              
              value={totalAmount}
              onChange={(e) => {
                setTotalAmount(e.target.value);
              }}
            />
          </Col>
          <Col lg={3} sm={12} xs={12} xl={3}>
          <DayPicking value={today} setStart={setStart} setEnd={setEnd}/>
          </Col>
         
          
        
        </Row>
      </Container>
    
      {/* <Col lg={4} md={4} sm={12} xs={12} xl={4}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Account Name</h4>
            <input
              className="form-control bg-white"
              placeholder=""
              type="text"
            
              value={null}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Total Amount</h4>
            <input
              className="form-control  bg-white"
              placeholder=""
              type="text"
            
              value={null}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
            <DayPicking value={today} setStart={setStart} setEnd={setEnd}/>
          </Col> */}
    
          {/* <Col lg={7} md={7} sm={12} xs={12} xl={7} >
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Total Amount :____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Amount spent:____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Remaining:____________________</h4>
          </Col> */}
        <div className="w-100">
          
                 {data?.map((item, index) => {
                  return   <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                  <h4 style={{ color: "#818181" }}>{item}</h4>
          <DynamicTable {...{setTableData,tableData,item}} />
          
              </div>;
                })}
               <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                  <h4 style={{ color: "#818181" }}>Compliment</h4>
          <ComplimentDynamicTable {...{setComplimentData,ComplimentData}}/>
          
              </div> 
        </div>
      </Row>
     
    </Container>
  );
}
