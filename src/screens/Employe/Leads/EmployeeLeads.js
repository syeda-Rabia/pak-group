import React, { useCallback } from "react";
import "./EmployeeLeads.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload,faEye } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { GET, POST, formatDate,POSTFile } from "./../../../utils/Functions";
import { Link, Route } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import ApiUrls from "./../../../utils/ApiUrls";
import { server_url } from "./../../../utils/Config";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Chip,
  makeStyles,
  Menu,
  Collapse,
  List,
  Snackbar,
  ListItemText,
  ListItem,
} from "@material-ui/core";
// import {faEye} from "@fortawesome/free-solid-svg-icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import { token } from "../../../utils/Config";
import { useDropzone, Dropzone } from "react-dropzone";
import PreLoading from "../../../components/PreLoading";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";

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
  chipAllocated: {
    color: "#fff",
    backgroundColor: "#90caf9 !important",
  },
  chipLabelColor: {
    color: "black",
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
const Table = ({
  item,
  index,
  setShowModalAction,
  setValue,
  setRefresh,
  refresh,
  setPostData,
  userInfo,
}) => {
  const [recordingFile, setRecordingFile] = React.useState(null);
  const [action, setAction] = React.useState("follow up");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [whatNext, setWhatNext] = React.useState(0);

  const classes = useStyles();

  const [open, setOpen] = React.useState([
    {
      name: "Call",
      open: false,
      sub: [
        { name: "CALL RECIVED", set: false },
        { name: "CALL DECLINED", set: false },
        { name: "ASKED TO SEND WHATSAPP", set: false },
        { name: "ASKED TO SEND SMS", set: false },
        { name: "MEETING SCHEDULED", set: false },
      ],
    },
    {
      name: "SMS",
      open: false,
      sub: [{ name: "SMS SENT", set: false }],
    },
    {
      name: "Visit",
      open: false,
      sub: [
        { name: "VISIT SUCCESFULL", set: false },
        { name: "VISIT POSTPONED", set: false },
        { name: "VISIT CANCELED", set: false },
      ],
    },
    {
      name: "WhatsApp",
      open: false,
      sub: [{ name: "WHATSAPP SENT", set: false }],
    },
  ]);
  // console.log(open, whatNext, index);
  const handlePostData = (whatNext) => {
    let postDataArray = [];
    open.map((item, index) => {
      if (item.open == true) {
        // console.log("main is checked",index)
        postDataArray.push(item.name.toUpperCase());
        item.sub.map((sub, idx) => {
          if (sub.set == true) {
            // console.log("Sub is checked",idx)
            postDataArray.push(sub.name.toUpperCase());
          }
        });
      }
    });
    postDataArray.push(whatNext.toUpperCase());
    console.log("PostData is :", postDataArray);
    setPostData({ dataID: item, postData: postDataArray });

    if (whatNext == "REQUEST TO CLOSE") setValue("Request");
    else setValue("Meeting");
    setShowModalAction(true);
    setOpen([
      {
        name: "Call",
        open: false,
        sub: [
          { name: "CALL RECIVED", set: false },
          { name: "CALL DECLINED", set: false },
          { name: "ASKED TO SEND WHATSAPP", set: false },
          { name: "ASKED TO SEND SMS", set: false },
          { name: "MEETING SCHEDULED", set: false },
        ],
      },
      {
        name: "SMS",
        open: false,
        sub: [{ name: "SMS SENT", set: false }],
      },
      {
        name: "Visit",
        open: false,
        sub: [
          { name: "VISIT SUCCESFULL", set: false },
          { name: "VISIT POSTPONED", set: false },
          { name: "VISIT CANCELED", set: false },
        ],
      },
      {
        name: "WhatsApp",
        open: false,
        sub: [{ name: "WHATSAPP SENT", set: false }],
      },
    ]);

    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setRecordingFile(file);
      console.log('selected File is -------,',file);
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

    
      let formData={
        lead_id:item.id,
        recording_file: recordingFile
      };
// let formData = new FormData();
//     formData.append("lead_id", item.id);
    // formData.append("recording_file", recordingFile);
    console.log('form data is recordingFile ------------>',recordingFile);
    console.log('form data - recordingFile ------------>',formData.recording_file);

    let resp = await POST(ApiUrls.ADD_RECORDING, formData);             
    console.log("---------recording--------------",resp);
    console.log(resp);
    // for (var value of formData.values()) {
    //   console.log(value,"FormDATA");
    // }
    // await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
      // let token = JSON.parse(localStorage.getItem("token"));
    //   let resp=await POSTFile(ApiUrls.ADD_RECORDING, formData);
     
    // console.log("---------recording--------------",resp,formData);

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
      <td>{item.client_name}</td>
      <td>{item.contact}</td>
      <td>{item.project.name}</td>
      <td>{item.budget + " PKR"}</td>
      {/* <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td> */}
      <td>{item.time_to_call}</td>
      <td>{item.country_city}</td>

      <td>
        <Chip
          classes={{
            label: classes.chipLabelColor,
            root:
              item.status === "Overdue"
                ? classes.chipOverdue
                : item.status === "Grace Period"
                ? classes.chipGracePeriod
                : item.status === "Complete"
                ? classes.chipComplete
                : item.status === "Follow up"
                ? classes.chipFollowUp
                : item.status === "Allocated"
                ? classes.chipAllocated
                : null,
          }}
          label={item.status}
        />{" "}
      </td>

      {/* <td>{item.inventory.inventory_name}</td> */}
      <td>{"---"}</td>
      <td>
        {userInfo.first_name} {userInfo.last_name}
      </td>
      <td>{item.email}</td>
      <td>{item.task}</td>
      <td>{item.dead_line}</td>
      <td>
          <Link to= 
           {{ pathname: "/employee/admin-action", query: { item } }}
         >
            <button
              data-tip
              data-for="actionAdmin"
              type="button"
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   // setShowView(true);
              //   // setSelectedID(index);
              // }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
          </Link>
          <ReactTooltip id="actionAdmin" place="top" effect="solid">
            View Admin Action
          </ReactTooltip>
        </td>
      {/* <td>{"---"}</td> */}
      <td>
        <div
          style={{ outline: "none", height: "2rem",backgroundColor:'red'}}
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
      <td>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Actions
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
                onClick={async (e) => {
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
                            let dummy = arr[index].sub.map((subItems, i) => {
                              if (id == i) {
                                return SubMenu;
                              } else {
                                subItems.set = false;
                              }
                              return subItems;
                            });
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
                              onClick={() => {
                                handlePostData("SCHEDULE MEETING");
                              }}
                            >
                              <ListItemText primary="SCHEDULE MEETING" />
                            </ListItem>
                            <ListItem
                              className={classes.subNested}
                              button
                              onClick={() => {
                                handlePostData("CALL BACK");
                              }}
                            >
                              <ListItemText primary="CALL BACK" />
                            </ListItem>
                            <ListItem
                              className={classes.subNested}
                              button
                              onClick={() => {
                                handlePostData("COMING WITH TOKEN");
                              }}
                            >
                              <ListItemText primary="COMING WITH TOKEN" />
                            </ListItem>
                            <ListItem
                              className={classes.subNested}
                              button
                              onClick={() => {
                                handlePostData("REQUEST TO CLOSE");
                              }}
                            >
                              <ListItemText primary="REQUEST TO CLOSE" />
                            </ListItem>
                          </List>
                        </Collapse>
                      </ListItem>
                    </>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </Menu>
      </td>
      <td>
        <Button  onClick={() => {
              SendFileToServer();
            }}>Update</Button>
      </td>
    </tr>
  );
};
function EmployeeLeads(props, lead_id) {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showModalAction, setShowModalAction] = React.useState(true);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [postData, setPostData] = React.useState({});
  // console.log(postData, "YES", value);
  var today = new Date();
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // let currentTime =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // today = mm + "-" + dd + "-" + yyyy;
  today = yyyy + "-" + mm + "-" + dd;

  // const []

  // const handleMenuButtonClick = (event) => {};

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_USER_LEADS + props.userInfo.id);
    console.log("_________________", res);
    
    if (res.success != false) {
      setData(res.data.leads);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [refresh]);

  const ModalAction = ({ data }) => {
    const [message, setMessage] = React.useState("");
    const [time, setTime] = React.useState(timee);
    const [date, setDate] = React.useState(today);
    let timeVal = new Date();

    const SendMeetingData = async (e) => {
      e.preventDefault();
      let formData;
      if (value == "Meeting")
        formData = {
          lead_id: data.dataID.id,
          action_type: data.postData[0],
          select_option: data.postData[1],
          what_next: data.postData[2],
          date: date,
          time: time,
        };
      else
        formData = {
          lead_id: data.dataID.id,
          action_type: data.postData[0],
          select_option: data.postData[1],
          what_next: data.postData[2],
          comments: message,
        };
      setShowModalAction(false);
      let resp = await POST(ApiUrls.POST_EMPLOYEE_ACTION_ON_LEAD, formData);
      if (resp.error === false) {
        setAlertMessage("Send Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Not Send!");
        setShowErrorAlert(true);
      }

      console.log(resp, formData);
    };

    const handleChange = (value) => {
      setMessage(value);
    };
    const handleDateValue = (value) => {
      setDate(formatDate(value, "-"));
      console.log(formatDate(value, "-"));
    };
    const handleTimeValue = (value) => {
      const timeStr = value.toString();
      var time = timeStr.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
      setTime(time);
      console.log(time);
    };
    // if (options.title === optionsArray[0].title)
    //
    if (value === "Request") {
      return (
        <Modal
          show={showModalAction}
          onHide={() => {
            setShowModalAction(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter your Comment</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={() => {
              // SendInstructToServer
            }}
          >
            <Modal.Body>
              <TextField
                // variant="outlined"
                autoFocus
                margin="dense"
                multiline
                fullWidth
                required={true}
                label="Comment"
                value={message}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                // style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowModalAction(false);
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                value="Submit"
                // style={{ backgroundColor: "#2258BF" }}
                onClick={(e) => {
                  SendMeetingData(e);
                  setShowModalAction(false);
                }}
              >
                Send
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      );
    }
    // if (options.title === optionsArray[1].title)
    else if (value === "Meeting") {
      return (
        <Modal
          show={showModalAction}
          onHide={() => {
            setShowModalAction(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select date and time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={SendMeetingData}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box>
                  <KeyboardDatePickerExample
                    value={today}
                    showDate={handleDateValue}
                  />
                </Box>
                <br />
                <Box>
                  <KeyboardTimePickerExample
                    value={timeVal}
                    showTime={handleTimeValue}
                  />
                </Box>
              </Box>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalAction(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              // style={{ backgroundColor: "#2258BF" }}
              onClick={(e) => {
                SendMeetingData(e);
                setShowModalAction(false);
              }}
            >
              Set
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
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
      <PreLoading startLoading={isLoading} />

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={alertmessage}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={alertmessage}
        closeError={setShowErrorAlert}
      />
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
                      Admin_Action
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
              <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <Table
                    item={item.lead}
                    index={index}
                    setShowModalAction={setShowModalAction}
                    setValue={setValue}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setPostData={setPostData}
                    userInfo={props.userInfo}
                  />
                ))) : (
                  <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert variant="filled" severity="info">
                      No Lead to Show
                    </Alert>
                  </Snackbar>
                )}
  
              
              </tbody>
            </table>
            <ModalAction data={postData} />
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
