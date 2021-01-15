import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./EmployeHeader.css";
import logo from "./../../assests/Pak-Group-logo-1.png";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";

const EmployeHeader = (props) => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="color-nav">
        <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
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
            <Nav.Link>
              <Link id="navlink" to="/">
                Dashboard
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/employee/todolist">
                To Do
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/employee/leads">
                Leads
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link id="navlink" to="/employee/inventory">
                Inventory
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/employee/policies">
                Policies
              </Link>
            </Nav.Link>

            <Nav.Link href="#Documentation" id="hr">
              HR
            </Nav.Link>

            <Nav.Item
              href="#"
              id=""
              onClick={() => {
                props.LOGOUT();
              }}
            >
              <Link
                id="R-navlink"
                to={{
                  pathname: "/",
                  state: { from: "AdminHeader" },
                }}
              >
                LOGOUT
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav id="profile">
          <Nav.Link
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
          </Nav.Link>
        </Nav>
      </Navbar>
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
