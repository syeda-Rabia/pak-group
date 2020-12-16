import React from 'react';
import { Dropdown } from 'react-bootstrap';
import buttonImg from '../assests/resource.svg';
import './Sidebar.css';
export default function Sidebar() {
  return (
    <div
      style={{
        height: '100vh',
        // border: '2px solid blue',
      }}
    >
      <Dropdown>
        <Dropdown.Toggle size="sm" id="dropdown-basic">
          <img src={buttonImg} />
          <span>Leads Allocaton and Addition</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Search Leads</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Add New Leads</Dropdown.Item>
          <Dropdown.Item href="#/action-3">TO DO List</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Closed Leads</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
