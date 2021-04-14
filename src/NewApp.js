import "./App.css";
import React, { useState, useEffect } from "react";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import { Col, Container, Row, Toast,Button } from "react-bootstrap";
import { getToken, onMessageListener } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import SignIn from "./screens/Admin/SignIn/SignIn";
import AddEmployee from "./screens/Admin/AddUser/AddEmployee";
import AdminAddInventoryScreen from "./screens/Admin/Views/AdminAddInventoryScreen";
import AdminProjectListScreen from "./screens/Admin/Views/AdminProjectListScreen";
import AdminDashboardScreen from "./screens/Admin/Views/AdminDashboardScreen";
import AdminLAAScreen from "./screens/Admin/Views/AdminLA&AScreen";
import AdminLeadsScreen from "./screens/Admin/Views/AdminLeadsScreen";
import AdminTodoListScreen from "./screens/Admin/Views/AdminTodoListScreen";
import AdminCategoriesDetailScreen from "./screens/Admin/Views/AdminCategoriesDetailScreen";
import AdminAddNewInventoryScreen from "./screens/Admin/Views/AdminAddNewInventoryScreen";
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import EmployeeDashboardScreen from "./screens/Employe/Views/EmployeeDashboardScreen";
import EmployeeLeadsScreen from "./screens/Employe/Views/EmployeeLeadsScreen";
import EmployeeInventory from "./screens/Employe/EmployeeInventory/EmployeeInventory";
import EmployeeToDoScreen from "./screens/Employe/Views/EmployeeToDoScreen";
import EmployeeToDo from "./screens/Employe/EmployeeToDo/EmployeeToDo";
import EmployeePolicies from "./screens/Employe/Policies/EmployeePolicies";
import AdminPolicies from "./screens/Admin/Policies/AdminPolicies";
import AdminAction from "./screens/Employe/Leads/AdminAction";
import InventorySidebar from "./components/Sidebar/InventorySidebar";
import ProjectList from "./screens/Admin/Inventory/ProjectList";
import AddInterest from "./screens/Admin/Leads/AddInterest";
import ExcelPage from "./utils/ExcelPage";
import EmployeeAction from "./screens/Admin/Leads/EmployeeAction";
import EmployeeNotificaton from "./screens/Employe/EmployeeNotifications/EmployeeNotifications"
import AddNewInventory from "./screens/Admin/Inventory/AddNewInventory";
import AdminProjectDetailsScreen from "./screens/Admin/Views/AdminProjectDetailsScreen";
import { connect } from "react-redux";
import ClosedLeads from "./screens/ClosedLeads";
import EmployeeInventoryDetails from "./screens/Employe/EmployeeInventory/EmployeeInventoryDetails";
// import { token } from "../src/utils/Config";
import EmployeeRequestTable from "./components/EmployeeRequestTable";
import Test from "./screens/Test";

