import React from 'react';
import './LeadsAdmin.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function LeadsAdmin() {
  return (
    <Container fluid className="Laa">
      <h1>
        Leads<span>(Admin)</span>
      </h1>
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
                  <th scope="col">Clients</th>
                  <th scope="col">Contacts</th>
                  <th scope="col">Project</th>
                  <th scope="col">Budget</th>
                  <th scope="col">Time To Call</th>
                  <th scope="col">Country/City</th>
                  <th scope="col">Status</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Allocate To</th>
                  <th scope="col">Email</th>
                  <th scope="col">Task</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Recordings</th>
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
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
                  <td>
                    <select className="form-control form-control-sm">
                      <option>Recording 1</option>
                      <option>Recording 2</option>
                      <option>Recording 3</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input placeholder="Atif" className="form-control" />
                  </td>
                  <td>
                    <input placeholder="Contact" className="form-control" />
                  </td>
                  <td>Project Name</td>
                  <td>$400</td>
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
                  <td>11-12-2020</td>
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
    </Container>
  );
}
