import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Popover from "@material-ui/core/Popover";

import { Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function FormPopover(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        // color="primary"
        // className="mb-2"
        style={{ backgroundColor: "#e5eeff" }}
        id="searchLeads"
        onClick={handleClick}
      >
        {props.name} <ExpandMoreIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Container style={{ backgroundColor: "#f5f8ff" }} className="pt-3">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <b>Project</b>
                  </Form.Label>
                  <Form.Control
                    controlId="projectName"
                    as="select"
                    defaultValue="Project Name"
                  >
                    <option>Project 1</option>
                    <option>Project 2</option>
                  </Form.Control>
                  <Form.Label>
                    <b>Date wise</b>
                  </Form.Label>
                  <Form.Control
                    controlId="date"
                    as="select"
                    defaultValue="Date Wise"
                  >
                    <option>Date 1</option>
                    <option>Date 2</option>
                  </Form.Control>
                  <Form.Label>
                    <b>Year Wise</b>
                  </Form.Label>
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
                  <Form.Label>
                    <b>Sale Person</b>
                  </Form.Label>
                  <Form.Control
                    controlId="Sale Person"
                    as="select"
                    defaultValue="Sale Person"
                  >
                    <option>Person 1</option>
                    <option>Person 2</option>
                  </Form.Control>
                  <Form.Label>
                    <b>Month Wise</b>
                  </Form.Label>
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
        </Container>
      </Popover>
    </>
  );
}
