import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './HeaderNavbar.css';
import logo from '../assests/Pak-Group-logo-1.png';
export default function HeaderNavBar() {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="color-nav">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="150px"
            height="50px"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#To-do-list">To Do</Nav.Link>
            <Nav.Link href="#Leads">Leads</Nav.Link>
            <NavDropdown title="Allocation" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Search Leads
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Add New Leads
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">To Do List</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Closed Leads
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#Inventory">Inventory</Nav.Link>
            <Nav.Link href="#Accounts">Accounts</Nav.Link>
            <Nav.Link href="#Policies">Policies</Nav.Link>
            <Nav.Link href="#Documentation">Documentation</Nav.Link>
            <Nav.Link href="#Documentation" id="hr">
              HR
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav id="profile">
          <Nav.Link
            href="#profile"
            style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              lineHeight: '20px',
            }}
          >
            <span style={{ color: 'black' }}>HR</span>
          </Nav.Link>
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}
