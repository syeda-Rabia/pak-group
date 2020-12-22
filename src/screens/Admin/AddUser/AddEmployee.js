// import React from 'react';
import "./AddEmployee.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import img2 from "./../../../assests/tiwtr-2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {DeleteOutlineIcon} from "@material-ui/icons/DeleteOutline";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/modal";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function AddEmployee() {
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
        <Modal.Header closeButton>
          <Modal.Title>Employee Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ alignContent: "center" }}>
            <h6>ID</h6>
            <input className="form-control input-width" value={item.id} />

            <h6>First Name </h6>
            <input className="form-control input-width" value={item.Name} />

            <h6>Last name</h6>
            <input
              className="form-control input-width"
              value={item.Last_Name}
            />

            <h6>Email</h6>
            <input className="form-control input-width" value={item.Email} />

            <h6>Gender</h6>
            <input
              className="form-control input-width"
              value={item.Gender[0]}
            />

            <h6>Contact</h6>
            <input className="form-control input-width" value={item.Contact} />

            <h6>Type</h6>
            <input className="form-control input-width" value={item.Type[0]} />
        
          </div>
          {/* <label>ID</label>
          <input type="number">{item.id}</input>
          <label>Name</label>
          <input type="name">{item.Name}</input>
          <label>Email</label>
          <input type="email">{item.Email}</input>
          <label>Type</label>
          <input type="type">{item.Type}</input> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{backgroundColor:"#2258BF"}}
            onClick={() => {
              setShowView(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const ModalEdit = ({ item }) => {
    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <h6>ID</h6>
          <input className="form-control input-width" value={item.id} />
          <h6>First Name</h6>
          <input className="form-control input-width" value={item.Name} />
          <h6>Last Name</h6>
          <input className="form-control input-width" value={item.Last_Name} />
          <h6> Email</h6>
          <input className="form-control input-width" value={item.Email} />
          <h6>Gender</h6>
          <select class="form-control form-control-sm input-width">
            <option>{item.Gender[0]}</option>
            <option>{item.Gender[1]}</option>
          </select>
          <h6> Contact</h6>
          <input className="form-control input-width" value={item.Contact} />
          <h6>Type</h6>
          <select class="form-control form-control-sm input-width">
            <option>{item.Type[0]}</option>
            <option>{item.Type[1]}</option>
          </select>
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
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowEdit(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
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
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const ModalBan = ({ item }) => {
    return (
      <Modal
        show={showBan}
        onHide={() => {
          setShowBan(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Block User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to Block this Employee!</Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowBan(false);
            }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowBan(false);
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const ModalAdd = ({ item }) => {
    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>ID</h6>
          <input
            className="form-control input-width"
            placeholder="Enter Id"
          ></input>
          <h6>First Name</h6>
          <input
            className="form-control input-width"
            placeholder="Enter First Name"
          ></input>
          <h6>Email</h6>
          <input
            className="form-control input-width"
            placeholder="Enter Email"
          ></input>
          <h6>Gender</h6>
          <select className="form-control form-control-sm">
            <option>Male</option>
            <option>Female</option>
          </select>
          <h6>Contact</h6>
          <PhoneInput
            className="form-control input-width"
            placeholder="Enter contact number"
            value={value}
            onChange={setValue}
          ></PhoneInput>
          <h6>Type</h6>
          <select className="form-control form-control-sm">
            <option>Employee</option>
            <option>Admin</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowAdd(false);
            }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowAdd(false);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const TableEmployee = ({ item, index }) => {
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.Name}</td>
        <td>{item.Last_Name}</td>

        <td>{item.Email}</td>
        <td>{item.Gender[0]}</td>
        <td>{item.Contact}</td>

        <td>{item.Type[0]}</td>
        <td>
          <div className="d-flex d-inline">
            <button
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            <button
              type="button "
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowEdit(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <button
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowDelete(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <button
              type="button "
              className="bg-transparent  button-focus mr-2 button-bg "
              onClick={() => {
                setShowBan(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faBan} />
            </button>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <h1>Employees Record</h1>
      <button
        type="button"
        className="btn btn-primary "
        onClick={() => {
          setShowAdd(true);
        }}
      >
        <FontAwesomeIcon icon={faPlusSquare} />
      </button>
      <span></span>
      <Row>
        <Col
          lg
          md="12"
          style={{ backgroundColor: "white", borderRadius: "5px" }}
        >
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return <TableEmployee item={item} index={index} />;
                })}
              </tbody>
              <ModalAdd item={data[selectedID]} />
              <ModalDelete item={data[selectedID]} />
              <ModalView item={data[selectedID]} />
              <ModalEdit item={data[selectedID]} />
              <ModalBan item={data[selectedID]} />
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
