import React, { useCallback } from "react";
import "./EmployeeLeads.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { KeyboardDatePickerExample } from "../../../utils/KeyboardTimePickerExample";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import {
  Select,
  MenuItem,
  Chip,
  makeStyles,
  Menu,
  Collapse,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { token } from "../../../utils/Config";
import { useDropzone, Dropzone } from "react-dropzone";
import PreLoading from "../../../components/PreLoading";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";

function EmployeeLeads(props) {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState([
    {
      name: "Call",
      open: false,
      sub: [
        { name: "Call Recieved", set: false },
        { name: "Call Declined", set: false },
        { name: "Asked To send WhatsApp", set: false },
        { name: "Asked To Send SMS", set: false },
        { name: "Meeting Scheduled", set: false },
      ],
    },
    {
      name: "SMS",
      open: false,
      sub: [{ name: "SMS Sent", set: false }],
    },
    {
      name: "Visit",
      open: false,
      sub: [
        { name: "Visit Successfully", set: false },
        { name: "Visit Postponed", set: false },
        { name: "Visit Canceled", set: false },
      ],
    },
    {
      name: "WhatsApp",
      open: false,
      sub: [{ name: "WhatsApp Sent", set: false }],
    },
  ]);
  // const []

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuButtonClick = (event) => {};

  const handleClose = () => {
    setOpen([
      {
        name: "Call",
        open: false,
        sub: [
          { name: "Call Recieved", set: false },
          { name: "Call Declined", set: false },
          { name: "Asked To send WhatsApp", set: false },
          { name: "Asked To Send SMS", set: false },
          { name: "Meeting Scheduled", set: false },
        ],
      },
      {
        name: "SMS",
        open: false,
        sub: [{ name: "SMS Sent", set: false }],
      },
      {
        name: "Visit",
        open: false,
        sub: [
          { name: "Visit Successfully", set: false },
          { name: "Visit Postponed", set: false },
          { name: "Visit Canceled", set: false },
        ],
      },
      {
        name: "WhatsApp",
        open: false,
        sub: [{ name: "WhatsApp Sent", set: false }],
      },
    ]);
    setAnchorEl(null);
  };

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_USER_LEADS + props.userInfo.id);
    console.log(res);
    if (res.success != false) {
      // setData(res.data.leads);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [refresh]);
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
    root: {
      width: "100%",
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    subNested: {
      paddingLeft: theme.spacing(6),
    },
  }));

  console.log(open);
  const classes = useStyles();
  const Table = ({ item, index }) => {
    const [recordingFile, setRecordingFile] = React.useState(null);
    const [action, setAction] = React.useState("follow up");

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setRecordingFile(file);
        console.log(file);
      });
    }, []);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop,
      accept: "audio/*",

      maxFiles: 1,
    });
    // console.log(item);

    // const SendFileToServer = async () => {
    //   const formData = new FormData();

    //   formData.append("lead_id", item.id);
    //   formData.append("recording_file", recordingFile);
    //   console.log(formData.values());
    //   let resp = await POST(ApiUrls.ADD_RECORDING, formData);
    //   console.log(resp);
    // };

    const SendFileToServer = async () => {
      const formData = new FormData();

      let actionresp = await POST(ApiUrls.EMPLOYEE_ACTION, {
        id: item.id,
        action: action,
      });
      console.log(actionresp);
      if (actionresp.error === false) {
        alert("lead updated successfully");
        // setShowAlert(true);
      }
      if (actionresp.error.hasOwnProperty("allocated_to")) {
        alert("Action Field is required");

        // setErrorAlert(true);
      }
      setRefresh(!refresh);

      formData.append("lead_id", item.id);
      formData.append("recording_file", recordingFile);
      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      // await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
      await fetch("http://192.168.100.191:8000/api/employee/recording/add", {
        method: "post",
        mode: "no-cors",
        crossDomain: true,
        headers: {
          // Accept: "application/json",
          "Content-Type": "	multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())

        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    };
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
        <td>{item.client_name != null ? item.client_name : "-----"}</td>
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

        {/* <td>{item.inventory.inventory_name}</td> */}
        <td>{props.userInfo.first_name}</td>
        <td>{item.email}</td>
        <td>{item.task != null ? item.task : "-------"}</td>
        <td>{item.dead_line != null ? item.dead_line : "-------"}</td>

        <td>
          <div
            style={{ outline: "none", height: "2rem" }}
            className="d-flex"
            {...getRootProps()}
          >
            <button className="float-right rounded">Choose File</button>
            <p className="pl-1">
              {acceptedFiles.map((file) => {
                return file.path;
              })}
            </p>
            <input {...getInputProps()} />
          </div>
        </td>

        {/* <td>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setRecordingFile(e.target.files[0]);
            }}
          />
        </td> */}
        <td>
          <Select
            disableUnderline
            className="form-control form-control-sm w-100"
            value={item.action}
            onChange={(e) => {
              setAction(e.target.value);
              console.log(e.target.value);
            }}
          >
            <MenuItem value="Follow up">Follow Up</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
          </Select>
        </td>
        <td>
          <Button onClick={SendFileToServer}>Update</Button>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      {/* <PreLoading startLoading={isLoading} /> */}
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Leads<sub>(Employee)</sub>
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <LeadsMobileViewSidebar />
          </div>
        </Col>
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
                      Add_Recording
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
              {/* <tbody>
                {data.map((item, index) => (
                  <Table item={item.lead} index={index} />
                ))}
              </tbody> */}
              <tbody>
                <tr>
                  <td>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      Open Menu
                    </Button>
                    <Menu
                      // className={classes.root}
                      id="simple-menu"
                      getContentAnchorEl={null}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {open.map((item, index) => (
                        <>
                          <MenuItem
                            data-my-value={item.name}
                            onClick={(e) => {
                              const setopenDropdown = { ...item };
                              console.log(item, "item");
                              setopenDropdown.open = !setopenDropdown.open;
                              // setopenDropdown.open = !setopenDropdown.open;
                              setOpen((state) => {
                                let arr = [...state];
                                arr[index] = setopenDropdown;
                                return arr.map((subItems, i) => {
                                  if (index == i) {
                                    return setopenDropdown;
                                  } else {
                                    subItems.open = false;
                                  }
                                  return subItems;
                                });
                              });
                              // const { myValue } = e.currentTarget.dataset;
                              // console.log(myValue); // --> 123
                              handleMenuButtonClick();
                            }}
                          >
                            {item.name}
                            <div
                              style={{ justifyContent: "flex-end" }}
                              className="d-flex w-100 "
                            >
                              {item.open ? <ExpandLess /> : <ExpandMore />}
                            </div>
                          </MenuItem>

                          <Collapse in={item.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {item.sub.map((listItem, id) => (
                                <>
                                  <ListItem
                                    button
                                    onClick={() => {
                                      const SubMenu = { ...listItem };
                                      SubMenu.set = !SubMenu.set;
                                      setOpen((state) => {
                                        let arr = [...state];
                                        // arr[index].sub[id] = SubMenu;
                                        let dummy = arr[index].sub.map(
                                          (subItems, i) => {
                                            if (id == i) {
                                              return SubMenu;
                                            } else {
                                              subItems.set = false;
                                            }
                                            return subItems;
                                          }
                                        );
                                        console.log(dummy, "DUMMY");
                                        arr[index].sub = dummy;
                                        return arr;
                                      });
                                    }}
                                    className={classes.nested}
                                  >
                                    <ListItemText primary={listItem.name} />
                                    <Collapse
                                      in={item.sub[id].set}
                                      // in={item.sub.some((item) => item.set === true)}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List component="div" disablePadding>
                                        <ListItem
                                          className={classes.subNested}
                                          button
                                          // onClick={() => {
                                          //   const SubMenu = { ...listItem };
                                          //   SubMenu.set = false;
                                          //   setOpen((state) => {
                                          //     let arr = [...state];
                                          //     arr[index].sub[id] = SubMenu;
                                          //     console.trace(arr);

                                          //     return arr;
                                          //   });
                                          // }}
                                        >
                                          <ListItemText primary="Scheduled Meeting" />
                                        </ListItem>
                                        <ListItem
                                          className={classes.subNested}
                                          button
                                        >
                                          <ListItemText primary="Call Back" />
                                        </ListItem>
                                        <ListItem
                                          className={classes.subNested}
                                          button
                                        >
                                          <ListItemText primary="Comming with Token" />
                                        </ListItem>
                                        <ListItem
                                          className={classes.subNested}
                                          button
                                        >
                                          <ListItemText primary="Request to Close" />
                                        </ListItem>
                                      </List>
                                    </Collapse>
                                  </ListItem>
                                </>
                              ))}
                            </List>
                          </Collapse>

                          {/* <Collapse in={open} timeout="auto" unmountOnExit>
                          <WhatsNext />
                        </Collapse> */}
                        </>
                      ))}

                      {/* <MenuItem
                        data-my-value={"call"}
                        onClick={(e) => {
                          const { myValue } = e.currentTarget.dataset;
                          console.log(myValue); // --> 123
                          handleMenuButtonClick();
                        }}
                      >
                        Call
                        <div
                          style={{ justifyContent: "flex-end" }}
                          className="d-flex w-100 "
                        >
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </div>
                        <Collapse in={open.name} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemText primary={} />
                            </ListItem>
                          </List>
                        </Collapse>
                        {/* <Collapse in={open} timeout="auto" unmountOnExit>
                          <WhatsNext />
                        </Collapse> */}
                      {/* </MenuItem> */}

                      {/* <MenuItem
                        data-my-value={"sms"}
                        onClick={(e) => {
                          const { myValue } = e.currentTarget.dataset;
                          console.log(myValue); // --> 123
                          handleMenuButtonClick();
                        }}
                      >
                        SMS
                        <div
                          style={{ justifyContent: "flex-end" }}
                          className="d-flex w-100 "
                        >
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </div>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemText primary="Send SMS" />
                            </ListItem>
                          </List>
                        </Collapse>
                      </MenuItem> */}
                    </Menu>
                  </td>
                  <td scope="row">{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{" PKR"}</td>
                  {/* <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td> */}
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>
                    <Chip label={"---"} />
                  </td>

                  {/* <td>{item.inventory.inventory_name}</td> */}
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>
                  <td>{"---"}</td>

                  <td>
                    <Button>Update</Button>
                  </td>
                </tr>
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
