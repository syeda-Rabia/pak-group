import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminDashboard from "../Dashboard/AdminDashboard";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/SwipableSidebar";
export default function AdminProjectListScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col
            class="shadow"
            lg={2}
            md={2}
            sm={5}
            xs={5}
            style={{ backgroundColor: "white" }}
          >
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
