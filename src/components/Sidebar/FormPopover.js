import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Popover from "@material-ui/core/Popover";

import { Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";

import { GET, POST, getDays } from "../../utils/Functions";
import ApiUrls from "../../utils/ApiUrls";
import _ from "lodash";

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
  const [allProjects, setAllProjects] = useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [days, setDays] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  useEffect(() => {
    getProjectDetails();
    getEmployeeDetails();
  }, []);
  const getProjectDetails = async () => {
    let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

    if (resp.data != null) {
      setAllProjects(resp.data.projects.data);
    }
  };
  const getEmployeeDetails = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    console.log(res);
    // ;
    try {
      if (res.success !== false) {
        setEmployees(res.data.users.data);
      }
    } catch {}
  };
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // console.log(getDays(new Date(), 31));
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
                    style={{ overflowY: "scroll" }}
                    controlId="projectName"
                    as="select"
                    defaultValue="Project Name"
                  >
                    {allProjects.length > 0
                      ? allProjects.map((pro) => (
                          <option key={pro.id} value={pro.id}>
                            {pro.name}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                  <Form.Label>
                    <b>Date wise</b>
                  </Form.Label>
                  <Form.Control
                    controlId="date"
                    as="select"
                    defaultValue="Date Wise"
                  >
                    {/* {date.map((d) => (
                      <option>{d}</option>
                    ))} */}
                    {Array.from(
                      { length: new Date(days.year, days.month, 0).getDate() },
                      (v, i) => {
                        return <option>{i + 1}</option>;
                      }
                    )}
                  </Form.Control>
                  <Form.Label>
                    <b>Year Wise</b>
                  </Form.Label>
                  <Form.Control
                    controlId="year"
                    as="select"
                    defaultValue="Year Wise"
                  >
                    <option>2021</option>
                    <option>2022</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    <b>Sale Person</b>
                  </Form.Label>
                  <Form.Control controlId="Sale Person" as="select">
                    {employees.length > 0
                      ? employees.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.first_name + " " + e.last_name}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                  <Form.Label>
                    <b>Month Wise</b>
                  </Form.Label>
                  <Form.Control
                    controlId="month"
                    as="select"
                    defaultValue="Month Wise"
                    onChange={(val) => {
                      setDays((state) => {
                        return { ...state, month: val.target.value };
                      });
                    }}
                  >
                    {Array.from({ length: 12 }, (v, i) => {
                      return <option>{i + 1}</option>;
                    })}
                  </Form.Control>
                  <Form.Control
                  style={{marginTop:"32px",backgroundColor:"#2258BF",color:"white"}}
                    controlId="year"
                    as="button"
                    defaultValue=""
                  >
                    Search
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
