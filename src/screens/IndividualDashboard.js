import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeadReport_chart from '../components/LeadReport_chart';
import QuarterlyLead_chart from '../components/QuarterlyLead_chart';

class IndividualDashboard extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <div class="row">
            <div
              class="col-lg-12 col-md-12 text-nowrap "
              style={{ backgroundColor: '#FAFAFA' }}
            >
              <h1>Individual Dashboard</h1>
              <div class="row">
                <div
                  class="col-lg-8 col-md-8 mt-2"
                  style={{ backgroundColor: 'white', borderRadius: '25px' }}
                >
                  <div class="row" style={{}}>
                    <Container fluid>
                      <div style={{}}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <h6>Target Assigend</h6>
                            <h3>Lead Report</h3>
                          </div>
                          <div style={{ float: 'right', height: 30 }}>
                            <select
                              name
                              className="language border-0"
                              id="language"
                            >
                              <option value="Hindi">Yearly(2020)</option>
                              <option value="English">Monthly(2020)</option>
                              <option value="Urdu">Weekly(2020)</option>
                              <option value="Parsian">Daily(2020)</option>
                            </select>
                          </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                      </div>
                    </Container>
                  </div>

                  <LeadReport_chart />
                </div>
                <div
                  class="col-lg-4 col-md-4 mt-2"
                  style={{ backgroundColor: 'white', borderRadius: '25px' }}
                >
                  <h6>Pending Tasks Weekly (2020)</h6>

                  <QuarterlyLead_chart />
                </div>
              </div>
              <Container fluid>
                <div class="row">
                  <div
                    class="col-lg-12 col-md-12 mt-2"
                    style={{
                      float: 'right',
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                  >
                    <div className="row">
                      <div>
                        <h2>Quarterly Lead Tasks</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                      </div>
                      <div style={{ float: 'right', paddingLeft: '80px' }}>
                        <select
                          name
                          className="language border-0"
                          id="language"
                        >
                          <option value="Hindi">Yearly(2020)</option>
                          <option value="English">Monthly(2020)</option>
                          <option value="Urdu">Weekly(2020)</option>
                          <option value="Parsian">Daily(2020)</option>
                        </select>
                      </div>
                    </div>

                    <QuarterlyLead_chart />
                  </div>
                </div>
              </Container>

              <Container fluid>
                <div class="row">
                  <div
                    class="col-lg-4 col-md-4 mt-2"
                    style={{ backgroundColor: 'white', borderRadius: '25px' }}
                  >
                    <h3>Target Asigned</h3>
                    <LeadReport_chart />
                  </div>
                  <div
                    class="col-lg-8 col-md-8 mt-2"
                    style={{ backgroundColor: 'white', borderRadius: '25px' }}
                  >
                    <h6>Target Assigend</h6>
                    <h3>Lead Report</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                    <QuarterlyLead_chart />
                  </div>
                </div>
              </Container>
              <Row>
                <Col
                  lg="12"
                  style={{ backgroundColor: 'white', borderRadius: '25px' }}
                >
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">New</th>
                          <th scope="col">OverDue</th>
                          <th scope="col">Grace</th>
                          <th scope="col">In Progress</th>
                          <th scope="col">Completed</th>
                          <th scope="col">CTA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                          <td>Cell</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <Container fluid>
                <Row>
                  <Col
                    md="4"
                    style={{ backgroundColor: 'white', borderRadius: '25px' }}
                  >
                    <h3>Target Asigned</h3>
                    <LeadReport_chart />
                  </Col>
                  <Col
                    md="8"
                    style={{ backgroundColor: 'white', borderRadius: '25px' }}
                  >
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">No of Instruction</th>
                            <th scope="col">Explanation Calls</th>
                            <th scope="col">Warnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default IndividualDashboard;
