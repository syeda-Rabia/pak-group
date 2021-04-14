import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import {
  BrowserRouter as Router,

  Route, Switch,


  useLocation
} from "react-router-dom";
import "./App.css";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import InventorySidebar from "./components/Sidebar/InventorySidebar";
import LeadsSidebar from "./components/Sidebar/LeadsSidebar";
import { getToken, onMessageListener } from './firebase';
import AddEmployee from "./screens/Admin/AddUser/AddEmployee";
import AdminDashboard from "./screens/Admin/Dashboard/AdminDashboard";
import AddInventory from "./screens/Admin/Inventory/AddInventory";
import InventoryAdmin from "./screens/Admin/Inventory/InventoryAdmin";
import LeadsAdmin from "./screens/Admin/Leads/LeadsAdmin";
import LeadsAllocatonAndAddition from "./screens/Admin/LeadsAllocationAndAddition/LeadsAllocatonAndAddition";
import SignIn from "./screens/Admin/SignIn/SignIn";
// import Demo from "./screens/Demo";
import ToDoListAdmin from "./screens/Admin/TodoList/ToDoListAdmin";
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import ClosedLeads from "./screens/ClosedLeads";
import { KeyboardDatePickerExample } from "./utils/KeyboardTimePickerExample";

function App() {
  var location = useLocation();
  const [condition, setCondition] = React.useState("");


  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
  }).catch(err => console.log('failed: ', err));



  const usePageViews = () => {
    React.useEffect(() => {
      setCondition(location.pathname);
      // ;
      // ;
    }, [location]);
  };
  const [userType, setUSerType] = React.useState("admin");

  // const Condition = () => {
  //   if (
  //     condition === '/admin/dashboard' ||
  //     '/admin/leadsallocation' ||
  //     '/admin/closedleads'
  //   ) {
  //     return <LAASidebar />;
  //   } else {
  //     return <LeadsSidebar />;
  //   }
  // };
  const AdminRoute = () => {
    return (
      <React.Fragment>
        
        <HeaderNavBar />
        <Container fluid style={{ height: "100vh" }}>
          <Row>
            <Col
              lg={2}
              md={2}
              sm={5}
              xs={5}
              style={{ backgroundColor: "white" }}
            >
              {/* <Condition /> */}
              {/* <LAASidebar /> */}
              <InventorySidebar />
            </Col>
            <Col
              lg={10}
              md={10}
              sm={7}
              xs={7}
              style={{ backgroundColor: "#FAFAFA" }}
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
              <Route exact path="/viewable">
                <ViewableTo />
              </Route>

              <Route exact path="/admin/inventory">
                <InventoryAdmin />
                {/* <ProjectList /> */}
              </Route>
              <Route exact path="/admin/inventory/add">
                <AddInventory />
              </Route>

              <Route exact path="/admin/todolist">
                <ToDoListAdmin />
              </Route>
              <Route exact path="/filter">
                <ToDoListAdmin />
              </Route>

              <Route exact path="/test">
                <KeyboardDatePickerExample />
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
        <Container fluid style={{ height: "100vh" }}>
          <Row>
            <Col
              lg={2}
              md={2}
              sm={5}
              xs={5}
              style={{ backgroundColor: "white" }}
            >
              <LeadsSidebar />
            </Col>
            <Col
              lg={10}
              md={10}
              sm={7}
              xs={7}
              style={{ backgroundColor: "#FAFAFA" }}
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

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn setUser={setUSerType} />
        </Route>
        {userType === "admin" ? <AdminRoute /> : <EmployeRoute />}
      </Switch>
      <Toast onClose={() => setShow(false)} show={show} delay={8000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
    </Router>
  );
}

export default App;
