import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./HeaderNavbar.css";
import logo from "./../../assests/Pak-Group-logo-1.png";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const HeaderNavBar = (props) => {
  const history = useHistory();
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const User=props.user.user_info.first_name;
  // ;
  return (
    <
      // fluid
      // // style={{ backgroundColor: "#2258bf" }}
      // xl={12}
      // lg={12}
      // sm={12}
      // xs={12}
      // className=" mx-0 px-0 h-100"
    >
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        className="color-nav h-100 w-100"
      >
        <Navbar.Brand>
          <Link
            onClick={() => {
              setSelected(1);
            }}
            to="/"
          >
            <img
              alt="PaK Group"
              src={logo}
              width="150px"
              height="50px"
              className="d-inline-block align-top"
            />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              onClick={() => {
                setSelected(1);
              }}
              id="R-navlink"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 1 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >
                Dashboard
              </Nav.Item>
            </Link>
            {/* <Link
onClick={()=>{
  setSelected(0)
}}

              id="R-navlink"
              to={{
                pathname: "/admin/todolist",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 1 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >To Do</Nav.Item>
            </Link> */}
            <Link
              onClick={() => {
                setSelected(2);
              }}
              id="R-navlink"
              to={{
                pathname: "/admin/leads",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 2 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >Leads</Nav.Item>
            </Link>
            <Link
              onClick={() => {
                setSelected(3);
              }}
              id="R-navlink"
              to={{
                pathname: "/admin/leadsallocation",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 3 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >Allocation</Nav.Item>
            </Link>
            <Link
              onClick={() => {
                setSelected(4);
              }}
             
              id="R-navlink"
              to={{
                pathname: "/admin/inventory",
                state: { from: "AdminHeader" },
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
                pathname: "/admin/user",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 5 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >User</Nav.Item>
            </Link>
            <Link
              onClick={() => {
                setSelected(6);
              }}
              id="R-navlink"
              to={{
                pathname: "/admin/policies",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 6 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                }}
              >Policies</Nav.Item>
            </Link>
            <Link
              // onClick={() => {
              //   setSelected(7);
              // }}
              id="R-navlink"
            >
              <Nav.Item
                // style={{
                //   backgroundColor:
                //     selected == 7 ? "rgba(93, 188, 210, 0.5)" : "transparent",
                // }}
              >HR</Nav.Item>
            </Link>

            {/* <Nav.Item href="#Accounts">Accounts</Nav.Item>
            <Nav.Item href="#Documentation">Documentation</Nav.Item> */}
            {/* <Nav.Item href="#Documentation" id="hr">
              HR
            </Nav.Item> */}
            <Link
              onClick={() => {
                setSelected(8);
              }}
              id="mobileLogout"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                style={{
                  backgroundColor:
                    selected == 8 ? "rgba(93, 188, 210, 0.5)" : "transparent",
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
          {/* <Nav.Link
            href="#profile"
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              lineHeight: "20px",
            }}
          >
            <span style={{ color: "black" }}>HR</span>
          </Nav.Link> */}
          <Link
            // onClick={() => {
            //   setSelected(0);
            // }}
            id="R-navlink"
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(signOut()),
  };
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
