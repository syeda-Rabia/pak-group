import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminDashboard from "../Dashboard/AdminDashboard";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/SwipableSidebar";
import "./AdminDashboardScreen.css";
export default function AdminProjectListScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col
            id="sidebar-component"
            class="shadow"
            lg={2}
            md={2}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <LAASidebar name="Leads Allocation and Addition" />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            {/* <SwipeableTemporaryDrawer /> */}

            <AdminDashboard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
