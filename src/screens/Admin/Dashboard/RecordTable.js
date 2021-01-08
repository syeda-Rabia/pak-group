import "./RecordTable.css";
import { dummyData } from "../../../assests/constants/todoList";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  ListGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import { Modal } from "react-bootstrap";
// import Dropdown from "react-multilevel-dropdown";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
  const [value, setValue] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

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
    // if (options.title == optionsArray[0].title)
    //
    if (value == "instruct") {
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
    }
    // if (options.title == optionsArray[1].title)
    else if (value == "call-Explanation") {
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
    }

    // if (options.title == optionsArray[2].title)
    else if (value == "shift-and-warn") {
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
    } else {
      return null;
    }
  };
  const TableRow = ({ index, item }) => {
    // console.log('item', item);
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <td scope="row" key={item.id}>
          {item.id}
        </td>
        <td>{item.Clients}</td>
        <td>{item.Contacts}</td>
        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Project.map((project) => (
              <option>{project}</option>
            ))}
          </select>
        </td>
        <td key={item.id}>{item.Budget}</td>
        <td key={item.id}>{item.TOC}</td>
        <td key={item.id}>{item.Country}</td>

        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Status.map((status) => {
              return <option>{status}</option>;
            })}
          </select>
        </td>

        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Interest.map((interest) => {
              return <option>{interest}</option>;
            })}
          </select>
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Email}
            className="form-control w-100"
          />
        </td>
        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Task.map((task) => {
              return <option>{task}</option>;
            })}
          </select>
        </td>
        <td key={item.id}>{item.Deadline}</td>
        <td>Rabia</td>
        <td>
          <DropdownButton
            id="CTA-button"
            variant="info"
            title="CTA"
            onSelect={(e) => {
              setValue(e);
              setShowModalCTA(true);
              console.log(e);
            }}
          >
            <Dropdown.Item
              as="button"
              eventKey="instruct"
              style={{ color: "black", outline: "none" }}
            >
              Instruct
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="call-Explanation"
              style={{ color: "black", outline: "none" }}
            >
              Call Explanation
            </Dropdown.Item>
            {/* <Dropdown.Item
              as="button"
              eventKey="shift-and-Warn"
              style={{ color: "black", outline: "none" }}
            >
              Shift and Warn
            </Dropdown.Item> */}
            <DropdownButton
              id="shiftAndWarnButton"
              title="Shift and Warn"
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
          </DropdownButton>
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
          className="form-control form-control-sm w-100"
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
                  minHeight: "220px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sp">ID</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Clients</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Contacts</span>
                    </th>
                    <th>
                      <span id="sp">Project</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Budget</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Time_to_Call</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Country/City</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Status</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Interest</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Email</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Task</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Deadline</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Returned_From</span>
                    </th>
                    <th scope="col">
                      <span id="sp">Call_To_Action</span>
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
