import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLAASidebar from "../../../components/Sidebar/EmployeeLAASidebar";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard";
export default function EmployeeDashboardScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: "white" }}>
            <EmployeeLAASidebar />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeDashboard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
