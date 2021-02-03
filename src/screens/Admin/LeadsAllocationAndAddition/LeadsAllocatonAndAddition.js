// import React from 'react';
import "./LeadsAllocatonAndAddition.css";
import { Container, Row, Col, Button } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/LAAadmin";
import "react-phone-number-input/style.css";
// import Select from "react-select";
import ReactTooltip from "react-tooltip";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

import { GET, POST, formatDate } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import {
  Backdrop,
  makeStyles,
  CircularProgress,
  MenuItem,
  Snackbar,
  Slide,
  Select,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { Label } from "@material-ui/icons";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";

export default function LeadsAllocatonAndAddition() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  var today = new Date();
  var datee = formatDate(today);
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const [date, setDate] = useState(formatDate(today));

  const [AllleadsToAllocate, setAllLeadsToAllocate] = useState([]);
  const [employeesToAllocateLeads, setEmployeesToAllocateLeads] = useState([]);

  const [select, setSelect] = React.useState([]);
  const [task, setTask] = useState("");
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };

  const [viewable, setViewable] = React.useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleDateValue = (value) => {
    setDate(formatDate(value));
    console.log(formatDate(value));
  };

  // var timee =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const classes = useStyles();

  useEffect(() => {
    getAllLeads();
    getAllEmployees();
  }, [refresh]);

  const getAllLeads = async () => {
    setIsLoading(true);

    let resp = await GET(ApiUrls.GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS);
    console.log(resp);

    if (resp.data != null) {
      // console.trace(JSON.stringify(resp));
      setAllLeadsToAllocate(resp.data.leads);
    }
    setIsLoading(false);
  };

  const getAllEmployees = async () => {
    let resp = await GET(ApiUrls.GET_ALL_EMPLOYEES);

    if (resp.data != null) {
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
      //  ;
      console.log({
        // time_to_call: time,
        dead_line: date,
        allocated_to: selectedEmployee,
        lead_id: item.id,
        task: item.project.category.name,
      });

      let resp = await POST(ApiUrls.UPDATE_LEAD_TO_USER, {
        // time_to_call: time,
        dead_line: date,
        allocated_to: selectedEmployee,
        lead_id: item.id,
        task: item.project.category.name,
      });
      console.log(resp);
      setRefresh(!refresh);
      setIsLoading(false);

      if (resp.error === false) {
        setMessage("LEAD UPDATED SUCCESSFULLY.");
        setShowSuccessAlert(true);
      }
      if (resp.error.hasOwnProperty("allocated_to")) {
        setMessage("LEAD NOT UPDATED. Allocated To FIELD IS REQUIRED");
        setShowErrorAlert(true);
      }
    };

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      setTime(res);
    };

    const handleDateValue = (value) => {
      const str = value.toString();

      // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
      setDate(formatDate(value));
    };
    return (
      <tr>
        <td>
          <input
            type="checkBox"
            checked={select.includes(item.id)}
            onChange={(e) => {
              setTask(item.project.category.name);
              HandleName(item.id);
            }}
          />
        </td>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>

        <td>{item.project.name}</td>
        <td>{item.budget}</td>
        {/* <td>
          <KeyboardTimePickerExample value={today} showTime={HandleTimeValue} />
        </td> */}

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
  const MultiLeadAssign = async (event) => {
    event.preventDefault();
    let postData = {
      lead_id: select,
      allocated_to: selectedEmployee,
      dead_line: date,
      task: task,
    };
    await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
      method: "post",
      mode: "no-cors",
      crossDomain: true,
      headers: {
        // "Content-Disposition": "attachment; filename=report.xlsx",
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    //  let res = await POST(
    //    ApiUrls.POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY,
    //    postData
    //  );
    //  setRefresh(!refresh);
    //   ;
    // setSelect([]);
    setViewable([]);
    //  let arr = data;
  };
  // console.trace("------------------", AllleadsToAllocate);
  const SelectData = async (event) => {
    event.preventDefault();
    let postData = {
      lead_id: select,
      allocated_to: selectedEmployee,
      task:task,
      dead_line: date,
    };
  
    let res = await POST(
      ApiUrls.POST_ADD_MULTIPLE_LEAD_ALLOCATION,
      postData
    );
    console.log("accepted",res)
    setRefresh(!refresh);
    setSelect([]);
    setViewable([]);
    // let arr = data;
  };
  return (
    <Container fluid>
      <Row className="shadow p-3 mb-2 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Leads Allocation and Addition</h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <SwipeableTemporaryDrawer />
          </div>
        </Col>
      </Row>
      <PreLoading startLoading={isLoading} />

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={message}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={message}
        closeError={setShowErrorAlert}
      />

      {select.length > 0 ? (
        <>
          <form onSubmit={MultiLeadAssign}>
            <Row className="shadow py-2  bg-white rounded mb-2 ">
              {/* <div className="col-lg-7"> */}

              <Col lg={6}>
                <div class="form-group">
                  <label for="selectEmployee">Select Employee</label>

                  <Select
                    id="selectEmployee"
                    disableUnderline
                    className="form-control form-control-sm w-100"
                    value={selectedEmployee}
                    onChange={(e) => {
                      console.log(
                        "select employee ID is -----",
                        e.target.value
                      );
                      setSelectedEmployee(e.target.value);
                    }}
                  >
                    {employeesToAllocateLeads.length > 0
                      ? employeesToAllocateLeads.map((emp) => (
                          <MenuItem key={emp.id} value={emp.id}>
                            {emp.first_name} {emp.last_name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
              </Col>
              {/* </div> */}

              <Col lg={6}>
                <div className="">
                  <label>Select_Deadline</label>
                </div>

                <div className="row">
                  <div className="w-50 px-2 mx-2">
                    <KeyboardDatePickerExample
                      value={date}
                      showDate={handleDateValue}
                    />
                  </div>

                  <div className="ml-3">
                    <button
                      className="btn btn-primary "
                      type="submit"
                      style={{ backgroundColor: "#2258BF" }}
                      // disabled={!select.every((v) => v === true)}

                      onClick={SelectData}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </>
      ) : null}
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                  {/* <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      TOC
                    </span>
                  </th> */}
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
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
