import React from "react";
import "./EmployeeLeads.css";
import { Container, Row, Col } from "react-bootstrap";
import { KeyboardDatePickerExample } from "../../../utils/KeyboardTimePickerExample";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
export default function EmployeeLeads() {
  return (
    <Container fluid className="Laa">
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>Leads</h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table id="leadsTable" className="table table-hover">
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
                    <td>Rabia</td>
                    <td>contact</td>
                    <td>Project Name</td>
                    <td>400 PKR</td>
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>5 Marla Residential</td>
                    <td>Atif</td>
                    <td>Rabia@gmail</td>
                    <td>Sale</td>
                    <td>04/01/2021</td>
                    <td>Recording 2</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>Rabia</td>
                    <td>contact</td>
                    <td>Project Name</td>
                    <td>400 PKR</td>
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>5 Marla Residential</td>
                    <td>Atif</td>
                    <td>Rabia@gmail</td>
                    <td>Sale</td>
                    <td>04/01/2021</td>
                    <td>Recording 2</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>Rabia</td>
                    <td>contact</td>
                    <td>Project Name</td>
                    <td>400 PKR</td>
                    <td>10:00 PM</td>
                    <td>London</td>
                    <td>On</td>

                    <td>5 Marla Residential</td>
                    <td>Atif</td>
                    <td>Rabia@gmail</td>
                    <td>Sale</td>
                    <td>04/01/2021</td>
                    <td>Recording 2</td>
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
