import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dummyData } from "../../../assests/constants/todoList";

export default function Testfunction() {
  const [data, setData] = React.useState(dummyData);
    const Data = ({ item, index }) => {
    return (
    <div className="" style={{height:"12vh",backgroundColor:"darkgray"}}>
{item.employee}
    </div>
    );
  };
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Test 
          </h3>
        </Col>
      </Row>

      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <div className="">
           
              
               
              
             
              
                 {data?.map((item, index) => {
                  return <Data index={index} item={item} />;
                })}
                
           
           
          </div>
        </div>
      </Row>
     
    </Container>
  );
}
