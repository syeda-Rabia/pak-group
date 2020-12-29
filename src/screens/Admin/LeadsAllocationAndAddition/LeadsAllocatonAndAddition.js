import React from 'react';
import './LeadsAllocatonAndAddition.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function LeadsAllocatonAndAddition() {
  return (
    <Container fluid>
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>Leads Allocation and Addition</h3>
      </div>
      <Row>
        <Col lg="12" style={{ backgroundColor: "white", borderRadius: "5px" }}>
          <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
            <div className="table-responsive">
              <table className="table table-hover" style={{ display: "block" }}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>ID</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Clients</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Contacts</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Project</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Budget</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>TOC</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Source</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Country/City</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Status</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Interest</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}> Allocate_To</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Task</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Deadline</span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{color:"#818181"}}>Returned_From</span>
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
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">2</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td className="noWrap">Project Name</td>
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">3</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">4</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">5</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Qasim</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">6</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>$400</td>
                    <td>10:00 PM</td>

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
                    <td>11-12-2020</td>
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
