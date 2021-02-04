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
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import { GET, POST, formatDate } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
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
  ListItemText,
  ListItem,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { token } from "../../../utils/Config";
import { useDropzone, Dropzone } from "react-dropzone";
import PreLoading from "../../../components/PreLoading";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";

const Table = ({
  item,
  index,
  setShowModalAction,
  setValue,
  setRefresh,
  refresh,
  setPostData,
  userInfo
}) => {
  const [recordingFile, setRecordingFile] = React.useState(null);
  const [action, setAction] = React.useState("follow up");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [whatNext, setWhatNext] = React.useState(0);

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
  const classes = useStyles();

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
  // console.log(open, whatNext, index);
  const handlePostData = (whatNext) => {
    let postDataArray=[];
    open.map((item,index)=>{
        if(item.open==true){
          // console.log("main is checked",index)
          postDataArray.push(item.name.toUpperCase());
        item.sub.map((sub,idx)=>{
            if(sub.set==true){
              // console.log("Sub is checked",idx)
            postDataArray.push(sub.name.toUpperCase());
            }
          })
        }
      })
    postDataArray.push(whatNext.toUpperCase())
    console.log("PostData is :",postDataArray);
    setPostData({dataID:item,postData:postDataArray});
    
  
    if(whatNext=='Request to Close')
    setValue('Request')
    else
      setValue('Meeting')
      setShowModalAction(true);
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
    ])

    setAnchorEl(null)
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // setOpen([
    //   {
    //     name: "Call",
    //     open: false,
    //     sub: [
    //       { name: "Call Recieved", set: false },
    //       { name: "Call Declined", set: false },
    //       { name: "Asked To send WhatsApp", set: false },
    //       { name: "Asked To Send SMS", set: false },
    //       { name: "Meeting Scheduled", set: false },
    //     ],
    //   },
    //   {
    //     name: "SMS",
    //     open: false,
    //     sub: [{ name: "SMS Sent", set: false }],
    //   },
    //   {
    //     name: "Visit",
    //     open: false,
    //     sub: [
    //       { name: "Visit Successfully", set: false },
    //       { name: "Visit Postponed", set: false },
    //       { name: "Visit Canceled", set: false },
    //     ],
    //   },
    //   {
    //     name: "WhatsApp",
    //     open: false,
    //     sub: [{ name: "WhatsApp Sent", set: false }],
    //   },
    // ]);
    setAnchorEl(null);
  };
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
                onClick={async (e) => {
                  // setOpen([
                  //   {
                  //     name: "Call",
                  //     open: false,
                  //     sub: [
                  //       { name: "Call Recieved", set: false },
                  //       { name: "Call Declined", set: false },
                  //       { name: "Asked To send WhatsApp", set: false },
                  //       { name: "Asked To Send SMS", set: false },
                  //       { name: "Meeting Scheduled", set: false },
                  //     ],
                  //   },
                  //   {
                  //     name: "SMS",
                  //     open: false,
                  //     sub: [{ name: "SMS Sent", set: false }],
                  //   },
                  //   {
                  //     name: "Visit",
                  //     open: false,
                  //     sub: [
                  //       { name: "Visit Successfully", set: false },
                  //       { name: "Visit Postponed", set: false },
                  //       { name: "Visit Canceled", set: false },
                  //     ],
                  //   },
                  //   {
                  //     name: "WhatsApp",
                  //     open: false,
                  //     sub: [{ name: "WhatsApp Sent", set: false }],
                  //   },
                  // ]);
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
                  // handleMenuButtonClick();
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
                                handlePostData("Scheduled Meeting")
                              
                              }}
                              // onClick={() => {
                              //   const SubMenu = { ...listItem  };
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
                              onClick={() => {
                                handlePostData("Call Back")

                              }}
                            >
                              <ListItemText primary="Call Back" />
                            </ListItem>
                            <ListItem
                              className={classes.subNested}
                              button
                              onClick={() => {
                                handlePostData("Comming with Token")

                              }}
                            >
                              <ListItemText primary="Comming with Token" />
                            </ListItem>
                            <ListItem
                              className={classes.subNested}
                              button
                              onClick={() => {
                                handlePostData('Request to Close')

                              }}
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
      <td scope="row">{index+1}</td>
      <td>{item.client_name}</td>
      <td>{item.contact}</td>
      <td>{item.project.name}</td>
      <td>{item.budget+" PKR"}</td>
      {/* <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td> */}
      <td>{item.time_to_call}</td>
      <td>{item.country_city}</td>
      <td>
        <Chip label={item.status} />
      </td>

      {/* <td>{item.inventory.inventory_name}</td> */}
      <td>{"---"}</td>
      <td>{userInfo.first_name} {userInfo.last_name}</td>
      <td>{item.email}</td>
      <td>{item.task}</td>
      <td>{item.dead_line}</td>
      <td>{"---"}</td>
      <td>
        <Button>Update</Button>
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
  console.log(postData,"YES",value)
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

  // const handleMenuButtonClick = (event) => {};

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_USER_LEADS + props.userInfo.id);
    console.log(res);
    if (res.success != false) {
      setData(res.data.leads);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [refresh]);

  const ModalAction = ({data}) => {
    const [message, setMessage] = React.useState("");
    const [time, setTime] = React.useState(timee);
    const [date, setDate] = React.useState(today);
    let timeVal = new Date();

    const SendMeetingData = async (e) => {
      e.preventDefault();
      let formData;
      if(value=="Meeting")
       formData = {
        lead_id:data.dataID.id,
        action_type: data.postData[0],
        select_option: data.postData[1],
        what_next: data.postData[2],
      date:date,
      time:time,
      };
      else 
        formData = {
        lead_id:data.dataID.id,
        action_type: data.postData[0],
        select_option: data.postData[1],
        what_next: data.postData[2],
        comments:message
      };
      setShowModalAction(false);
      let resp = await POST(ApiUrls.POST_EMPLOYEE_ACTION_ON_LEAD, formData);
      if (resp.error === false) {
        setAlertMessage("Instruction Send Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Instruction Not Send!");
        setShowErrorAlert(true);
      }

      console.log(resp,formData);
    };
  
    const SendShitLeadToServer = async () => {
      let resp = await POST(ApiUrls.POST_EMPLOYEE_ACTION_ON_LEAD, {
        action_type: "shiftLead",
        lead_id: lead_id,
        // prev_lead_holder_emp: empId,
        // new_lead_holder_emp: selectedEmployee.new_lead_holder_emp,
      });
      if (resp.error === false) {
        setAlertMessage("Shift and Warn Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Shift and Warn  Failed");
        setShowErrorAlert(true);
      }
      console.log(resp);
    };

    const handleChange = (value) => {
      setMessage(value);
    };
    const handleDateValue = (value) => {
      setDate(formatDate(value,'-'));
      console.log(formatDate(value,'-'));
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
    }

    // if (options.title === optionsArray[2].title)
    // else if (value === "shift-and-Warn") {
    //   return (
    //     <Modal
    //       show={showModalAction}
    //       onHide={() => {
    //         setShowModalAction(false);
    //       }}
    //     >
    //       <Modal.Header closeButton>
    //         <Modal.Title>Shift and Warn</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <form onSubmit={SendShitLeadToServer}>
    //           <p>
    //             Do you really want to shift this lead to
    //             <b> {selectedEmployee.name}</b>.
    //           </p>
    //         </form>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <Button
    //           // style={{ backgroundColor: "#2258BF" }}
    //           onClick={() => {
    //             setShowModalAction(false);
    //           }}
    //         >
    //           Close
    //         </Button>
    //         <Button
    //           // style={{ backgroundColor: "#2258BF" }}
    //           onClick={(e) => {
    //             SendShitLeadToServer(e);
    //             setShowModalAction(false);
    //           }}
    //         >
    //           Send
    //         </Button>
    //       </Modal.Footer>
    //     </Modal>
    //   );
    // }
    else {
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
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <div className="table-responsive">
            <table id="leadsTable" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Action
                    </span>
                  </th>
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
              <tbody>
                {data.map((item, index) => (
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
                ))}
              </tbody>
            </table>
            <ModalAction data={postData}/>
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
