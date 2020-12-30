import React from "react";
import "./LeadsAdmin.css";
import { Container, Row, Col } from "react-bootstrap";
import { KeyboardDatePickerExample } from "../../../utils/KeyboardTimePickerExample";
export default function LeadsAdmin() {
  return (
    <Container fluid className="Laa">
      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>Leads</h3>
      </div>
      <div class="col-lg-12 shadow p-3  bg-white rounded ">
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
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        ID
                      </span>
                    </th>

                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Clients
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Contacts
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Budget
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        TOC
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Country/City
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Allocate_To
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Email
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Task
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Deadline
                      </span>
                    </th>
                    <th scope="col">
                      <span id="st" style={{ color: "#818181" }}>
                        Recordings
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Rabia</option>
                        <option>Atif</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Rabia</option>
                        <option>Atif</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
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
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>
                      <select className="form-control form-control-sm">
                        <option>5 Marla Residential</option>
                        <option>3 marla Rent</option>
                        <option>10 marla Plot</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
                    </td>
                    <td>Rabia@gmail</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Pending</option>
                      </select>
                    </td>
                    <td>
                      <KeyboardDatePickerExample />
                    </td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Recording 1</option>
                        <option>Recording 2</option>
                        <option>Recording 3</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
