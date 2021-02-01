import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import LeadsAllocatonAndAddition from "../LeadsAllocationAndAddition/LeadsAllocatonAndAddition";
export default function AdminLAAScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          <Col
            id="sidebar-component"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <LAASidebar />
            {/* <InventoryMobileViewSidebar /> */}
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <LeadsAllocatonAndAddition />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
