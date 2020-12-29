import "./RecordTable.css";
import { dummyData } from "../../../assests/constants/todoList";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
// import Calendar from "react-calendar";
import Calendar from "react-calendar";
import DateTimePicker from "react-datetime-picker";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
// import { DatePicker, calendarContainer } from "react-datepicker";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import { Modal } from "react-bootstrap";
import Dropdown from "react-multilevel-dropdown";
import DatePicker from "react-date-picker";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

export default function RecordTable() {
  const [data, setData] = React.useState(dummyData);
  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [filterData, setFilterData] = React.useState("All");
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);
  const [date, setDate] = useState(new Date());
  const [value, onChange] = useState(new Date());

  const optionsArray = [
    { id: "1", title: "Instruct", options: [] },
    { title: "Call Explanation", options: [] },
    {
      title: "Shift and Warn",
      options: ["Amjad", "Nakash", "Uzma", "Adil", "Waqar", "kashif", "other"],
    },
  ];
  const [options, setOptions] = React.useState({
    title: optionsArray[0].title,
    subID: null,
  });
  // console.log('Page Size:', pageSize);
  // console.log('Total Count: ', totalCount);
  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // console.log('page', page);
  };

  const ModalCTA = () => {
    if (options.title == optionsArray[0].title)
      //
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter your Instruction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <p>
                <textarea id="myTextArea" rows="3" cols="62">
                  Your text here
                </textarea>
              </p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      );
    if (options.title == optionsArray[1].title)
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select date and time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid" style={{ marginLeft: "110px" }}>
              <div className="row mb-4">
                <KeyboardDatePickerExample />
              </div>
              <div className="row ">
                <KeyboardTimePickerExample />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Set
            </Button>
          </Modal.Footer>
        </Modal>
      );
    if (options.title == optionsArray[2].title)
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Shift and Warn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <p>Do you really want to shift this person.</p>
             
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      );
  };
  const TableRow = ({ index, item }) => {
    // console.log('item', item);
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <th scope="row" key={item.id}>
          {item.id}
        </th>
        <td>{item.Clients}</td>
        <td>{item.Contacts}</td>
        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Project.map((project) => (
              <option>{project}</option>
            ))}
          </select>
        </td>
        <td key={item.id}>{item.Budget}</td>
        <td key={item.id}>{item.TOC}</td>
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
        <td key={item.id}>{item.Deadline}</td>
        <td>
          <select key={item.id} className="form-control form-control-sm">
            {item.Returned.map((returned) => {
              return <option>{returned}</option>;
            })}
          </select>
        </td>
        <td>
          <Dropdown
            style={{ border: "none" }}
            title="CTA"
            className="form-control form-control-sm"
            onChange={(e) => {
              setOptions(e.target.value);
              setShowModalCTA(true);
              console.log(e.target.value);
            }}
            // value=""
          >
            {optionsArray.map((item) => {
              return (
                <Dropdown.Item
                  style={{ top: "-200px" }}
                  onClick={() => {
                    setShowModalCTA(true);
                    if (item.options.length == 0)
                      setOptions({ title: item.title, id: null });
                  }}
                >
                  {item.title}
                  {item.options.length > 0 ? (
                    <Dropdown.Submenu>
                      {item.options.map((subItem, index) => {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              setOptions({ title: item.title, id: index });
                            }}
                          >
                            {subItem}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Submenu>
                  ) : null}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </td>
      </tr>
    );
  };
  // console.log(filterData);
  return (
    <Container
      fluid
      className="Laa"
      style={{
        // backgroundColor: 'red',
        margin: "auto",
        width: "100%",
        // border: '3px solid green',
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Employee Leads</h3>
        {/* <div>
          <DatePicker onChange={onChange} value={value} />
        </div> */}
        {/* <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      calendarContainer={MyContainer}
    /> */}
        <select
          className="form-control form-control-sm"
          onChange={(e) => {
            setFilterData(e.target.value);
          }}
        >
          select employee
          {data.map((item) => {
            return <option>{item.Clients}</option>;
          })}
        </select>
      </div>
      <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table
                className="table table-hover"
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>ID</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Clients</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Contacts</span>
                    </th>
                    <th>
                      <span id="sp" style={{color:"#818181"}}>Project</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Budget</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Time to Call</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Country - City</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Status</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Interest</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Email</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Task</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Deadline</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Returned From</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{color:"#818181"}}>Call To Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => {
                    // console.log(item.Clients, filterData);
                    if (filterData == "All")
                      return <TableRow index={index} item={item} />;
                    else if (item.Clients == filterData)
                      return <TableRow index={index} item={item} />;
                  })}
                </tbody>
              </table>
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
      </div>
      <ModalCTA />
    </Container>
  );
}
