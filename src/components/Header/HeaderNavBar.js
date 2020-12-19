import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './HeaderNavbar.css';
import logo from './../../assests/Pak-Group-logo-1.png';
import { Link } from 'react-router-dom';

export default function HeaderNavBar() {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="color-nav">
        <Navbar.Brand>
          <Link to="/dashboard">
            <img
              alt=""
              src={logo}
              width="150px"
              height="50px"
              className="d-inline-block align-top"
            />{' '}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link
                id="navlink"
                to={{
                  pathname: '/admin/dashboard',
                  state: { from: 'AdminHeader' },
                }}
              >
                Dashboard
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/admin/todolist">
                To Do
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/admin/leads">
                Leads
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link id="navlink" to="/admin/leadsallocation">
                Allocation
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link id="navlink" to="/admin/inventory">
                Inventory
              </Link>
            </Nav.Link>
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
