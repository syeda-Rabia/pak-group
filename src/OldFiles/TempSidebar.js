import React from 'react';
import {
  ListGroup,
  OverlayTrigger,
  Button,
  Form,
  Popover,
  Row,
  Col,
} from 'react-bootstrap';
import buttonImg from './../../assests/resource.svg';
import './TempSidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchLeads from './SearchLeads';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  const [toggle, setToggle] = React.useState(false);
  const displayList = () => {
    setToggle(!toggle);
    console.log('toggle', toggle);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Project</Form.Label>
                <Form.Control
                  controlId="projectName"
                  as="select"
                  defaultValue="Project Name"
                >
                  <option>Project 1</option>
                  <option>Project 2</option>
                </Form.Control>
                <Form.Label>Date wise</Form.Label>
                <Form.Control
                  controlId="date"
                  as="select"
                  defaultValue="Date Wise"
                >
                  <option>Date 1</option>
                  <option>Date 2</option>
                </Form.Control>
                <Form.Label>Year Wise</Form.Label>
                <Form.Control
                  controlId="year"
                  as="select"
                  defaultValue="Year Wise"
                >
                  <option>Year wise 1</option>
                  <option>Year Wise 2</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>City Wise</Form.Label>
                <Form.Control
                  controlId="city"
                  as="select"
                  defaultValue="City Name"
                >
                  <option>City 1</option>
                  <option>City 2</option>
                </Form.Control>
                <Form.Label>Sale Person</Form.Label>
                <Form.Control
                  controlId="SalePerson"
                  as="select"
                  defaultValue="Sale Person"
                >
                  <option>Person 1</option>
                  <option>Person 2</option>
                </Form.Control>
                <Form.Label>Month Wise</Form.Label>
                <Form.Control
                  controlId="month"
                  as="select"
                  defaultValue="Month Wise"
                >
                  <option>Month 1</option>
                  <option>Month 2</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
        </Form>
      </Popover.Content>
    </Popover>
  );

  const List = (props) => {
    return (
      <ul class="list-group">
        <li id="list-item" class="list-group-item" action>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <button className="search-leads">
              Search Leads <ExpandMoreIcon />
            </button>
          </OverlayTrigger>
        </li>
        <li id="list-item" class="list-group-item">
          Add News Leads
        </li>
        <li id="list-item" class="list-group-item">
          <Link
            className="navLink"
            id="list-item"
            to={{
              pathname: '/admin/todolist',
            }}
          >
            To Do List
          </Link>
        </li>
        <li id="list-item" class="list-group-item">
          <Link
            className="navLink"
            id="list-item"
            to={{
              pathname: '/admin/closedleads',
            }}
          >
            Closed Leads
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        // border: '2px solid blue',
      }}
    >
      <button className="toggle-button" onClick={displayList}>
        <img src={buttonImg} />
        <span>
          Leads Allocaton and Addition <ExpandMoreIcon />
        </span>
      </button>
      {toggle === true ? <List /> : null}
    </div>
  );
}
