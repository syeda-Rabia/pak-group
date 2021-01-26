import React from "react";
import "./EmployeeLeads.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { KeyboardDatePickerExample } from "../../../utils/KeyboardTimePickerExample";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import { GET } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import { Select, MenuItem, Chip, makeStyles } from "@material-ui/core";
function EmployeeLeads(props) {
  const [data, setData] = React.useState([]);
  const handleFetchData = async () => {
    let res = await GET(ApiUrls.GET_USER_LEADS + props.userInfo.id);
    if (res.success != false) {
      setData(res.data.leads);
    }
  };
  React.useEffect(() => {
    handleFetchData();
  }, []);
  const useStyles = makeStyles((theme) => ({
    chipGracePeriod: {
      color: "#fff",
      backgroundColor: "red !important",
    },
    chipComplete: {
      color: "#fff",
      backgroundColor: "green !important",
    },
    chipFollowUp: {
      color: "#fff",
      backgroundColor: "yellow !important",
    },
    chipOverdue: {
      color: "#fff",
      backgroundColor: "orange !important",
    },
  }));

  const classes = useStyles();
  const Table = ({ item, index }) => {
    const formatTime = () => {
      if (item.time_to_call !== null) {
        let str = item.time_to_call;
        let res = str.match(/(\d\d)/g);
        let hours = res[0];
        let min = res[1];

        let AmOrPm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        return hours + ":" + min + " " + AmOrPm;
        //  ;
      }
    };
    return (
      <tr>
        <td scope="row">{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>
        <td>{item.project.name}</td>
        <td>
          {item.budget}
          {" PKR"}
        </td>
        {/* <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td> */}
        <td>{item.time_to_call != null ? formatTime() : "-----"}</td>
        <td>{item.country_city}</td>
        <td>
          <Chip
            classes={{
              root:
                item.status === "Overdue"
                  ? classes.chipOverdue
                  : item.status === "Grace Period"
                  ? classes.chipGracePeriod
                  : item.status === "Complete"
                  ? classes.chipComplete
                  : item.status === "Follow up"
                  ? classes.chipFollowUp
                  : null,
            }}
            label={item.status}
          />
        </td>

        <td>{item.inventory.inventory_name}</td>
        <td>{props.userInfo.first_name}</td>
        <td>{item.email}</td>
        <td>{item.task != null ? item.task : "-------"}</td>
        <td>{item.dead_line != null ? item.dead_line : "-------"}</td>
        <td>
          <input type="file" />
        </td>
        <td>
          <Select
            disableUnderline
            className="form-control form-control-sm w-100"
            // onChange={(e) => {
            //    ;
            //   (e.target.value);
            // }}
          >
            <MenuItem value="followUp">Follow Up</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </td>
        <td>
          <Button>Update</Button>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <Row>
        <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
          <h3 style={{ color: "#818181" }}>Leads Employee</h3>
        </div>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <div className="table-responsive">
            <table id="leadsTable" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      ID
                    </span>
                  </th>

                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Clients
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Contacts
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Project
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Budget
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      TOC
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Country/City
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Status
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Interest
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Allocate_To
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Email
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Task
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Deadline
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Recordings
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Action
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Update
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <Table item={item.lead} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeLeads);
