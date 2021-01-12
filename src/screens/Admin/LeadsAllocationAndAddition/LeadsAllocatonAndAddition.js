// import React from 'react';
import "./LeadsAllocatonAndAddition.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";

import img2 from "./../../../assests/tiwtr-2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlineIcon } from "@material-ui/icons/DeleteOutline";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/LAAadmin";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import { Divider } from "antd";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";

import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";

export default function LeadsAllocatonAndAddition() {
  const [AllleadsToAllocate, setAllLeadsToAllocate] = useState([]);
  const [employeesToAllocateLeads, setEmployeesToAllocateLeads] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const [showAdd, setShowAdd] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [value, setValue] = useState();

  const [data, setData] = useState(ModalData);
  const [selectedID, setSelectedID] = useState(0);

  useEffect(() => {
    getAllLeads();
    getAllEmployees();
  }, []);

  const getAllLeads = async () => {
    let resp = await GET(ApiUrls.GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS);

    if (resp.data != null) {
      console.log("unallocated leads is ---------");
      console.log(JSON.stringify(resp));
      setAllLeadsToAllocate(resp.data.leads);
    }
  };

  const getAllEmployees = async () => {
    let resp = await GET(ApiUrls.GET_ALL_EMPLOYEES);

    if (resp.data != null) {
      console.log("All EMployeess are ---------");
      console.log(JSON.stringify(resp.data));
      setEmployeesToAllocateLeads(resp.data.users);
    }
  };
  const TableEmployee = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>

        <td>{item.id}</td>
        <td>{item.budget}</td>
        <td>
          <KeyboardTimePickerExample />
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
        <td>{"---------"}</td>

        <td>
          <select
            className="form-control form-control-sm w-100"
            value={selectedEmployee}
            onChange={(e) => {
              console.log("select employee ID is -----", e.target.value);
              setSelectedEmployee(e.target.value);
            }}
          >
            {employeesToAllocateLeads.length > 0
              ? employeesToAllocateLeads.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))
              : null}
          </select>
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
          {item.task != null ? item.task : "-------"}
          {/* <select className="form-control form-control-sm w-100">
            <option value={"sale"}>Sale</option>
            <option value={"rent"}>Rent</option>
            <option value={"other"}>Other</option>
          </select> */}
        </td>
        <td>
          <KeyboardDatePickerExample />
        </td>
        <td>{"------"}</td>
        <td>
          {" "}
          <button
            data-tip
            data-for="update"
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            Update
          </button>
          <ReactTooltip id="update" place="top" effect="solid">
            update
          </ReactTooltip>
        </td>
      </tr>
    );
  };
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

      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
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
                      <TableEmployee item={lead} index={index} />
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
