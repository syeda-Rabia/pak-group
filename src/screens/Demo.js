import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderNavBar from '../components/Header/HeaderNavBar';
import InventorySidebar from '../components/Sidebar/InventorySidebar';
import AddInventory from './Admin/Inventory/AddInventory';
export default function Demo() {
  return (
    <React.Fragment>
      <HeaderNavBar />
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: 'white' }}>
            {/* <Sidebar /> */}
            {/* <SearchLeads /> */}
            <InventorySidebar />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <AddInventory />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
