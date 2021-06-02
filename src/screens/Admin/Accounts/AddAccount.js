import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dummyData } from "../../../assests/constants/todoList";
import { DayPicking } from "../../../utils/YearPicker";
import DynamicTable from "../../../components/dynamicTable";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {  useHistory, Redirect, Route } from "react-router-dom";

export default function AddAccount() {
  const [data, setData] = React.useState(dummyData);
  var today = new Date();
  const history = useHistory();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
    const Data = ({ item, index }) => {
    return (
    <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
        <h4 style={{ color: "#818181" }}>{item}</h4>
<DynamicTable/>

    </div>
    );
  };
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
         
      <Col lg={5} md={5} sm={12} xs={12} xl={5}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Account Name :____________________</h4>
            <DayPicking value={today} setStart={setStart} setEnd={setEnd}/>
          </Col>
    
          <Col lg={7} md={7} sm={12} xs={12} xl={7} >
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Total Amount :____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Amount spent:____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Remaining:____________________</h4>
          </Col>
        <div className="w-100">
          
                 {data?.map((item, index) => {
                  return <Data index={index} item={item} />;
                })}
                
        </div>
      </Row>
     
    </Container>
  );
}
