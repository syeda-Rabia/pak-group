import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Col, Row, Table } from "react-bootstrap";

export default function EmployeeRequestTable() {
  return (
    <Container fluid>
      <Row>
        <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4 mr-3 ml-3">
          <h3 style={{ color: "#818181" }}>Employee Requests </h3>
        </div>
      </Row>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Table hover size="lg">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