const NewApp = (props) => {
  const [userType, setUserType] = React.useState("admin");
  const [TOKEN, setTOKEN] = useState(props.user.token);
  // ;
  //firebase
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));
  //firebase end

  const AdminRoute = () => {
    // ;
    return (
      <React.Fragment>
        <HeaderNavBar {...props} />
        <Route
          path="/admin/add-project"
          render={(props) => (
            <>
              <AdminAddInventoryScreen {...props} />
            </>
          )}
        ></Route>
        <Route
          path="/admin/newinventory"
          render={(props) => (
            <>
              <AddNewInventory {...props} />
            </>
          )}
        ></Route>
        <Route path="/admin/employee-request">
          <EmployeeRequestTable />
        </Route>

        <Route
          exact
          path="/admin/projects"
          render={(props) => (
            <>
              <AdminProjectDetailsScreen {...props} />
            </>
          )}
        />

        <Route path="/admin/add-category">
          <AdminCategoriesDetailScreen />
        </Route>
        <Route path="/admin/add-interest">
          <AddInterest />
        </Route>
        <Route
          path="/admin/emp-action"
          render={(props) => (
            <>
              <EmployeeAction {...props} />
            </>
          )}
        ></Route>
        <Route
          exact
          path="/admin/inventory"
          render={(props) => (
            <>
              <AdminProjectListScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/inventory">
          <HeaderNavBar />
          <AdminProjectListScreen />
        </Route> */}
        {/* <Route path="/admin/dashboard"> */}
        <Route
          exact
          path="/"
          render={(props) => (
            <>
              <AdminDashboardScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/" exact>
          <HeaderNavBar />
          <AdminDashboardScreen />
        </Route> */}
        <Route
          exact
          path="/admin/leadsallocation"
          render={(props) => (
            <>
              <AdminLAAScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/leadsallocation">
          <HeaderNavBar />
          <AdminLAAScreen />
        </Route> */}
        <Route
          exact
          path="/admin/leads"
          render={(props) => (
            <>
              <AdminLeadsScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/leads">
          <HeaderNavBar />
          <AdminLeadsScreen />
        </Route> */}
        {/* <Route path="/admin/todolist">
          <HeaderNavBar />
          <AdminTodoListScreen />
        </Route> */}
        <Route path="/admin/user">
          <AddEmployee />
        </Route>
        <Route path="/admin/policies">
          <AdminPolicies />
        </Route>
        <Route exact path="/admin/viewable">
          <ViewableTo />
        </Route>
        <Route exact path="/admin/closedleads">
          <ClosedLeads />
        </Route>
        <Route path="/admin/upload-file">
          <br />
          {/* <ProjectList /> */}
          <ExcelPage />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </React.Fragment>
    );
  };

  const EmployeeRoute = () => {
    return (
      <React.Fragment>
        <EmployeHeader {...props} />
        <Route exact path="/">
          {/* <Route path="/employee/dashboard"> */}

          <EmployeeDashboardScreen />
        </Route>
        <Route
          exact
          path="/employee/inventory-details"
          render={(props) => (
            <>
              <EmployeeInventoryDetails {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory-details">
          <EmployeHeader />
          <EmployeeInventoryDetails/>
        </Route> */}
        <Route
          exact
          path="/employee/leads"
          render={(props) => (
            <>
              <EmployeeLeadsScreen {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/employee/inventory"
          render={(props) => (
            <>
              <EmployeeInventory {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory">
          <EmployeHeader />
          <EmployeeInventory />
        </Route> */}
        <Route path="/employee/policies">
          <EmployeePolicies />
        </Route>
        <Route path="/employee/todolist">
          {/* <EmployeeLeadsScreen {...props} /> */}
          <EmployeeToDoScreen {...props} />
        </Route>
        <Route
          path="/employee/admin-action"
          render={(props) => (
            <>
              <AdminAction {...props} />
            </>
          )}
        ></Route>
        <Route path="/employee/notifications">
          <EmployeeNotificaton />
        </Route>
      </React.Fragment>
    );
  };

  return (
    <>
      {" "}
      <Router>
        <Switch>
          {props.user.logged != false && props.user.token != null ? (
            parseInt(props.user.user_info.user_type) === 1 ? (
              <AdminRoute />
            ) : (
              <EmployeeRoute />
            )
          ) : (
            <Route exact path="/">
              <SignIn setUser={setUserType} />
            </Route>
          )}
        </Switch>
      </Router>

      <Toast
        onClose={() => setShow(false)}
        // onClick={()=>}
        show={show}
        delay={8000}
        type="info"
        autohide
        animation
        style={{
          position: "fixed",
          top: 100,
          right: 20,
          minWidth: 300,
        }}
      >
        <Toast.Header  style={{backgroundColor:"#2258bf",color:"white"}}>
         
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {};

const mapStateToProps = (state) => {
  // let userType = state.auth.user_info.user_type;
  //  ;

  // userType = parseInt(state.auth.user_info.user_type);

  //  ;

  // console.log("auths is --------", state.auth);

  return {
    user: state.auth,
  };
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(NewApp);
