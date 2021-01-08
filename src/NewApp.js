import "./App.css";
import React from "react";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import { Container, Row, Col } from "react-bootstrap";
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
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import EmployeeDashboardScreen from "./screens/Employe/Views/EmployeeDashboardScreen";
import EmployeeLeadsScreen from "./screens/Employe/Views/EmployeeLeadsScreen";
import EmployeeInventory from "./screens/Employe/EmployeeInventory/EmployeeInventory";
import EmployeeToDo from "./screens/Employe/EmployeeToDo/EmployeeToDo";
import EmployeePolicies from "./screens/Employe/Policies/EmployeePolicies";
import ProjectList from "./screens/Admin/Inventory/ProjectList";

import ExcelPage from "./utils/ExcelPage";
import AdminProjectDetailsScreen from "./screens/Admin/Views/AdminProjectDetailsScreen";

function NewApp() {
  const [userType, setUserType] = React.useState("admin");
  console.log("user app", userType);
  const AdminRoute = () => {
    return (
      <React.Fragment>
        <Route path="/admin/add-project">
          <HeaderNavBar />
          <AdminAddInventoryScreen />
        </Route>

        <Route
          exact
          path="/admin/projects/"
          render={(props) => (
            <>
              <HeaderNavBar />
              <AdminProjectDetailsScreen {...props} />
            </>
          )}
        />
        {/* 
        <Route path="/admin/projects/">
          <HeaderNavBar />
          <AdminProjectDetailsScreen />
        </Route> */}

        <Route path="/admin/inventory">
          <HeaderNavBar />
          <AdminProjectListScreen />
        </Route>
        <Route path="/admin/dashboard">
          <HeaderNavBar />
          <AdminDashboardScreen />
        </Route>
        <Route path="/admin/leadsallocation">
          <HeaderNavBar />
          <AdminLAAScreen />
        </Route>
        <Route path="/admin/leads">
          <HeaderNavBar />
          <AdminLeadsScreen />
        </Route>
        <Route path="/admin/todolist">
          <HeaderNavBar />
          <AdminTodoListScreen />
        </Route>
        <Route path="/admin/user">
          <HeaderNavBar />
          <AddEmployee />
        </Route>
        <Route path="/admin/policies">
          <HeaderNavBar />
          <EmployeePolicies />
        </Route>
        <Route exact path="/admin/viewable">
          <HeaderNavBar />
          <ViewableTo />
        </Route>
        <Route path="/admin/upload-file">
          <HeaderNavBar />
          <br />
          {/* <ProjectList /> */}
          <ExcelPage />
        </Route>
      </React.Fragment>
    );
  };

  const EmployeeRoute = () => {
    return (
      <React.Fragment>
        <Route path="/employee/dashboard">
          <EmployeHeader />
          <EmployeeDashboardScreen />
        </Route>
        <Route path="/employee/leads">
          <EmployeHeader />
          <EmployeeLeadsScreen />
        </Route>
        <Route path="/employee/inventory">
          <EmployeHeader />
          <EmployeeInventory />
        </Route>
        <Route path="/employee/policies">
          <EmployeHeader />
          <EmployeePolicies />
        </Route>
        <Route path="/employee/todolist">
          <EmployeHeader />
          <EmployeeToDo />
        </Route>
      </React.Fragment>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <SignIn /> */}
          <SignIn setUser={setUserType} />
          {/* {userType === "admin" ? (
            <Route
              render={() => (
                <Redirect
                  to={{
                    pathname: "/admin/dashboard",
                  }}
                />
              )}
            />
          ) : userType === "employee" ? (
            <Route
              render={() => (
                <Redirect
                  to={{
                    pathname: "/employee/dashboard",
                  }}
                />
              )}
            />
          ) : null} */}
        </Route>
        {userType === "admin" ? (
          <AdminRoute />
        ) : userType === "employee" ? (
          <EmployeeRoute />
        ) : null}
        {/* {userType === "admin" ? alert("Admin") : alert("employee")} */}
      </Switch>
    </Router>
  );
}

export default NewApp;
