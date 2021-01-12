import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./HeaderNavbar.css";
import logo from "./../../assests/Pak-Group-logo-1.png";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  white: {
    color: "#818181",
    backgroundColor: "#fff",
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: 0,
  },
}));

const HeaderNavBar = (props) => {
  const classes = useStyles();

  console.log(props);
  return (
    <Container
      fluid
      style={{ backgroundColor: "#2258bf" }}
      xl={12}
      lg={12}
      sm={12}
      xs={12}
      className=" mx-0 px-0"
    >
      <Navbar sticky="top" collapseOnSelect expand="lg" className="color-nav">
        <Navbar.Brand>
          <Link to="/">
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
              id="R-navlink"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Dashboard</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/todolist",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>To Do</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/leads",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Leads</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/leadsallocation",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Allocation</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/inventory",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Inventory</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/user",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>User</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/policies",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Policies</Nav.Item>
            </Link>

            {/* <Nav.Item href="#Accounts">Accounts</Nav.Item>
            <Nav.Item href="#Documentation">Documentation</Nav.Item> */}
            <Nav.Item href="#Documentation" id="hr">
              HR
            </Nav.Item>
            <Link
              id="R-navlink"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                onClick={() => {
                  props.LOGOUT();
                }}
              >
                LOGOUT
              </Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
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
          <Avatar className={classes.white}>HR</Avatar>
        </Nav>
      </Navbar>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(signOut()),
  };
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
