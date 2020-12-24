import React from "react";
import "./RecordTable.css";
import { dummyData } from "../../../assests/constants/todoList";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
export default function RecordTable() {
  const [data, setData] = React.useState(dummyData);
  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [filterData, setFilterData] = React.useState("All");
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);

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
      </tr>
    );
  };
  console.log(filterData);
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
        <h3 style={{ color: "#818181" }}>Employee Record</h3>
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
              <table className="table table-hover" style={{ display: "block" }}>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Clients</th>
                    <th scope="col">Contacts</th>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Time to Call</th>
                    <th scope="col">Country/City</th>
                    <th scope="col">Status</th>
                    <th scope="col">Interest</th>
                    <th scope="col">Email</th>
                    <th scope="col">Task</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Returned From</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => {
                    console.log(item.Clients, filterData);
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
    </Container>
  );
}
