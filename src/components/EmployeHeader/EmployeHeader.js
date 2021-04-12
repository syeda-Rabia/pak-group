import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./EmployeHeader.css";
import logo from "./../../assests/Pak-Group-logo-1.png";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";
import {
  IconButton,
  Tooltip,
  Button,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, Link } from "react-router-dom";

const EmployeHeader = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);

  const history = useHistory();
  const User=props.user.user_info.first_name;
// console.log("user-------------------",User);
  const useStyles = makeStyles((theme) => ({
    white: {
      color: "#818181",
      backgroundColor: "#fff",
      width: theme.spacing(6),
      height: theme.spacing(6),
      border: 0,
    },
    logout: {
      "&, .MuiIconButton-root": {
        outline: "none !important",
      },
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar sticky="top" collapseOnSelect expand="lg" className="color-nav">
        <Navbar.Brand>
          <Link
          onClick={() => {
            setSelected(1);
          }}
          to="/">
            <img
              alt=""
              src={logo}
              width="150px"
              height="50px"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              id="R-navlink"
              onClick={() => {
                setSelected(1);
              }}
              to={{
                pathname: "/",
                state: { from: "employeeHeader" },
              }}
            >
              <Nav.Item
               style={{
                backgroundColor:
                  selected == 1 ? "rgba(93, 188, 210, 0.5)" : "transparent",
              }}
              >Dashboard</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              onClick={() => {
                setSelected(2);
              }}
              to={{
                pathname: "/employee/todolist",
                state: { from: "employeeHeader" },
              }}
            >
              <Nav.Item  style={{
                  backgroundColor:
                    selected == 2 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
                >To Do</Nav.Item>
            </Link>
            <Link
             onClick={() => {
              setSelected(3);
            }}
              id="R-navlink"
              to={{
                pathname: "/employee/leads",
                state: { from: "employeeHeader" },
              }}
            >
              <Nav.Item 
               style={{
                backgroundColor:
                  selected == 3 ? "rgba(93, 188, 210, 0.5)" : "transparent",
              }}
              >Leads</Nav.Item>
            </Link>

            <Link
             onClick={() => {
              setSelected(4);
            }}
              id="R-navlink"
              to={{
                pathname: "/employee/inventory",
                state: { from: "employeeHeader" },
              }}
            >
              <Nav.Item 
               style={{
                backgroundColor:
                  selected == 4 ? "rgba(93, 188, 210, 0.5)" : "transparent",
              }}
              >Inventory</Nav.Item>
            </Link>

            <Link
             onClick={() => {
              setSelected(5);
            }}
              id="R-navlink"
              to={{
                pathname: "/employee/policies",
                state: { from: "employeeHeader" },
              }}
            >
              <Nav.Item 
                style={{
                  backgroundColor:
                    selected == 5 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
               >Policies</Nav.Item>
            </Link>
            <Link 
            //  onClick={() => {
            //   setSelected(6);
            // }}
            id="R-navlink">
              <Nav.Item 
              //  style={{
              //   backgroundColor:
              //     selected == 5 ? "rgba(93, 188, 210, 0.5)" : "transparent",
              // }}
              
              >HR</Nav.Item>
            </Link>
           
            
            <Link
             onClick={() => {
              setSelected(7);
            }}
              id="mobileLogout"
              to={{
                pathname: "/",
                state: { from: "employeeHeader" },
              }}
            >
              
              <Nav.Item
               style={{
                backgroundColor:
                  selected == 7 ? "rgba(93, 188, 210, 0.5)" : "transparent",
              }}
                onClick={() => {
                  setOpen(true);
                  // props.LOGOUT();
                }}
              >
                LOGOUT
              </Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
       <span id="profile" style={{color:"white"}}> {User}</span> 
        <Nav id="profile">
          <Link
            id="R-navlink"
            // to={{
            //   pathname: "/",
            //   state: { from: "EmployeeHeader" },
            // }}
            onClick={() => {
              setOpen(true);
              // props.LOGOUT();
            }}
          >
            <Tooltip title="Logout" placement="left">
           
              <Avatar className={classes.white}>
                <IconButton className={classes.logout}>
               
                  <ExitToAppIcon />
                </IconButton>
              </Avatar>
             
            </Tooltip>
          </Link>
        </Nav>
       
      </Navbar>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Logout?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              props.LOGOUT();
              history.push("/");
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(signOut()),
  };
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeHeader);
