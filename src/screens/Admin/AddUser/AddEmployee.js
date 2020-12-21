// import React from 'react';
import "./AddEmployee.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import img2 from "./../../../assests/tiwtr-2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/modal";

export default function AddEmployee() {
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
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
          <h6>{item.id}</h6>

          <h6>{item.Name}</h6>

          <h6>{item.Email}</h6>

          <h6>{item.Type[0]}</h6>

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
            variant="secondary"
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
        <Modal.Body>
          <h6>ID</h6>
          <input placeholder={item.id} />
          <h6>Name</h6>
          <input placeholder={item.Name} />
          <h6> Email</h6>
          <input placeholder={item.Email} />
          <h6>Type</h6>
          <input placeholder={item.Type[0]} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowEdit(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
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
          <input placeholder="Enter Id"></input>
          <h6>Name</h6>
          <input placeholder="Enter Name"></input>
          <h6>Email</h6>
          <input placeholder="Enter Email"></input>
          <h6>Type</h6>
          <select className="form-control form-control-sm">
            <option>Employee</option>
            <option>Admin</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAdd(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
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
  const TableEmployee = ({ item }) => {
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.Name}</td>
        <td>{item.Email}</td>
        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Type.map((Type) => (
              <option>{Type}</option>
            ))}
          </select>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setShowView(true);
              setSelectedID(item.id);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setShowEdit(true);
              setSelectedID(item.id);
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setShowDelete(true);
              setSelectedID(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <h1>Employees Record</h1>
      <button
        type="button"
        className="btn btn-primary"
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return <TableEmployee item={item} />;
                })}
              </tbody>
              <ModalAdd item={data[selectedID]} />
              <ModalDelete item={data[selectedID]} />
              <ModalView item={data[selectedID]} />
              <ModalEdit item={data[selectedID]} />
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
