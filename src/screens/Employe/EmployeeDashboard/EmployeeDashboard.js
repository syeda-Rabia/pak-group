import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLeadReportChart from "../../../components/EmployeeCharts/EmployeeLeadReportChart";
import EmployeeQuartelyLeadChart from "../../../components/EmployeeCharts/EmployeeQuartelyLeadChart";

class EmployeeDashboard extends Component {
  render() {
    return (
      <Container fluid>
        <div className="row">
          <div
            className="col-lg-12 col-md-12 text-nowrap "
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
              <h3 style={{ color: "#818181" }}>Employee Dashboard</h3>
            </div>
            <div className="row">
              <div
                className="col-lg- col-md-7 mt-2 mb-2 mr-5 ml-3 p-3"
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              >
                <div className="row">
                  <Container fluid>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "#818181" }}>
                          <h6 style={{ color: "#818181" }}>Target Assigend</h6>
                          <h3 style={{ color: "#818181" }}>Lead Report</h3>
                        </div>
                        <div
                          style={{
                            float: "right",
                            height: 30,
                            color: "#818181",
                          }}
                        >
                          <select
                            name
                            className="language border-0"
                            id="language"
                            style={{ color: "#818181" }}
                          >
                            <option value="Hindi">Yearly(2020)</option>
                            <option value="English">Monthly(2020)</option>
                            <option value="Urdu">Weekly(2020)</option>
                            <option value="Parsian">Daily(2020)</option>
                          </select>
                        </div>
                      </div>

                      <p style={{ color: "#818181" }}>
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                    </div>
                  </Container>
                </div>

                <EmployeeLeadReportChart />
              </div>
              <div
                className="col-lg-4 col-md-4 mt-2 mb-2 p-3 ml-2"
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              >
                <h6 style={{ color: "#818181" }}>
                  Pending Tasks Weekly (2020)
                </h6>

                <EmployeeQuartelyLeadChart />
              </div>
            </div>
            <Container fluid>
              <div className="row">
                <div
                  className="col-lg-12 col-md-12 mt-2 mb-2 p-3"
                  style={{
                    float: "right",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <div className="row" style={{ padding: "30px" }}>
                    <div style={{ color: "#818181" }}>
                      <h2 style={{ color: "#818181" }}>Quarterly Lead Tasks</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "30px",
                        right: "30px",
                        color: "#818181",
                      }}
                    >
                      <select
                        name
                        className="language border-0"
                        id="language"
                        style={{ color: "#818181" }}
                      >
                        <option value="Hindi">Yearly(2020)</option>
                        <option value="English">Monthly(2020)</option>
                        <option value="Urdu">Weekly(2020)</option>
                        <option value="Parsian">Daily(2020)</option>
                      </select>
                    </div>
                  </div>

                  <EmployeeQuartelyLeadChart />
                </div>
              </div>
            </Container>

            <Container fluid>
              <div className="row">
                <div
                  className="col-lg-4 col-md-4 mt-2 mb-2 mr-5 ml-2 p-3"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    color: "#818181",
                  }}
                >
                  <h3 style={{ color: "#818181" }}>Target Asigned</h3>
                  <EmployeeLeadReportChart />
                </div>
                <div
                  className="col-lg-7 col-md-7 mt-2 mb-2  ml-4 p-3"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    color: "#818181",
                  }}
                >
                  <h6 style={{ color: "#818181" }}>Target Assigend</h6>
                  <h3 style={{ color: "#818181" }}>Lead Report</h3>
                  <p style={{ color: "#818181" }}>
                    Lorem ipsum dolor sit amet, consectetur
                  </p>
                  <EmployeeQuartelyLeadChart />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    );
                }
}
export default EmployeeDashboard;
