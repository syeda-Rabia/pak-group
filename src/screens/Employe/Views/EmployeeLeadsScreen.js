import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLeads from "../Leads/EmployeeLeads";
import LeadsSidebar from "../../../components/Sidebar/LeadsSidebar";
export default function EmployeeLeadsScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: "white" }}>
            <LeadsSidebar />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeLeads />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
