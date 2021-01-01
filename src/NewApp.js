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
import ProjectList from "./screens/Admin/Inventory/ProjectList";
import ExcelPage from "./utils/ExcelPage";
function NewApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/admin/inventory/add">
          <HeaderNavBar />
          <AdminAddInventoryScreen />
        </Route>
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
        <Route path="/employee/dashboard">
          <EmployeHeader />
          <EmployeeDashboardScreen />
        </Route>
        <Route path="/employee/leads">
          <EmployeHeader />
          <EmployeeLeadsScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default NewApp;
