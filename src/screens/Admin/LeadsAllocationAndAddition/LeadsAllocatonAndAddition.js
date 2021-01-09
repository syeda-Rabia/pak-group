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
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import { Divider } from "antd";

export default function LeadsAllocatonAndAddition() {
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [value, setValue] = useState();

  const [data, setData] = useState(ModalData);
  const [selectedID, setSelectedID] = useState(0);

  const ModalView = ({ item }) => {
    return (
      <Modal
        show={showView}
        onHide={() => {
          setShowView(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Lead Record</Modal.Title>
        </Modal.Header>
        <div class="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
                className=""
              >
                {/* <div> */}
                <div className="">
                  <div className="pb-3">
                    <h6>Name </h6>
                    <input
                      className="form-control  input-width w-100"
                      value={item.Name}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Contact</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Contact}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Project</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Project}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Budget</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Budget}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Toc</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Toc}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Source</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Source}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Country</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Country}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="pb-3">
                    <h6>Status</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Status}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Interest</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Interest}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Allocated To</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Allocate}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Task</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Task}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Deadline</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Deadline}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Returned From</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Returned}
                    />
                  </div>
                </div>
                {/* <label>ID</label>
          <input type="number">{item.id}</input>
          <label>Name</label>
          <input type="name">{item.Name}</input>
          <label>Email</label>
          <input type="email">{item.Email}</input>
          <label>Type</label>
          <input type="type">{item.Type}</input> */}
                {/* </div> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowView(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    );
  };

  const ModalEdit = ({ item }) => {
    const [client, setClient] = useState(item.Name);
    const [contact, setContact] = useState(item.Contact);
    const [project, setProject] = useState(item.Project);
    const [budget, setBudget] = useState(item.Budget);
    const [toc, setToc] = useState(item.Toc);
    const [source, setSource] = useState(item.Source);
    const [country, setCountry] = useState(item.Country);
    const [status, setStatus] = useState(item.Status);
    const [interest, setInterest] = useState(item.Interest);
    const [allocate_to, setAllocate] = useState(item.Allocate);
    const [task, setTask] = useState(item.Task);
    const [deadline, setDeadline] = useState(item.Deadline);
    const [returned_from, setReturned] = useState(item.Returned);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      console.log("SendRecordToServer", event);
      // add validations
      // push

      let user = {
        id: item.id,
        Name: client,
        Contact: contact,
        Project: project,
        Budget: budget,
        Toc: toc,
        Source: source,
        Country: country,
        Status: status,
        Interest: interest,
        Allocate: allocate_to,
        Task: task,
        Deadline: deadline,
        Returned: returned_from,
      };

      let arr = data;
      arr.push(user);
      setData(arr);
      setShowAdd(false);
    };
    const EditRecordToServer = (event) => {
      event.preventDefault();

      console.log("EditRecordToServer", event);
      // add validations
      // push

      let user = {
        // id: item.id,
        // Name: client,
        // Contact: contact,
        // Project: project,
        // Budget: budget,
        // Toc: toc,
        // Source: source,
        // Country: country,
        // Status: status,
        // Interest: interest,
        // Allocate: allocate_to,
        // Task: task,
        // Deadline: deadline,
        // Returned: returned_from,
      };

      let arr = data.map((val) => {
        if (val.id == user.id) val = user;
        return val;
      });

      // arr.push(user);
      setData(arr);
      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Employee</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div class="col-lg-12 shadow  bg-white rounded ">
            <Modal.Body>
              <form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                  className=""
                >
                  <div>
                    <div className="pb-3">
                      <h6>Client</h6>
                      <input
                        className="form-control input-width w-100 "
                        type="text"
                        minLength="3"
                        maxLength="10"
                        value={client}
                        onChange={(e) => {
                          setClient(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Contact</h6>
                      <input
                        className="form-control input-width w-100 "
                        placeholder="Enter Contact"
                        type="text"
                        minLength="0"
                        maxLength="10"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Project</h6>
                      <select
                        value={project}
                        onChange={(e) => {
                          setProject(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"LDA"}>LDA City</option>
                        <option value={"DHA"}>DHA </option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>Budget</h6>
                      <input
                        className="form-control input-width w-100"
                        placeholder="Enter Budget"
                        type="email"
                        value={budget}
                        onChange={(e) => {
                          setBudget(e.target.value);
                        }}
                      />
                    </div>

                    <div className="pb-3">
                      <h6>Time-To Call</h6>
                      <div className=" w-100">
                        <KeyboardTimePickerExample
                          value={toc}
                          onChange={(e) => {
                            setToc(e.target.value);
                            console.log(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="pb-3">
                      <h6>Source</h6>
                      <select
                        value={source}
                        onChange={(e) => {
                          setSource(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"Newspaper"}>News Paper</option>
                        <option value={"Tv"}>Tv</option>
                        <option value={"sms"}>SMS</option>
                        <option value={"personal reference"}>
                          Personal Reference
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="pb-3">
                      <h6>Country/city</h6>
                      <input
                        className="form-control input-width w-100"
                        placeholder="Enter Country"
                        type="email"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Status</h6>
                      <select
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"graceperiod"}>Grace Period</option>
                        <option value={"Overdue"}>Over Due</option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>Interest</h6>
                      <select
                        value={interest}
                        onChange={(e) => {
                          setInterest(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"5marla"}>5 Marla</option>
                        <option value={"10marla"}>10 Marla</option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>Allocate To</h6>
                      <select
                        value={allocate_to}
                        onChange={(e) => {
                          setAllocate(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"Atif"}>Atif</option>
                        <option value={"Rabia"}>Rabia</option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>Task</h6>
                      <select
                        value={task}
                        onChange={(e) => {
                          setTask(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"Sale"}>Sale</option>
                        <option value={"rent"}>Rent</option>
                        <option value={"other"}>other</option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>DeadLine</h6>
                      <div className=" w-100">
                        <KeyboardDatePickerExample
                          style={{
                            border: "",
                          }}
                          value={deadline}
                          onChange={(e) => {
                            setDeadline(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className="pb-3">
                  <h6>returned From</h6>
                  <select
                    value={returned_from}
                    onChange={(e) => {
                      setReturned(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <option value={"Rabia"}>Rabia</option>
                    <option value={"Ali"}>Ali</option>
                    <option value={"Atif"}>Atif</option>
                  </select>
                </div> */}
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Close
              </Button>

              <Button
                type="submit"
                value="Submit"
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowAdd(false);
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = (item) => {
      console.log("item is ", item);

      let { id } = item;
      console.log("ID is ", id);

      let arr = data;

      arr = arr.filter((user) => user.id != id.toString());

      console.log("arr length ", arr.length, arr, selectedID);
      setSelectedID((state) => {
        if (state == arr.length) return state - 1;
        return state;
      });
      setData(arr);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Delete Record</Modal.Title>
        </Modal.Header>
        <div class="col-lg-12 shadow p-3  bg-white rounded ">
          <Modal.Body>Do you really want to delete this Record!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                DeleteRecordFromData(item);
                setShowDelete(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  const TableEmployee = ({ item, index }) => {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.Name}</td>
        <td>{item.Contact}</td>

        <td>{item.Project}</td>
        <td>{item.Budget}</td>
        <td>
          <KeyboardTimePickerExample />
        </td>

        <td>{item.Source}</td>
        <td>{item.Country}</td>
        <td>
          <select className="form-control form-control-sm w-100">
            <option value={"sold"}>Sold</option>
            <option value={"open"}>Open</option>
            <option value={"onhold"}>On Hold</option>
          </select>
        </td>
        <td>{item.Interest}</td>
        <td>
          <select className="form-control form-control-sm w-100">
            <option value={"Rabia"}>Rabia</option>
            <option value={"sana"}>Sana</option>
            <option value={"atif"}>Atif</option>
            <option value={"ali"}>Ali</option>
          </select>
        </td>

        <td>
          <select className="form-control form-control-sm w-100">
            <option value={"sale"}>Sale</option>
            <option value={"rent"}>Rent</option>
            <option value={"other"}>Other</option>
          </select>
        </td>
        <td>
          <KeyboardDatePickerExample />
        </td>
        <td>{item.Returned}</td>
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

        <td>
          <div className="d-flex d-inline">
            <button
              data-tip
              data-for="ViewTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            <ReactTooltip id="ViewTip" place="top" effect="solid">
              View Details
            </ReactTooltip>
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2 ml-2"
              onClick={() => {
                setShowEdit(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip>
            <button
              data-tip
              data-for="DeleteTip"
              type="button"
              className="bg-transparent  button-focus ml-2"
              onClick={() => {
                setShowDelete(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Container
      fluid
      className="Laa"
      // style={{
      //   // backgroundColor: 'red',
      //   margin: "auto",
      //   width: "100%",
      //   // border: '3px solid green',
      //   padding: "10px",
      //   marginTop: "10px",
      // }}
    >
      <Row>
        <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
          <h3 style={{ color: "#818181" }}>Leads Allocation And Addition</h3>
        </div>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <span></span>

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
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return <TableEmployee item={item} index={index} />;
                })}
              </tbody>
              {data.length > 0 ? (
                <>
                  <ModalDelete item={data[selectedID]} />
                  <ModalView item={data[selectedID]} />
                  <ModalEdit item={data[selectedID]} />
                </>
              ) : null}
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
