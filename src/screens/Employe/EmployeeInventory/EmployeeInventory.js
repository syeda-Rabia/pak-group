import React from "react";
import "./EmployeeInventory.css";
import { Container, Row, Col } from "react-bootstrap";

export default function EmployeeInventory() {
  return (
    <Container fluid className="Laa">
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Inventory (Employee)</h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                    <th scope="col" style={{ color: "#818181" }}>
                      Sr No
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Project
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Category
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Type of Unit
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Block
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Status
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Viewable To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">1</td>
                    <td>LDA city</td>
                    <td>Sale</td>
                    <td>Sale</td>
                    <td>Block A</td>
                    <td>Sold</td>
                    <td>Rabia</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>LDA city</td>
                    <td>Sale</td>
                    <td>Sale</td>
                    <td>Block A</td>
                    <td>Sold</td>
                    <td>Rabia</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>LDA city</td>
                    <td>Sale</td>
                    <td>Sale</td>
                    <td>Block A</td>
                    <td>Sold</td>
                    <td>Rabia</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>LDA city</td>
                    <td>Sale</td>
                    <td>Sale</td>
                    <td>Block A</td>
                    <td>Sold</td>
                    <td>Rabia</td>
                  </tr>
                  <tr>
                    <td scope="row">1</td>
                    <td>LDA city</td>
                    <td>Sale</td>
                    <td>Sale</td>
                    <td>Block A</td>
                    <td>Sold</td>
                    <td>Rabia</td>
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
