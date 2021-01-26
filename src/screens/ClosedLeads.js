import React from "react";
import "./ClosedLeads.css";
import { Container, Row, Col } from "react-bootstrap";
import { IconButton, Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

export default function ClosedLeads() {
  const history = useHistory();

  return (
    <Container fluid>
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4 d-flex">
        <IconButton
          onClick={() => {
            history.push("/");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <h3 style={{ color: "#818181" }}>Closed Leads </h3>
      </div>
      <Container
        fluid
        className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4"
      >
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive nowrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Client ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Project</th>
                    <th scope="col">Source</th>
                    <th scope="col">Status</th>
                    <th scope="col">Allocate To</th>
                    <th scope="col">Action History</th>
                    <th scope="col">Re Allocate</th>
                    <th scope="col">Recordings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
                    <th scope="row">1</th>
                    <td>#231</td>
                    <td>
                      <input placeholder="Atif" className="form-control" />
                    </td>
                    <td>
                      <input placeholder="Contact" className="form-control" />
                    </td>
                    <td>Project Name</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>NewsPaper</option>
                        <option>Facebook</option>
                        <option>Insta</option>
                      </select>
                    </td>
                    <td>On</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Nakash</option>
                        <option>Atif</option>
                        <option>Rabia</option>
                      </select>
                    </td>
                    <td>Order Approved</td>
                    <td>
                      <select className="form-control form-control-sm">
                        <option>Atif</option>
                        <option>Rabia</option>
                        <option>Qasim</option>
                      </select>
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
      </Container>
    </Container>
  );
}
