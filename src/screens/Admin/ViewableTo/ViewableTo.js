import React from "react";
import "./ViewableTo.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Select from "react-select";
import { toDate } from "date-fns";

export default function ViewableTo() {
  const [select, setSelect] = React.useState([]);
  const [viewable, setViewable] = React.useState([]);
  const [name, setName] = React.useState([]);

  const Employees = [
    { label: "Sana", value: "Sana" },
    { label: "Atif", value: "Atif" },
    { label: "Ali", value: "Ali" },
    { label: "Imtesal", value: "Imtesal" },
    { label: "Rabia", value: "Rabia" },
    { label: "Qasim", value: "Qasim" },
  ];
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };
  console.log(select);
  console.log(viewable);
  console.log(name);
  return (
    <Container fluid>
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>ViewAble To </h3>
      </div>
      <div class="Laa shadow p-3 mb-3 bg-white rounded mt-2">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <Row>
              <div class="col-lg-11">
                {select.length > 0 ? (
                  <Select
                    // disabled={!select.every((v) => v === true)}
                    options={Employees}
                    isMulti
                    onChange={(opt) => setViewable(opt)}
                    onClick={(e) => {
                      HandleName(0);
                    }}
                  />
                ) : null}
              </div>
              <div>

              {viewable != null ? (
                viewable.length > 0 ? (
                  <button
                    class="col-lg-12 btn btn-primary"
                    type="submit"
                    style={{ backgroundColor: "#2258BF" }}
                    // disabled={!select.every((v) => v === true)}

                    onClick={(arr) => {
                      console.log(arr);
                    }}
                  >
                    save
                  </button>
                ) : null
              ) : null}
              
              </div>
            </Row>

            <div className="table-responsive">
              <table className="table table-hover " style={{}}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Select
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Sr_no
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ViewAble_To
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      <input
                        type="checkBox"
                        onClick={(e) => {
                          HandleName(0);
                        }}
                      />
                    </td>
                    <td>1</td>
                    <td>Project Name</td>
                    <td>
                      {viewable != null
                        ? viewable.map((task) => {
                            return `${task.value} `;
                          })
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <input
                        type="checkBox"
                        onClick={(e) => {
                          HandleName(1);
                        }}
                      />
                    </td>
                    <td>1</td>
                    <td>Project Name</td>
                    <td>
                      {viewable != null
                        ? viewable.map((task) => {
                            return `${task.value} `;
                          })
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <input
                        type="checkBox"
                        onClick={(e) => {
                          HandleName(2);
                        }}
                      />
                    </td>
                    <td>1</td>
                    <td>Project Name</td>
                    <td>
                      {viewable != null
                        ? viewable.map((task) => {
                            return `${task.value} `;
                          })
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <input
                        type="checkBox"
                        onClick={(e) => {
                          HandleName(3);
                        }}
                      />
                    </td>
                    <td>1</td>
                    <td>Project Name</td>
                    <td>
                      {viewable != null
                        ? viewable.map((task) => {
                            return `${task.value} `;
                          })
                        : null}
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
