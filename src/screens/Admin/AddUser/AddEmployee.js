// import React from 'react';
import './AddEmployee.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import img2 from './../../../assests/tiwtr-2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import React , { useEffect, useState } from "react";

  


export default function AddEmployee() {
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   return (
    <Container fluid className="Laa">
      <h1>
    Employees Record
      </h1>
      <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faPlusSquare} /></button><span></span>
      <Row>
        <Col
          lg
          md="12"
          style={{ backgroundColor: 'white', borderRadius: '5px' }}
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
                <tr>
                  <th scope="row">1</th>
                  <td>Rabia</td>
                  <td>Rabia@gmail.com</td>
                  <td>
                      <select className="form-control form-control-sm">
                      <option>Employee</option>
                      <option>Admin</option>
                     
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faEye} /></button>
                    <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPencilAlt} /></button>
                    <button type="button" className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Atif</td>
                  <td>Atif@gmail.com</td>
                  <td>
                      <select className="form-control form-control-sm">
                      <option>Employee</option>
                      <option>Admin</option>
                     
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faEye} /></button>
                    <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPencilAlt} /></button>
                    <button type="button" className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Imtesal</td>
                  <td>Imtesa@gmail.com</td>
                  <td>
                      <select className="form-control form-control-sm">
                      <option>Employee</option>
                      <option>Admin</option>
                     
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={handleShow}><FontAwesomeIcon icon={faEye} /></button>
                    <button type="button" className="btn btn-success" onClick={handleShow}><FontAwesomeIcon icon={faPencilAlt} /></button>
                    <button type="button" className="btn btn-danger" onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              </tbody>
                  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
             </table>
          </div>
        </Col>
      </Row>
      
    </Container>
  ); 

  return (
    <>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}