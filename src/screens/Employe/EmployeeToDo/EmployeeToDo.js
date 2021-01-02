import React from "react";
import "./EmployeeToDo.css";
import { employeedata } from "../../../assests/constants/todolistEmployee";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

export default function LeadsAllocatonAndAddition() {
  const [data, setData] = React.useState(employeedata);
  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);
    const [value, setValue] = React.useState("");


  // console.log('Page Size:', pageSize);
  // console.log('Total Count: ', totalCount);
  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // console.log('page', page);
  };

  const TableRow = ({ index, item }) => {
    // console.log('item', item);
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <td key={item.id}>{item.id}</td>
        <td>
          <input
            key={item.id}
            placeholder={item.Clients}
            className="form-control "
          />
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Contacts}
            className="form-control"
          />
        </td>
        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Project.map((project) => (
              <option>{project}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Budget}
            className="form-control"
          />
        </td>

        <td key={item.id}>
          <div
            style={{ marginLeft: "10px", marginRight: "60px", width: "100%" }}
          >
            <KeyboardTimePickerExample />
          </div>
        </td>
        <td key={item.id}>{item.Country}</td>

        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Status.map((status) => {
              return <option>{status}</option>;
            })}
          </select>
        </td>

        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Interest.map((interest) => {
              return <option>{interest}</option>;
            })}
          </select>
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Email}
            className="form-control"
          />
        </td>
        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Task.map((task) => {
              return <option>{task}</option>;
            })}
          </select>
        </td>
        <td key={item.id}>
          <div
            className=""
            style={{ marginLeft: "15px", marginRight: "70px", width: "100%" }}
          >
            <KeyboardDatePickerExample />
          </div>
        </td>
        <td> Recording 1</td>
        <td>comments</td>
        <td>
          <DropdownButton id="Action-button" variant="info" title="Action">
            <DropdownButton
              className="mb-1 "
              id="callreceived"
              title="Call Received"
              drop="left"
              style={{
                color: "black",
                outline: "none",
                backgroundColor: "white",
              
              }}
            >
              <DropdownButton
                className="mb-1"
                id="shiftAndWarnButton"
                title="Shift and Warn"
                drop="left"
              >
                <Dropdown.Item
                  as="button"
                  eventKey="instruct"
                  style={{ color: "black", outline: "none" }}
                >
                  Date
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  eventKey="call-Explanation"
                  style={{ color: "black", outline: "none" }}
                >
                  Time
                </Dropdown.Item>
              </DropdownButton>
            </DropdownButton>
            <DropdownButton
              className="mb-1"
              id="calldeclined"
              title="Call declined"
              drop="left"
            >
              <Dropdown.Item
                as="button"
                eventKey="instruct"
                style={{ color: "black", outline: "none" }}
              >
                Atif
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="call-Explanation"
                style={{ color: "black", outline: "none" }}
              >
                Rabia
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="shift-and-Warn"
                style={{ color: "black", outline: "none" }}
              >
                Qasim
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              className="mb-1"
              id="askforhatsapp"
              title="Asked To Send Whatsapp"
              drop="left"
            >
              <Dropdown.Item
                as="button"
                eventKey="instruct"
                style={{ color: "black", outline: "none" }}
              >
                Atif
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="call-Explanation"
                style={{ color: "black", outline: "none" }}
              >
                Rabia
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="shift-and-Warn"
                style={{ color: "black", outline: "none" }}
              >
                Qasim
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              className="mb-1"
              id="askforsms"
              title="Asked To send sms"
              drop="left"
            >
              <Dropdown.Item
                as="button"
                eventKey="instruct"
                style={{ color: "black", outline: "none" }}
              >
                Atif
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="call-Explanation"
                style={{ color: "black", outline: "none" }}
              >
                Rabia
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="shift-and-Warn"
                style={{ color: "black", outline: "none" }}
              >
                Qasim
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              className="mb-1"
              id="MeetingScedule"
              title="Meeting Scheduled"
              drop="left"
              style={{ color: "black", outline: "none" }}
            >
              <Dropdown.Item
                as="button"
                eventKey="instruct"
                style={{ color: "black", outline: "none" }}
              >
                Atif
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="call-Explanation"
                style={{ color: "black", outline: "none" }}
              >
                Rabia
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                eventKey="shift-and-Warn"
                style={{ color: "black", outline: "none" }}
              >
                Qasim
              </Dropdown.Item>
            </DropdownButton>
          </DropdownButton>
        </td>
        <td>What to do</td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>To Do List (Employee)</h3>
      </div>

      <Row>
        <Col lg="12" style={{ backgroundColor: "white", borderRadius: "5px" }}>
          <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
            <div className="table-responsive">
              <table id="todolistTable" className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ID
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Clients
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Contacts
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Budget
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        TOC
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Country/City
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Email
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Task
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Deadline
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {"Recording"}
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Comments
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Actions
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        What_To_Do
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => {
                    return <TableRow index={index} item={item} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="page-info">
            Showing {currentPage} from {pageCount}
          </p>
        </Col>
        <Col>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            show={handleShow}
          />
        </Col>
      </Row>
    </Container>
  );
}
