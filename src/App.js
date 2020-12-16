import './App.css';
import React from 'react';
import HeaderNavBar from './components/HeaderNavBar';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import LeadsAllocatonAndAddition from './components/LeadsAllocatonAndAddition';
import IndividualDashboard from './screens/IndividualDashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignIn from './screens/SignIn';

function App() {
  const viewHeight = window.outerHeight;
  console.log(viewHeight);

  return (
    <React.Fragment>
      <HeaderNavBar />
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: 'white' }}>
            <Sidebar />
          </Col>
          <Col
            lg={10}
            md={10}
            sm={7}
            xs={7}
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <IndividualDashboard />
            {/* <LeadsAllocatonAndAddition /> */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
    // <SignIn />
  );
}

export default App;
