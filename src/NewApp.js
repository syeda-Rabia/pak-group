import "./App.css";
import React, { useState, useEffect } from "react";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import { Col, Container, Row, Toast, Button } from "react-bootstrap";
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
import AdminNotification from "./screens/Admin/AdminNotifications/AdminNotifications";
import LeadNotification from "./screens/Admin/AdminNotifications/LeadsNotification";
import Recordingnotification from "./screens/Admin/AdminNotifications/RecordingNotification";
import InventoryRequestNotification from "./screens/Admin/AdminNotifications/InventoryRequestNotification";
import EmployeeLeadNotification from "./screens/Employe/EmployeeNotifications/EmployeeLeadNotification";
import ClosedLeadNotification from "./screens/Employe/EmployeeNotifications/ClosedLeadNotification";
import InventoryNotification from "./screens/Employe/EmployeeNotifications/InventoryNotifications";
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
import EmployeeNotificaton from "./screens/Employe/EmployeeNotifications/EmployeeNotifications";
import AddNewInventory from "./screens/Admin/Inventory/AddNewInventory";
import AdminProjectDetailsScreen from "./screens/Admin/Views/AdminProjectDetailsScreen";
import { connect } from "react-redux";
import ClosedLeads from "./screens/ClosedLeads";
import EmployeeInventoryDetails from "./screens/Employe/EmployeeInventory/EmployeeInventoryDetails";
import ResetPassword from "./screens/ForgetPassword/ResetPassword";
// import { token } from "../src/utils/Config";
import EmployeeRequestTable from "./components/EmployeeRequestTable";
import Test from "./screens/Test";
const ToastComponent = ({ index, setNotificationData ,obj,url}) => {
//  setTimeout(() => {
//     setNotificationData((state) =>
//     state.filter((notify, id) => obj.id != notify.id)
//   )
//   }, 10000);
  return (
   
    <Toast
      onClose={() =>
        setNotificationData((state) =>
            // state.filter((notify, id) => obj.id != notify.id)
            { 
              let s=JSON.parse(JSON.stringify(state));
              return s.slice(0,state.length-2)            
            }
          )
      }
     
      show={true}
      delay={5000}
      type="info"
      autohide
      animation
      style={{
        position: "fixed",
        top: 100 +index*100,
        right: 20,
        minWidth: 350,
        minHeight:80,
      }}
    >
      <Link exact={true} to={{ pathname:obj.screen , data:obj.data}}>

      <Toast.Header style={{ backgroundColor: "#2258bf", color: "white" }}>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{obj.title}</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{obj.body}</Toast.Body>
      </Link>
    </Toast>
  
   );
};
// const data={gcm.notification.notification_body: "title 5: is Deleted", gcm.notification.notification_title: "Admin Delete: title 5."}
const NotificationToast = ({url}) => {
  //firebase
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [notificationData, setNotificationData] = useState([]);
  const [notificationsArray, setNotificationsArray] = React.useState([]);
  // const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);
  // console.log("--------get token---------",getToken);
  onMessageListener()
    .then((payload) => {

    
      // console.log("payload_____----------------------->",payload.data["gcm.notification.notification_body"]);
      let receivedData=Object.entries(payload.data)
      // console.log(receivedData)
      // console.log("payload json parse_____----------------------->",JSON.parse(payload.data["gcm.notification.notification_body"]));
      let keys=["gcm.notification.notification_body","gcm.notification.notification_title","gcm.notification.screen"];

      let data=JSON.parse(payload.data["gcm.notification.notification_body"]);
      // let action=JSON.parse(payload.empAction["gcm.notification.notification_body"]);

      setShow(true);
      setNotification({
        title: payload.data["gcm.notification.notification_title"],
        body: data.message,
        screen: payload.data["gcm.notification.screen"],
      });
      setNotificationData((state) => [
        {
          title: payload.data["gcm.notification.notification_title"],
          body:data.message,
          screen: payload.data["gcm.notification.screen"],
          id:state.length,
          data:data,
       
        },
        ...state,
      ]);
    })
    .catch((err) => console.log("failed: ", err));
  // console.log("notifications -------------->", notificationData);
  //firebase end
//  setInterval(() => {
//     setNotificationData((state) =>{
//       let arr=[];
//       if(state.length>0){

//         arr =state.slice(0,state.length-2)
//       }
//       return arr;
//     // state.filter((notify, id) => obj.id != notify.id)
// }  )
//   }, 10000);
  return (
    <>
    <div className="d-flex " style={{flexDirection:'column'}}>

      {notificationData.map((obj, index) => (
        <ToastComponent {...{ index,obj,setNotificationData,url }} />
       
      ))}
    </div>
    </>
  );
};

const NewApp = (props) => {
  const [userType, setUserType] = React.useState("admin");
  const [TOKEN, setTOKEN] = useState(props.user.token);
  // ;
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);
  // console.log("--------get token---------",getToken);
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
        <Route
          exact
          path="/admin/leads/notification"
          render={(props) => (
            <>
              <LeadNotification {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/admin/Inventory/notification"
          render={(props) => (
            <>
              <InventoryRequestNotification {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/admin/leads/recording"
          render={(props) => (
            <>
              <Recordingnotification {...props} />
            </>
          )}
        />
        {/* <Route exact path="/admin/leads/notification">
          <LeadNotification {props}/>
        </Route> */}
        <Route exact path="/admin/closedleads">
          <ClosedLeads />
        </Route>
        <Route path="/admin/upload-file">
          <br />
          {/* <ProjectList /> */}
          <ExcelPage />
        </Route>
        <Route exact path="/admin/notification">
          <AdminNotification />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        
      <NotificationToast url="/admin/leads" />
        
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
        <Route
          exact
          path="/employee/leads/notifications"
          render={(props) => (
            <>
              <EmployeeLeadNotification {...props} />
            </>
          )}
        />
         <Route
          exact
          path="/employee/leads/closedlead"
          render={(props) => (
            <>
              <ClosedLeadNotification {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/leads/notifications">
          <EmployeeLeadNotification />
        </Route> */}
        <Route
          exact
          path="/employee/inventory/notifications"
          render={(props) => (
            <>
              <InventoryNotification {...props} />
            </>
          )}
        />
        
        <NotificationToast url="/employee/leads" />


      </React.Fragment>
    );
  };

  return (
    <>
      {" "}
      <Router>
        <Switch>
        <Route exact path="/resetpassword">
            <ResetPassword/>
          </Route>
          {props.user.logged != false && props.user.token != null ? (
            parseInt(props.user.user_info.user_type) === 1 ? (
              <AdminRoute />
            ) : (
              <EmployeeRoute />
            )
          ) : (
            <>
            <Route exact path="/">
              <SignIn setUser={setUserType} />
            </Route>
           
           
          </>
          )}
         
          <Redirect from={"*"} to="/"/>
        </Switch>
      </Router>
      {/* <NotificationToast /> */}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {};

const mapStateToProps = (state) => {
  // let userType = state.auth.user_info.user_type;
  //  ;

  // userType = parseInt(state.auth.user_info.user_type);

  //  ;

  // console.log("auths is --------", state.auth.user_info.id);

  return {
    user: state.auth,
  };
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(NewApp);
