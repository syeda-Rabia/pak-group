import './App.css';
import React from 'react';
import HeaderNavBar from './components/HeaderNavBar';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import LeadsAllocatonAndAddition from './screens/LeadsAllocatonAndAddition';
import IndividualDashboard from './screens/IndividualDashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignIn from './screens/SignIn';
import ClosedLeads from './screens/ClosedLeads';
import LeadsAdmin from './screens/LeadsAdmin';
import InventoryAdmin from './screens/InventoryAdmin';
import SearchLeads from './components/SearchLeads';

function App() {
  const viewHeight = window.outerHeight;
  console.log(viewHeight);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <React.Fragment>
          <HeaderNavBar />
          <Container fluid style={{ height: '100vh' }}>
            <Row>
              <Col
                lg={2}
                md={2}
                sm={5}
                xs={5}
                style={{ backgroundColor: 'white' }}
              >
                {/* <Sidebar /> */}
                <SearchLeads />
              </Col>
              <Col
                lg={10}
                md={10}
                sm={7}
                xs={7}
                style={{ backgroundColor: '#FAFAFA' }}
              >
                <Route exact path="/dashboard">
                  <IndividualDashboard />
                </Route>
                <Route exact path="/leadsallocation">
                  <LeadsAllocatonAndAddition />
                </Route>
                <Route exact path="/closedleads">
                  <ClosedLeads />
                </Route>
                <Route exact path="/leads">
                  <LeadsAdmin />
                </Route>
                <Route exact path="/Inventory">
                  <InventoryAdmin />
                </Route>
                {/* <IndividualDashboard /> */}
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
