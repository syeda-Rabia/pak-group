import React from "react";
import "./LeadsAllocatonAndAddition.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

export default function LeadsAllocatonAndAddition() {
  return (
    <Container fluid className="Laa ">
      <div className="col-lg-12 shadow p-1 mb-3 bg-white rounded mt-5">
        <h1>Leads Allocation and Addition</h1>
      </div>
      <Row>
        <Col lg="12" style={{ backgroundColor: "white", borderRadius: "5px" }}>
          <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
            <div className="table-responsive">
              <table className="table table-hover" style={{ display: "block" }}>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Clients</th>
                    <th scope="col">Contacts</th>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">TOC</th>
                    <th scope="col">Source</th>
                    <th scope="col">Country/City</th>
                    <th scope="col">Status</th>
                    <th scope="col">Interest</th>
                    <th scope="col">Allocate To</th>
                    <th scope="col">Task</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Returned From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td className="noWrap">Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <input placeholder="400 PKR" className="form-control" />
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "10px",
                          marginRight: "60px",
                          width: "100%",
                        }}
                      >
                        <KeyboardTimePickerExample />
                      </div>
                    </td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>London</td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>20 Marla</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <div
                        style={{
                          marginLeft: "15px",
                          marginRight: "70px",
                          width: "100%",
                        }}
                      >
                        <KeyboardDatePickerExample />
                      </div>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
