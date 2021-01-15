// import React from 'react';
import "./LeadsAllocatonAndAddition.css";
import { Container, Row, Col, Button } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/LAAadmin";
import "react-phone-number-input/style.css";
import Select from "react-select";
import ReactTooltip from "react-tooltip";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import {
  Backdrop,
  makeStyles,
  CircularProgress,
  MenuItem,
  Snackbar,
  Slide,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";

export default function LeadsAllocatonAndAddition() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);

  const [AllleadsToAllocate, setAllLeadsToAllocate] = useState([]);
  const [employeesToAllocateLeads, setEmployeesToAllocateLeads] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [value, setValue] = useState();
  const [viewable, setViewable] = React.useState([]);

  const [data, setData] = useState(ModalData);
  const [selectedID, setSelectedID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelect] = React.useState([]);
  const [Employees, setEmployees] = React.useState([
    { label: "Sana", value: "Sana" },
    { label: "Atif", value: "Atif" },
    { label: "Ali", value: "Ali" },
    { label: "Imtesal", value: "Imtesal" },
    { label: "Rabia", value: "Rabia" },
    { label: "Qasim", value: "Qasim" },
  ]);
  const handleSelectDate = (value) => {
    console.log(value);
  };
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };
  const handleEmployeeName = async () => {
    let res = await GET(ApiUrls.GET_ALL_EMPLOYEES);
    console.log(res, "hashmi");
    if (res.success != false) {
      // setViewable(res.data.users.data);
      let arr = [];
      res.data.users.map((item) => {
        arr.push({ label: item.first_name, value: item.id });
      });
      setEmployees(arr);
    }
  };
  console.log(Employees, "hashmi");
  React.useEffect(() => {
    handleEmployeeName();
  }, []);
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  var today = new Date();
  var datee = formatDate(today);

  var timee =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
  }));
  const handleClose = () => {
    setShowAlert(false);
    setErrorAlert(false);
  };

  const classes = useStyles();

  useEffect(() => {
    getAllLeads();
    getAllEmployees();
  }, []);

  const getAllLeads = async () => {
    setIsLoading(true);

    let resp = await GET(ApiUrls.GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS);

    if (resp.data != null) {
      console.log("unallocated leads is ---------");
      // console.trace(JSON.stringify(resp));
      setAllLeadsToAllocate(resp.data.leads);
    }
    setIsLoading(false);
  };

  const getAllEmployees = async () => {
    let resp = await GET(ApiUrls.GET_ALL_EMPLOYEES);

    if (resp.data != null) {
      console.log("All EMployeess are ---------");
      console.log(JSON.stringify(resp.data));
      setEmployeesToAllocateLeads(resp.data.users);
    }
  };

  const LeadsAllocationAndAdditionTable = ({ item, index, leads }) => {
    const [time, setTime] = useState(timee);
    const [date, setDate] = useState(datee);
    const [selectedEmployee, setSelectedEmployee] = useState();

    const handlePostUpdate = async () => {
      setIsLoading(true);

      // setAllLeadsToAllocate((state) => {
      //   const temp = [...state];
      //   const objectChange = temp[index];
      //   objectChange.time_to_call = time;
      //   objectChange.dead_line = date;
      //   objectChange.allocated_to = selectedEmployee;
      //   objectChange.lead_id = item.id;
      //   objectChange.task = item.project.category.name;
      //   temp[index] = { ...objectChange };
      //   formData = { ...objectChange };
      //   return temp;
      // });
      // console.log("statee-----------", newformData);

      let resp = await POST(ApiUrls.UPDATE_LEAD_TO_USER, {
        time_to_call: time,
        dead_line: date,
        allocated_to: selectedEmployee,
        lead_id: item.id,
        task: item.project.category.name,
      });
      setIsLoading(false);

      if (resp.error === false) {
        setShowAlert(true);
      }
      if (resp.error.hasOwnProperty("allocated_to")) {
        setErrorAlert(true);
      }
      console.log("Receving data after submission-----------------");
      console.log(JSON.stringify(resp.data));
    };

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      console.log(res);
      setTime(res);
    };

    const handleDateValue = (value) => {
      const str = value.toString();

      // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
      setDate(formatDate(value));
      console.log(formatDate(value));
    };
    return (
      <tr>
        <td>
          <input
            type="checkBox"
            checked={select.includes(index)}
            onChange={(e) => {
              console.log("sana imtesal");
              HandleName(index);
            }}
          />
        </td>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>

        <td>{item.project.name}</td>
        <td>{item.budget}</td>
        <td>
          <KeyboardTimePickerExample value={today} showTime={HandleTimeValue} />
        </td>

        <td>{item.source}</td>
        <td>{item.country_city}</td>
        <td>
          {item.status != "" ? item.status : "------"}
          {/* <select className="form-control form-control-sm w-100">
            <option value={"sold"}>Sold</option>
            <option value={"open"}>Open</option>
            <option value={"onhold"}>On Hold</option>
          </select> */}
        </td>
        <td>
          {item.returned_allocations.length > 0
            ? item.returned_allocations[0].returned_from.first_name
            : "------"}
        </td>

        <td>
          <Select
            className="form-control form-control-sm w-100"
            value={selectedEmployee}
            onChange={(e) => {
              console.log("select employee ID is -----", e.target.value);
              setSelectedEmployee(e.target.value);
            }}
          >
            {leads.length > 0
              ? leads.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </td>
        {/* <td>
          <select className="form-control form-control-sm w-100">
            <option value={"Rabia"}>Rabia</option>
            <option value={"sana"}>Sana</option>
            <option value={"atif"}>Atif</option>
            <option value={"ali"}>Ali</option>
          </select>
        </td> */}

        <td>
          {item.project.category.name}
          {/* {item.task != null ? item.task : "-------"} */}
          {/* <select className="form-control form-control-sm w-100">
            <option value={"sale"}>Sale</option>
            <option value={"rent"}>Rent</option>
            <option value={"other"}>Other</option>
          </select> */}
        </td>
        <td>
          <KeyboardDatePickerExample value={today} showDate={handleDateValue} />
        </td>
        <td>{"------"}</td>
        <td>
          {" "}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePostUpdate()}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            Update
          </button>
        </td>
      </tr>
    );
  };
  const SelectData = async (event) => {
    //  event.preventDefault();
    //  let postData = {
    //    inventory_ids: select,
    //    user_ids: viewable.map((item) => item.value),
    //  };
    //  console.log(postData);
    //  let res = await POST(
    //    ApiUrls.POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY,
    //    postData
    //  );
    //  setRefresh(!refresh);
    //  console.log(res);
    setSelect([]);
    setViewable([]);
    //  let arr = data;
  };
  // console.trace("------------------", AllleadsToAllocate);
  return (
    <Container fluid>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Leads Allocation and Addition</h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <SwipeableTemporaryDrawer />
          </div>
        </Col>
      </Row>
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      {showAlert == true ? (
        <Slide in={showAlert} direction="up">
          <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="success">
              <AlertTitle>Success</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Lead Updated Sucessfully
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}
      {errorAlert == true ? (
        <Slide in={errorAlert} direction="up">
          <Snackbar
            open={errorAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                The allocated to field is required.
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}

      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <Container fluid>
            <Row>
              {select.length > 0 ? (
                <>
                  <div className="col-lg-7">
                    <Select
                      // disabled={!select.every((v) => v === true)}
                      options={Employees}
                      onChange={(opt) => {
                        console.log(opt, "imtesal");
                        if (opt != null) setViewable(opt);
                        else setViewable([]);
                      }}
                      onClick={(e) => {
                        HandleName(0);
                      }}
                    />
                  </div>
                  <div
                    className="col-lg-3 ml-4 w-100"
                    style={{
                      border: " 1px solid #B3B3B3",
                      borderRadius: "4px",
                    }}
                  >
                    <KeyboardDatePickerExample
                      value={today}
                      showDate={handleSelectDate}
                    />
                  </div>
                  <div>
                    <button
                      className="col-lg-12 btn btn-primary ml-3"
                      type="submit"
                      style={{ backgroundColor: "#2258BF" }}
                      // disabled={!select.every((v) => v === true)}

                      onClick={SelectData}
                    >
                      save
                    </button>
                  </div>
                </>
              ) : null}
            </Row>
          </Container>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Select
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      ID
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Clients
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Contacts
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Project
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Budget
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      TOC
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Source
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Country/City
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Status
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Interest
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      {" "}
                      Allocate/Re_Allocate
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Task
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Deadline
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Returned_From
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Update_Record
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllleadsToAllocate.length > 0
                  ? AllleadsToAllocate.map((lead, index) => (
                      <LeadsAllocationAndAdditionTable
                        item={lead}
                        index={index}
                        leads={employeesToAllocateLeads}
                      />
                    ))
                  : null}
                {/* {data.map((item, index) => {
                  return <TableEmployee item={item} index={index} />;
                })} */}
              </tbody>
              {data.length > 0 ? <></> : null}
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
