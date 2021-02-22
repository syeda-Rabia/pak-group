import "./RecordTable.css";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import { GET } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";

import CTAButton from "../../../components/CTAButton";
import {
  Paper,
  makeStyles,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@material-ui/core";

export default function RecordTable() {
  const [data, setData] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [filterData, setFilterData] = React.useState("All");
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);
  const [value, setValue] = useState("");

  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
  }));

  const classes = useStyles();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleFetchEmployeesLeads = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER_LEADS + filterData);
    // ;
    console.log(res,"LET's See what you got");
    if (res.success !== false) {

      setData(res.data.leads.filter((item)=>item!=null));
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchEmployeesLeads();
  }, [filterData]);
  const handleFetchRequest = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    console.log(res);

    if (res.success != false) {
      setEmployees(res.data.users.data);
      setFilterData(res.data.users.data[0].id);
    }
  };
  React.useEffect(() => {
    handleFetchRequest();
  }, []);

  //  ;
  //  ;
  const handleShow = (pageCount) => {
    if (pageCount === 0) setPageCount(1);
    else setPageCount(pageCount);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    //  ;
  };

  const TableRow = ({ index, item }) => {
    console.log(item,"rabia");
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <td scope="row" key={index + 1}>
          {index + 1}
        </td>
        <td>{item.client_name}</td>

        <td>{item.contact}</td>
        <td>{item.project.name}</td>
        <td>{item.budget}</td>
        <td>{item.time_to_call}</td>
        <td>{item.country_city}</td>

        <td>{item.status}</td>

        {/* <td>{item.inventory.serial_no}</td> */}
        <td>--------------</td>
        {/* <td>{item.inventory.inventory_name}</td> */}
        <td>{item.email}</td>
        <td>{item.project.category.name}</td>
        <td>{item.dead_line}</td>

        <td>
          <CTAButton lead_id={item.id} 
           empId={item.id}/>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <h3 style={{ color: "#818181" }}>Employee Leads</h3>

        <select
          className="form-control form-control-sm w-100"
          value={filterData}
          onChange={(e) => {
            setIsLoading(true);
            console.log(e.target.value);
            setFilterData(e.target.value);
          }}
        >
          {employees.map((item) => {
            return <option value={item.id}>{item.first_name}</option>;
          })}
        </select>
      </div>
      <div className="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table
                className="table table-hover"
                style={{
                  // minHeight: "320px",
                  minHeight: data.length > 0 ? "220px" : "0px",
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
                    {/* <th scope="col">
                      <span id="sp">Serial_No</span>
                    </th> */}
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
                    {/* <th scope="col">
                      <span id="sp">Returned_From</span>
                    </th> */}
                    <th scope="col">
                      <span id="sp">Call_To_Action</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* {currentData.map((item, index) => {
                    //  ;
                    if (filterData.value == "All")
                      return <TableRow index={index} item={item} />;
                    else if (item.Clients == filterData.value)
                      return <TableRow index={index} item={item} />;
                  })} */}
                  {data.filter((item)=>item.lead!=null).map((item, index) => {
                    return <TableRow index={index} item={item.lead} />;
                  })}
                </tbody>
              </table>
              {isLoading ? (
                <>
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress disableShrink />
                  </Backdrop>
                </>
              ) : null}
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
    </>
  );
}
