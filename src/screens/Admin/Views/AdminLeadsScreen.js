import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeadsAdmin from "../Leads/LeadsAdmin";
import LeadsSidebar from "../../../components/Sidebar/LeadsSidebar";
export default function AdminLeadsScreen() {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col
            id="sidebar-component"
            className="shadow"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <LeadsSidebar />
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <LeadsAdmin />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
