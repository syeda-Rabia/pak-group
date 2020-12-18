import './App.css';
import React from 'react';
import HeaderNavBar from './components/Header/HeaderNavBar';
// import Sidebar from './components/Sidebar/Sidebar';
import Sidebar from './components/SideBar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import LeadsAllocatonAndAddition from './screens/Admin/LeadsAllocationAndAddition/LeadsAllocatonAndAddition';
import IndividualDashboard from './screens/Admin/Dashboard/AdminDashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignIn from './screens/Admin/SignIn/SignIn';
import ClosedLeads from './screens/ClosedLeads';
import LeadsAdmin from './screens/Admin/Leads/LeadsAdmin';
import InventoryAdmin from './screens/Admin/Inventory/InventoryAdmin';
// import SearchLeads from './components/Sidebar/SearchLeads';
import SearchLeads from './components/SideBar/SearchLeads';
import Demo from './screens/Demo';
import ToDoListAdmin from './screens/Admin/TodoList/ToDoListAdmin';

function App() {
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
                <Route exact path="/inventory">
                  <InventoryAdmin />
                </Route>
                <Route exact path="/todolist">
                  <ToDoListAdmin />
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
