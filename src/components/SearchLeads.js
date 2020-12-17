import React from 'react';
import { Dropdown } from 'react-bootstrap';
import buttonImg from '../assests/resource.svg';
import './SearchLeads.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
export default function SearchLeads() {
  return (
    <div
      style={{
        height: '100vh',
        // border: '2px solid blue',
      }}
    >
      <Dropdown>
        <Dropdown.Toggle size="sm" id="dropdown-basic">
          <span>Search Leads</span>
          <ExpandMoreIcon />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Search Leads</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
