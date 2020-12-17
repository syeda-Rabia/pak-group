import React from "react";
import "./InventoryAdmin.css";
import { Container, Row, Col } from "react-bootstrap";

export default function InventoryAdmin() {
  return (
    <Container fluid className="Laa">
      <h1>
        Inventory<span>(Admin)</span>
      </h1>
      <Row>
        <Col
          lg
          md="12"
          style={{ backgroundColor: "white", borderRadius: "5px" }}
        >
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">Project</th>
                  <th scope="col">Category</th>
                  <th scope="col">Type of Unit</th>
                  <th scope="col">Block</th>
                  <th scope="col">Status</th>
                  <th scope="col">Viewable To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>LDA city</option>
                      <option>DHA Rahbar</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sale</option>
                      <option>Rent</option>
                      <option>Pending</option>
                    </select>
                  </td>
                  <td>
                    <input placeholder="Type of unit" class="form-control" />
                  </td>
                  <td>
                    <input placeholder="Block" class="form-control" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Sold</option>
                      <option>Unsold</option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm">
                      <option>Rabia</option>
                      <option>Atif</option>
                      <option>Qasim</option>
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
