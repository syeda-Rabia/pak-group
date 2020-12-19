import './App.css';
import React from 'react';
import HeaderNavBar from './components/Header/HeaderNavBar';
import Sidebar from './components/Sidebar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import LeadsAllocatonAndAddition from './screens/Admin/LeadsAllocationAndAddition/LeadsAllocatonAndAddition';
import AdminDashboard from './screens/Admin/Dashboard/AdminDashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import SignIn from './screens/Admin/SignIn/SignIn';
import ClosedLeads from './screens/ClosedLeads';
import LeadsAdmin from './screens/Admin/Leads/LeadsAdmin';
import InventoryAdmin from './screens/Admin/Inventory/InventoryAdmin';
import SearchLeads from './components/Sidebar/SearchLeads';
import Demo from './screens/Demo';
import ToDoListAdmin from './screens/Admin/TodoList/ToDoListAdmin';
import EmployeHeader from './components/EmployeHeader/EmployeHeader';
import AddEmployee from './screens/Admin/AddUser/AddEmployee';

function App() {
  // const location = useLocation();
  // console.log('----------', location.pathname);
  const [condition, setCondition] = React.useState(false);
  const [userType, setUSerType] = React.useState('admin');
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        {userType === 'admin' ? <AdminRoute /> : <EmployeRoute />}
      </Switch>
    </Router>
  );
}

const AdminRoute = () => {
  return (
    <React.Fragment>
      <HeaderNavBar />
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: 'white' }}>
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
            <Route exact path="/admin/dashboard">
              <AdminDashboard />
            </Route>

            <Route exact path="/admin/leadsallocation">
              <LeadsAllocatonAndAddition />
            </Route>
            <Route exact path="/admin/user">
              <AddEmployee />
            </Route>
            <Route exact path="/admin/closedleads">
              <ClosedLeads />
            </Route>
            <Route exact path="/admin/leads">
              <LeadsAdmin />
            </Route>

            <Route exact path="/admin/inventory">
              <InventoryAdmin />
            </Route>

            <Route exact path="/admin/todolist">
              <ToDoListAdmin />
            </Route>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const EmployeRoute = () => {
  return (
    <React.Fragment>
      <EmployeHeader />
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          <Col lg={2} md={2} sm={5} xs={5} style={{ backgroundColor: 'white' }}>
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
            <Route exact path="/employe/dashboard">
              <AdminDashboard />
            </Route>

            <Route exact path="/employe/leads">
              <LeadsAdmin />
            </Route>

            <Route exact path="/employe/inventory">
              <InventoryAdmin />
            </Route>

            <Route exact path="/employe/todolist">
              <ToDoListAdmin />
            </Route>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
