import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import LAASidebar from "../components/Sidebar/LAASidebar";
export default function AdminProjectListScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: "white" }}>
            <LAASidebar />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <AdminDashboard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
