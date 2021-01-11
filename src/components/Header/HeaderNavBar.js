import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./HeaderNavbar.css";
import logo from "./../../assests/Pak-Group-logo-1.png";
import { Link } from "react-router-dom";

export default function HeaderNavBar(props) {
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/",
                  state: { from: "AdminHeader" },
                }}
              >
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/todolist",
                  state: { from: "AdminHeader" },
                }}
              >
                To Do
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/leads",
                  state: { from: "AdminHeader" },
                }}
              >
                Leads
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/leadsallocation",
                  state: { from: "AdminHeader" },
                }}
              >
                Allocation
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/inventory",
                  state: { from: "AdminHeader" },
                }}
              >
                Inventory
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/user",
                  state: { from: "AdminHeader" },
                }}
              >
                User
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                id="R-navlink"
                to={{
                  pathname: "/admin/policies",
                  state: { from: "AdminHeader" },
                }}
              >
                Policies
              </Link>
            </Nav.Item>
            <Nav.Item href="#Accounts">Accounts</Nav.Item>
            <Nav.Item href="#Documentation">Documentation</Nav.Item>
            <Nav.Item href="#Documentation" id="hr">
              HR
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
    </Container>
  );
}
