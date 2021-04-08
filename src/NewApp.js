import "./App.css";
import React, { useState ,useEffect} from "react";
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
  const AdminRoute = () => {
  
    // ;
    return (
      <React.Fragment>
        <Route path="/admin/add-project"
        render={(props) => (
            <>
          <HeaderNavBar {...props}/>
          <AdminAddInventoryScreen {...props}/>
          </>
          )}>
        </Route>
        <Route path="/admin/newinventory" 
          render={(props) => (
            <>
              <HeaderNavBar {...props}/>
            
              <AddNewInventory {...props} />
            </>
          )}>
       
        </Route>
        <Route path="/admin/employee-request">
          <HeaderNavBar {...props}/>
          <EmployeeRequestTable />
        </Route>

        <Route
          exact
          path="/admin/projects"
          render={(props) => (
            <>
              <HeaderNavBar {...props}/>
              <AdminProjectDetailsScreen {...props} />
            </>
          )}
        />

        <Route path="/admin/add-category">
          <HeaderNavBar {...props}/>
          <AdminCategoriesDetailScreen />
        </Route>
        <Route path="/admin/add-interest">
          <HeaderNavBar {...props}/>
          <AddInterest />
        </Route>
        <Route path="/admin/emp-action"  
        render={(props) => (
            <>
              <HeaderNavBar {...props}/>
              <EmployeeAction {...props} />
            </>
          )}>
        
        </Route>
        <Route
          exact
          path="/admin/inventory"
          render={(props) => (
            <>
              <HeaderNavBar {...props}/>
               <AdminProjectListScreen {...props}/>
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
              <HeaderNavBar {...props}/>
               <AdminDashboardScreen {...props}/>
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
              <HeaderNavBar {...props}/>
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
              <HeaderNavBar {...props}/>
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
          <HeaderNavBar {...props}/>
          <AddEmployee />
        </Route>
        <Route path="/admin/policies">
          <HeaderNavBar {...props}/>
          <AdminPolicies />
        </Route>
        <Route exact path="/admin/viewable">
          <HeaderNavBar {...props}/>
          <ViewableTo />
        </Route>
        <Route exact path="/admin/closedleads">
          <HeaderNavBar {...props}/>
          <ClosedLeads />
        </Route>
        <Route path="/admin/upload-file">
          <HeaderNavBar {...props}/>
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
        <Route exact path="/">
          {/* <Route path="/employee/dashboard"> */}

          <EmployeHeader {...props}/>
          <EmployeeDashboardScreen />
        </Route>
        <Route
          exact
          path="/employee/inventory-details"
          render={(props) => (
            <>
              <EmployeHeader {...props}/>
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
              <EmployeHeader {...props}/>
              <EmployeeLeadsScreen {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/employee/inventory"
          render={(props) => (
            <>
              <EmployeHeader {...props}/>
          <EmployeeInventory {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory">
          <EmployeHeader />
          <EmployeeInventory />
        </Route> */}
        <Route path="/employee/policies">
          <EmployeHeader {...props}/>
          <EmployeePolicies />
        </Route>
        <Route path="/employee/todolist">
          <EmployeHeader {...props}/>
          {/* <EmployeeLeadsScreen {...props} /> */}
          <EmployeeToDoScreen {...props}/>
         
        </Route>
        <Route path="/employee/admin-action"  
        render={(props) => (
            <>
              <EmployeHeader {...props}/>
              <AdminAction {...props} />
            </>
          )}>
        
        </Route>
      </React.Fragment>
    );
  };

  return (
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
