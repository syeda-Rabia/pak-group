import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Popover from "@material-ui/core/Popover";

import { Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Select, Container } from "@material-ui/core";

import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
  YearPicker,
  MonthPicker,
} from "../../utils/KeyboardTimePickerExample";

import { GET, POST, getDays } from "../../utils/Functions";
import DatePick, { YearPicking } from "../../utils/YearPicker";
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
  console.log(`-------------------------------------->`,props);
  console.log(
    window.location.href.split("/")[window.location.href.split("/").length - 1],
    "location+++++++++++++++++++++++++++"
  );
  let endpoint = window.location.href
    .split("/")
    [window.location.href.split("/").length - 1].toLocaleLowerCase();
  const classes = useStyles();
  const [allProjects, setAllProjects] = useState([]);
  const [employees, setEmployees] = React.useState("");
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [client, setClient] = React.useState([]);
  const [project, setProject] = useState("");
  const [monthErr, setmonthErr] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [days, setDays] = useState({
  //   day: new Date().getDate(),
  //   month: new Date().getMonth() + 1,
  //   year: new Date().getFullYear(),
  // });
  const [days, setDays] = useState({
    day: "",
    month: "",
    year: "",
  });
  // const [month, setMonth] = useState();
  console.log(days, employees, project);
  const [year, setYear] = useState();
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
    console.log("employessss__________>",res);
    // ;
    
      if (res.data != null) {
        setAllEmployees(res.data.users.data);
      }
   
  };
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (anchorEl == null && props.update != undefined) props.update("", false);
  }, [anchorEl]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDays({
      day: "",
      month: "",
      year: "",
    });
    setProject("");
    setEmployees("");
  };
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    let formData = { 
      client_name: employees,
      project_id: project,
      year: days.year,
      month: days.month,
      day: days.day,
    };
    let url = "";
    if (endpoint == "leads") {
      url =
        ApiUrls.GET_LEAD_ALLOCATION_FILTER_DATA +
        `?emp_name=${employees}&&project_id=${project}&&year=${days.year}&&month=${days.month}&& day=${days.day}&&filterType=All`;
    }

    if (endpoint == "leadsallocation") {
      url =
        ApiUrls.GET_LEAD_ALLOCATION_FILTER_DATA +
        `?emp_name=${employees}&&project_id=${project}&&year=${days.year}&&month=${days.month}&& day=${days.day}&&filterType=getNonAllocatedLeads`;
    }
    console.log("------------", url);
    if (props.update != undefined) props.update(url, true);
    // let resp = await GET(ApiUrls.GET_FILTER_DATA+`?client_name=${client}&&project_id=${project}&&year=${days.year}&&month=${days.month}&& day=${days.day}`);
    // console.log("---------filter response--------------",resp);
    // console.log(resp);
    // if(resp.success!=false)
    // setRefresh(!refresh);
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
                    className="w-100"
                    style={{ overflowY: "scroll" }}
                    controlid="projectName"
                    as="select"
                    defaultValue="project name"
                    value={project}
                    onChange={(e) => {
                      console.log("select project ID is -----", e.target.value);
                      setProject(e.target.value);
                    }}
                  >
                    <option>{null}</option>
                    {allProjects.length > 0
                      ? allProjects.map((pro) => (
                          <option
                            style={{ color: "#2258BF" }}
                            key={pro.id}
                            value={pro.id}
                          >
                            {pro.name}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                  <Form.Label>
                    <b>Date wise</b>
                  </Form.Label>

                  <Form.Control
                    className="w-100"
                    controlid="date"
                    as="select"
                    defaultValue="Date Wise"
                    onChange={(val) => {
                      console.log("select days ID is -----", val.target.value);
                      setDays((state) => {
                        return { ...state, day: val.target.value };
                      });
                    }}
                  >
                    <option>{null}</option>
                    {/* {date.map((d) => (
                      <option>{d}</option>
                    ))} */}
                    {Array.from(
                      { length: new Date(days.year, days.month, 0).getDate() },
                      (v, i) => {
                        return (
                          <option style={{ color: "#2258BF" }}>{i + 1}</option>
                        );
                      }
                    )}
                  </Form.Control>
                  <Form.Label>
                    <b>Year Wise</b>
                  </Form.Label>
                  <div className="form-control w-100">
                    {/* <YearPicker setDays={setDays}/> */}
                    <YearPicking controlid="year" setDays={setDays} />
                  </div>

                  {/* <Form.Control
                    controlid="year"
                    as="select"
                    defaultValue="Year Wise"
                   
                    
                  >
                   
                     <option>{null}</option>
                    <option>2021</option>
                    <option>2022</option>
                  </Form.Control> */}
                </Form.Group>
              </Col>
              {/* <DatePick/> */}
              <Col>
                <Form.Group>
                  <Form.Label>
                    <b>Sale Person</b>
                  </Form.Label>
                  <Form.Control
                    className="w-100"
                    controlid="Sale Person"
                    as="select"
                    value={employees}
                    onChange={(e) => {
                      console.log("select client ID is -----", e.target.value);
                      setEmployees(e.target.value);
                    }}
                  >
                    <option>{null}</option>
                    {allEmployees.length > 0
                      ? allEmployees.map((e) => (
                          <option
                            style={{ color: "#2258BF" }}
                            key={e.id}
                            value={e.id}
                          >
                            {e.first_name}
                            {/* {e.first_name + " " + e.last_name} */}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                  <Form.Label>
                    <b>Month Wise</b>
                  </Form.Label>
                  <div className="form-control w-100">
                    <DatePick
                      controlid="month"
                      setDays={setDays}
                      //  {...days.day!= "" && days.month === ""? (
                      //    setmonthErr(true)
                      //   ):setmonthErr(false)
                      // }
                    />
                    {days.day != "" && days.month == "" ? (
                      
                      <small
                        className="form-text  text-red"
                        style={{ color: "red" }}
                      >
                        *This field is required
                      </small>
                    ) : null}
                  </div>

                  {/* <Form.Control
                    controlid="month"
                    as="select"
                    defaultValue="Month Wise"
                    onChange={(val) => {
                      console.log(
                        "select days ID is -----",
                        val.target.value
                      );
                      setDays((state) => {
                        return { ...state, month: val.target.value };
                      });
                    }}
                  >
                     <option>{null}</option>
                    {Array.from({ length: 12 }, (v, i) => {
                      return <option style={{color:"#2258BF"}}>{i + 1}</option>;
                    })}
                  </Form.Control> */}

                  {days.day != "" && days.month == "" ? (
                    <Form.Control
                      className="w-100"
                      style={{
                        marginTop: "32px",
                        backgroundColor: "#5E85D0",
                        color: "white",
                      }}
                      disabled
                      controlid="year"
                      as="button"
                      defaultValue=""
                      
                    >
                      Search
                    </Form.Control>
                  ) : (
                    <Form.Control
                      className="w-100"
                      style={{
                        marginTop: "32px",
                        backgroundColor: "#2258BF",
                        color: "white",
                      }}
                      // disabled
                      controlid="year"
                      as="button"
                      defaultValue=""
                      onClick={(e) => {
                        SendRecordToServer(e);
                        handleClose();
                      }}
                    >
                      Search
                    </Form.Control>
                  )}
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
