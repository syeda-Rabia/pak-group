import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import SearchLeads from '../components/SearchLeads';
// import Sidebar from '../components/Sidebar';
// import HeaderNavBar from '../components/HeaderNavBar';
import HeaderNavBar from '../components/Header/HeaderNavBar';
// import SearchLeads from '../components/SideBar/SearchLeads';

// import IndividualDashboard from './screens/IndividualDashboard';
import IndividualDashboard from './Admin/Dashboard/AdminDashboard';
export default function Demo() {
  return (
    <React.Fragment>
      <HeaderNavBar />
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: 'white' }}>
            {/* <Sidebar /> */}
            {/* <SearchLeads /> */}
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <IndividualDashboard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
