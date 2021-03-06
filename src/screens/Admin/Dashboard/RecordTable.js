import "./RecordTable.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useEffect, useState, useRef  } from "react";
// import React, { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import { GET,POST} from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import { Link, Route } from "react-router-dom";
import CTAButton from "../../../components/CTAButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Paper,
  makeStyles,
  Backdrop,
  CircularProgress,
  Input,
  Select,
  MenuItem,
  Skeleton,
  Chip,
  Fab,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faLessThanEqual,
  faCheckDouble,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
  
} from "../../../utils/KeyboardTimePickerExample";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ReactTooltip from "react-tooltip";
import FaceIcon from "@material-ui/icons/Face";
import { publicURL } from "./../../../utils/Config";
import { Modal } from "react-bootstrap";
import { validateEmail, validateMobile } from "../../../utils/Validation";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import { Alert } from "@material-ui/lab";
import PreLoading from "../../../components/PreLoading";
export default function RecordTable() {
  const [data, setData] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  const totalCount = data?.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [filterData, setFilterData] = React.useState("All");
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [setPlay, setShowPlay] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data?.slice(istIndex, lastIndex);
  const [recordings, setRecordings] = useState([]);
  const [value, setValue] = useState("");
  const [goback, setGoBack] = React.useState("dashboard"); 
  const ref = useRef(null);
  var today = new Date();
  const [open, setOpen] = React.useState(false);
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
    chipGracePeriod: {
      color: "#fff",
      backgroundColor: "#FF5555 !important",
    },
    chipComplete: {
      color: "#fff",
      backgroundColor: "#67B367 !important",
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
    chipLoss: {
      color: "#fff",
      backgroundColor: "#AC917A !important",
    },
    chipLabelColor: {
      color: "black",
    },
  }));
  const colors = {
    New: {color: '#E0E0E0', textColor: 'black'},
    Overdue: {color: '#DBAD73', textColor: 'black'},
    "Grace Period": {color: '#F19595', textColor: 'black'},
    Complete: {color: '#99CB99', textColor: 'black'},
    Loss: {color: '#C8B6A7', textColor: 'black'},
    Allocated: {color: '#A0C5E2', textColor: 'black'},
  };
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
    if (res?.success !== false) {
      // console.log(res?.data?.leads,"LET's See what you got",res?.data?.leads?.filter((item)=>item?.lead!=null));

      setData(res?.data?.leads?.filter((item)=>item.lead!=null));
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchEmployeesLeads();
  }, [filterData]);
  const handleFetchRequest = async () => {
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    // console.log(res);

    if (res?.success != false) {
      setEmployees(res?.data?.users?.data);
      setFilterData(res?.data?.users?.data[0].id);
    }
  };
  React.useEffect(() => {
    handleFetchRequest();
  }, []);
  useEffect(() => {
    // setIsLoading(true);
    handleFetchEmployeesLeads();
    FetchInterestData();
  }, [refresh]);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const FetchInterestData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_INTEREST);
    // console.log("-----", res);
    if (res?.success != false) {
      setInterestList(res?.data?.Interest);
    }
    setIsLoading(false);
  };
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
  const HandleAudioModule = ({
    recording,
    setActiveAudio,
    activeAudio,
    index,
    item,
  }) => {
    // console.log(recording,"Recording Audio")
    const [audioTune, setAudioTune] = useState((recording));
    // const [playAudio,setPlayAudio]=useState(false)
    if (index != activeAudio.index) audioTune.pause();
    useEffect(() => {
      //  setAudioTune( new Audio(recording));
      audioTune.load();
    }, []);
   
    const playSound = () => {
      audioTune.play();
      // setPlayAudio(true)
      setActiveAudio({ index: index, playState: true });

      // audioTune2.pause();

      // setPlayAudio2(false);
    };

    const pauseSound = () => {
      audioTune.pause();
      // setPlayAudio(false)
      setActiveAudio({ index: index, playState: false });
    };
    const isActive = () => {
      if (activeAudio.index == index) return activeAudio.playState;
      else return false;
    };
    return (
      <Card
        className="shadow  bg-white rounded "
        style={{ width: "80%", height: "40px", marginLeft: "35px" }}
      >
        <Card.Body>
          {/* <Ticker>
      {({ index }) => (
          <>
               <span className="spn1">2011/10/09</span>
               <span className="spn2">Recording {index}
          </>
      )}
  </Ticker> */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p className="marquee">
              <span
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                {" "}
                <span>
                  <b>Created Date :</b> {item.created_at}
                </span>{" "}
                <span style={{ marginLeft: "50px" }}>
                  <b>File Name: </b>
                  {item.recording_file}
                </span>{" "}
              </span>

              {/* <span className="spn1">
                2011/10/09 {item.recordings[0].recording_file} {"       "}  2011/10/09 {item.recordings[0].recording_file}
              </span> */}
              {/* <span className="spn1">
                2011/10/09 {item.recordings[0].recording_file}
              </span> */}
            </p>

            {/* <p className="marquee"><span  className="spn2">{item.recordings[0].recording_file}</span></p> */}

            {/* <span className="spn1">2011/10/09</span> */}
            {/* <span className="spn2">{item.recordings[0].recording_file}</span> */}
            {/* <span className="spn2">Recording {index} */}
            {/* <ReactTicker
          index={item.recordings[0].recording_file}
          /> */}
            {/* </span> */}
            {isActive() ? (
              <button
                type="button"
                className="bg-transparent  button-focus mr-2 button-bg"
                onClick={pauseSound}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
              </button>
            ) : (
              <button
                type="button"
                className="bg-transparent  button-focus mr-2 button-bg"
                onClick={playSound}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };
  useEffect(()=>{
    setRecordings(state=>state.map((item)=>{
        item.audio.pause();
      return item;
    }))
  },[setPlay])
  const ModalPlay = ({ item }) => {
    const [activeAudio, setActiveAudio] = useState({
      index: 0,
      playState: false,
    });

    return (
      <Modal
        show={setPlay}
        onHide={() => {
          setShowPlay(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Recordings</Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <Modal.Body>
            {recordings.map((recording, index) => {
              // const audioTune = new Audio(recording);

              return (
                <HandleAudioModule
                  recording={recording.audio}
                  activeAudio={activeAudio}
                  index={index}
                  setActiveAudio={setActiveAudio}
                  item={recording.item}
                />
              );
            })}
            {/* <Card
              className="shadow  bg-white rounded "
              style={{
                width: "80%",
                height: "40px",
                marginTop: "20px",
                marginLeft: "35px",
              }}
            >
              <Card.Body>
                <span className="spn1">31/12/2020</span>
                <span className="spn2">Recording 2</span>
                {playAudio2 ? (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={pauseSound2}
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: 15 }}
                      icon={faPause}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={playSound2}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                  </button>
                )}
              </Card.Body>
            </Card>
        */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowPlay(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  const ModalEdit = ({ item }) => {
    // console.log(
    //   "____________________________________________________________________",
    //   item
    // );

    const [time, setTime] = useState(timee);
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState(item.lead.project.id);
    const [interestID, setInterestID] = useState();
    const [allSource, setAllSource] = useState([
      "Newspaper",
      "Digital Marketing",
      "Other",
      "TV",
      "Personal Personal",
      "SMS",
      "Outdoor",
    ]);

    const [selectedSource, setSelectedSource] = useState(item.lead.source);

    const [client, setClient] = useState(item.lead.client_name);
    const [contact, setContact] = useState(item.lead.contact);
    const [budget, setBudget] = useState(item.lead.budget);

    const [country, setCountry] = useState(item.lead.country_city);
    // const [status, setStatus] = useState("New");
    const [interest, setInterest] = useState(item.lead.interest.interset);

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState(item.lead.email);
    const [task, setTask] = useState("Sale");
    const [deadline, setDeadline] = useState("");
    const [source, setSource] = useState("newspaper");
    const [innerLoading, setInnerLoading] = useState(false);

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      setTime(res);
    };
    useEffect(() => {
      setInnerLoading(true);
      getProjectDetails();
    }, []);

    useEffect(() => {
      getInventroyDataAgaintsProject(project);
    }, [project]);

    const getProjectDetails = async () => {
      let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

      if (resp.data != null) {
        setAllProjects(resp.data.projects.data);
      }
      setInnerLoading(false);

      // console.log(
      //   "response in Leads ------",
      //   JSON.stringify(resp.data.users.data)
      // );
    };

    const getInventroyDataAgaintsProject = async (id) => {
      let resp = await GET("admin/inventory/all/" + id);

      if (resp.data != null) {
        let { inventories } = resp.data;
        setInterest(inventories);
      }
      //  ;
    };

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // send data to server
      let formData = {
        id: item.lead.id,
        client_name: client,
        contact: contact,
        source: selectedSource,
        phone: contact,
        email: email,
        interest_id: interestID,
        project_id: project,
        budget: budget,
        country_city: country,
        time_to_call: time,
      };

      let resp = await POST(ApiUrls.EDIT_LEAD, formData);
      // console.log(resp,"response--------------------------------------",formData,);

      if (resp.error === false) {
        setMessage("Lead Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Edited");
        setShowErrorAlert(true);
      }
      // let arr = data.map((val) => {
      //   if (val.id ==formData.id) val = formData;
      //   return val;
      // });
      
      // arr.push(inventory);
    // setData(arr);
      setRefresh(!refresh);

      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        {innerLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}

        <Modal.Header
          closeButton
          // className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Lead</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            SendRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Col>
                  <div className="pb-3">
                    <h6>Client</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter  Name"
                      type="text"
                      value={client}
                      onChange={(e) => {
                        setClient(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Contact</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter Contact"
                      type="tel"
                      minLength="11"
                      maxLength="11"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Email</h6>
                    <Input
                      required="true"
                      error={emailError ? true : false}
                      className="form-control input-width w-100"
                      placeholder="Enter email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (validateEmail(e.target.value)) {
                          // DO Somtin
                          setEmailError(false);
                        } else {
                          // do some
                          setEmailError(true);
                        }
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Country_City</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Time of Call</h6>
                    <KeyboardTimePickerExample
                      value={today}
                      showTime={HandleTimeValue}
                      // onChange={(e) => {
                      //   setTime(formatDate(e.target.value));
                      //    ;
                      // }}
                    />
                  </div>
                </Col>
                <Col className="ml-3">
                  <div className="pb-3">
                    <h6>Project</h6>
                    {/* <TextField defaultValue={item.project.name} /> */}
                    <Select
                      className="form-control form-control-sm w-100"
                      defaultValue={item.lead.project.id}
                      onChange={(e) => {
                        // console.log(
                        //   "select project ID is -----",
                        //   e.target.value
                        // );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects.length > 0
                        ? allProjects.map((pro) => (
                            <MenuItem key={pro.id+"project"} value={pro.id}>
                              {pro.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="pb-3">
                    <h6 style={{ marginTop: 7 }}>Interest</h6>

                    <Select
                      className="form-control form-control-sm w-100"
                      defaultValue={
                        item.lead.interest !== null ? item.lead.interest_id : null
                      }
                      onChange={(e) => {
                        // console.log(
                        //   "selected Inventriry is ---- ",
                        //   e.target.value
                        // );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList.length > 0 ? (
                        interestList.map((int, index) => (
                          <MenuItem key={int.id+"interest id"} value={int.id}>
                            {int.interest}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>No Inventory Against this Project.</em>
                        </MenuItem>
                      )}
                    </Select>
                  </div>

                  {/* <div className="pb-3">
                  <h6>Task</h6>
                  <Select
                    value={task}
                    onChange={(e) => {
                      setTask(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"rent"}>Rent</MenuItem>
                    <MenuItem value={"other"}>other</MenuItem>
                  </Select>
                </div> */}

                  <div className="pb-3">
                    <h6>Budget</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Budget"
                      type="text"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Source</h6>
                    <Select
                      defaultValue={item.lead.source}
                      // value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <MenuItem key={src+"menu items"} value={src}>
                              {src}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Close
              </Button>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalView = ({ item }) => {
    // console.log(
    //   "____________________________________________________________________",
    //   item
    // );

    const [client, setClient] = useState(item.lead.client_name);
    const [contact, setContact] = useState(item.lead.contact);
    const [budget, setBudget] = useState(item.lead.budget);
    const [project, setProject] = useState(item.lead.project.name);

    const [country, setCountry] = useState(item.lead.country_city);
    // const [status, setStatus] = useState("New");

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState(item.lead.email);

    return (
      <Modal
        show={showView}
        onHide={() => {
          setShowView(false);
        }}
      >
        <Modal.Header
          closeButton
          // className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Lead Record</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Col>
                <div className="pb-3">
                  <h6>Client</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100 "
                    placeholder="Enter  Name"
                    type="text"
                    value={client}
                  />
                </div>
                <div className="pb-3">
                  <h6>Contact</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100 "
                    placeholder="Enter Contact"
                    type="tel"
                    minLength="11"
                    maxLength="11"
                    value={contact}
                  />
                </div>
                <div className="pb-3">
                  <h6>Email</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    error={emailError ? true : false}
                    className="form-control input-width w-100"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                  />
                </div>
                <div className="pb-3">
                  <h6>Country_City</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={country}
                  />
                </div>
                <div className="pb-3">
                  <h6>Time of call</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={item.lead.time_to_call}
                  />
                </div>
                {/* <div className="pb-3">
                  <h6>Allocated to</h6>
                  <Input
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={
                      item.allocation.length > 0
                        ? item.allocation[0].allocated_to.first_name
                        : "-------"
                    }
                  />
                </div> */}
             
             
                <div className="pb-2">
                  <h6>Project</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={project}
                  />
                </div>
                </Col>
                <Col className="ml-3">
                <div className="pb-3">
                  <h6 style={{ marginTop: 7 }}>Interest</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    // placeholder=""
                    type="text"
                    defaultValue={
                      item.lead.interest !== null
                        ? item.lead.interest.interest
                        : "NO INTEREST"
                    }
                  />
                </div>

                <div className="pb-3">
                  <h6>Budget</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Budget"
                    type="text"
                    value={budget}
                  />
                </div>

                <div className="pb-3">
                  <h6>Source</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item.lead.source}
                  />
                </div>
                <div className="pb-3">
                  <h6>Deadline</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    type="text"
                    defaultValue={
                      item.lead.dead_line != null ? item.lead.dead_line : "-------"
                    }
                  />
                </div>
                <div className="">
                  <h6>Status</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item.lead.status}
                  />
                </div>
              </Col>
            </div>
          </Modal.Body>
          <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowView(false);
                }}
              >
                Close
              </Button>
              
            </Modal.Footer>
        </div>
      </Modal>
    );
  };
const ModalClose = ({ item }) => {
    // console.log(item);
    const [checked, setChecked] = React.useState({ index: 0});
    const showText = ["Lead successfully Completed", "Lead Loss"];
    const handleChecked = (event, id) => {
      setChecked({ index: id});
    };
    const SendRecordToServer = async (event) => {
      // event.preventDefault();
      let resp = await POST(ApiUrls.POST_CLOSE_OR_WIN_LEAD, {
      
        lead_id: item.lead.id,
       
        status:checked.index==0?"Complete":"Loss",
      
      });
      if (resp.error === false) {
        setMessage("Lead closed Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead not closed");
        setShowErrorAlert(true);
      }
      setIsLoading(false);
      setRefresh(!refresh);
      // console.log("-------resp----",resp);
      // let resp = await GET(ApiUrls.BLOCK_USER + item.id + "/" + isBlocked);
      // console.log(resp);
      // // ;
      // if (resp.error == false) {
      //   setMessage("User Blocked Successfully");
      //   setShowAlert(true);
      // } else {
      //   setMessage("you does not have the authority to block an admin");
      //   setErrorAlert(true);
      // }
      // //   setUserRecord((state) => [formData].concat(state));
      // // } else {
      // //    ;
      // //   setErrorAlert(true);
      // // }

      // // setIsLoading(false);
      // setTimeout(() => {
      //   setRefresh(!refresh);
      // }, 1000);
      // setShowBan(false);
    };
    return (
      <Modal
        show={showBan}
        onHide={() => {
          setShowBan(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Close Lead</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            Do you really want to Close this Lead!
            {showText.map((item, index) => {
        return (
          <div key={index+"checkbox"}>
            <Checkbox
              checked={checked.index === index}
              color="primary"
              onChange={(e) => {
                handleChecked(e, index);
              }}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {item}
          </div>
        );
      })}
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowBan(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={(e) => {
                SendRecordToServer(e);
                setShowBan(false);
              }}
            >
              Done
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    // console.log(item);
    const DeleteRecordFromData = async () => {
      // setIsLoading(true);
      let res = await GET(ApiUrls.DELETE_LEAD + item.lead.id);
      // console.log("error response",res);
      if (res.error === false) {
        setMessage("Lead Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Deleted");
        setShowErrorAlert(true);
      }
      setIsLoading(false);
      setRefresh(!refresh);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Delete Record</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>Do you really want to delete this Record!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                DeleteRecordFromData();
                setShowDelete(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  const TableRow = ({ index, item, allocated }) => {
    // console.log(item,"rabia");
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr style={{backgroundColor: colors[item?.status]?.color, color: colors[item?.status]?.textColor}}>
         <td> {item.action=="Follow Up"?(
 <FontAwesomeIcon style={{ fontSize: 15,color:"yellow",marginLeft:"5px" }} icon={faCheckCircle} />
          ):null}</td>
        <td scope="row" key={index + 1+"tableRow"}>
          {index + 1}
        </td>
        <td>{item?.client_name}</td>

        <td>{item?.contact}</td>
        <td>{item?.email}</td>
        <td>{item?.project?.name}</td>
        <td>{item?.budget}</td>
        <td>{item?.interest != null ? item?.interest?.interest : "-------"}</td>
        <td>{item?.time_to_call != null ? item?.time_to_call : "-------"}</td>
        <td>{item?.country_city}</td>
        <td>{item?.source}</td>
        <td>
          {item?.status != "" ? (
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
                    : item.status === "Loss"
                    ? classes.chipLoss
                    : null,
              }}
              label={item?.status}
            />
          ) : (
            "-------"
          )}
          </td>
        {/* <td>
          {item.allocation.length > 0 ? (
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item.allocation[0].allocated_to.first_name}
              style={{ marginRight: "5px" }}
            />
          ) : (
            "-------"
          )}
        </td> */}

        {/* <td>{item.inventory.serial_no}</td> */}
        {/* <td>--------------</td> */}
        {/* <td>{item.inventory.inventory_name}</td> */}
       
        <td>{item?.project?.category.name}</td>
        <td>{item?.dead_line}</td>
        <td>
          <Link to={{ pathname: "/admin/emp-action", query: { item }, goback:{goback} }}>
            <button
              data-tip
              data-for="act"
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
          <ReactTooltip id="act" place="top" effect="solid">
          Actions on Lead
          </ReactTooltip>
        </td>
        <td>
          {item?.recordings?.length > 0 ? (
            <>
              <button
                data-tip
                data-for="play"
                type="button"
                className="bg-transparent  button-focus mr-2"
                onClick={() => {
                  // isLoading(true);
                  // let arr=[sample,sample,sample];
                  setRecordings(item.recordings.map((item)=>{return {audio:(new Audio(publicURL + item.recording_file)),item:item}}));
                  setShowPlay(true);
                  setSelectedID(index);
                }}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
              </button>
              <ReactTooltip id="play" place="top" effect="solid">
                play
              </ReactTooltip>
            </>
          ) : (
            "-----"
          )}
        </td>

        <td>
        {/* {item?.allocation?.length > 0 ? ( */}
            {item.status!=="Complete" && item.status!=="Loss"?(
             
          <CTAButton lead_id={item?.id} 
          empId={allocated?.id}
          deadline={item?.deadline}/>
          ):"------" 
          /* : (
          "-------" */
        }
        </td>
        <td>
          <div className="d-flex d-inline">
            <button
              data-tip
              data-for="delete"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            <ReactTooltip id="delete" place="top" effect="solid">
              View Details
            </ReactTooltip>
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2 ml-2"
              onClick={() => {
                setShowEdit(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip>
            <button
              data-tip
              data-for="DeleteTip"
              type="button"
              className="bg-transparent  button-focus ml-2"
              onClick={() => {
                setShowDelete(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip>
            <button
              data-tip
              data-for="close"
              type="button"
              className="bg-transparent  button-focus ml-2"
              onClick={() => {
                setShowBan(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faCheckDouble} />
            </button>
            
             <ReactTooltip id="close" place="top" effect="solid">
              Close Lead
            </ReactTooltip> 
          </div>
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
            // console.log(e.target.value);
            setFilterData(e?.target?.value);
          }}
        >
          {employees?.map((item) => {
            return <option value={item?.id+"itemid"}>{item?.first_name}</option>;
          })}
        </select>
      </div>
      <PreLoading startLoading={isLoading} />

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={message}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={message}
        closeError={setShowErrorAlert}
      />
      <div className="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
             
       
            <div className="table-responsive" style={{height: "500px", overflow: "auto"}} ref={ref}>
                {/* <div className="float-right floatingbtn" style={{display:"flex",justifyContent:"space-between",zIndex:100}}>
       
       <div style={{paddingRight:10}}>
         <Fab
           className={classes.fab}
           onClick={() => scroll(-50)}
           color="primary"
           aria-label="left"
           style={{inlineSize:"34px",blockSize:"26px",backgroundColor:"#2258bf"}}
         >
           <ChevronLeftIcon style={{}}/>
         </Fab>

       </div>
       <div style={{paddingRight:10}}>
       <Fab
           className={classes.fab}
           
           onClick={() => scroll(50)}
           color="primary"
           aria-label="right"
           style={{inlineSize:"34px",blockSize:"26px",backgroundColor:"#2258bf"}}
         >
           <ChevronRightIcon />
         </Fab>

       </div>
       
       </div> */}
              <table
                className="table table-hover"
                style={{
                  // minHeight: "320px",
                  minHeight: data?.length > 0 ? "220px" : "0px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                  <th scope="col" >
                      <span  style={{ color: "#818181" }}>{""}</span>
                    </th>
                    <th scope="col" >
                      <span id="sp" style={{ color: "#818181" }}>ID</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Clients</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Contacts</span>
                    </th>
                    <th>
                      <span id="sp" style={{ color: "#818181" }}>Email</span>
                    </th>
                    <th>
                      <span id="sp" style={{ color: "#818181" }}>Project</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Budget</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Interest</span>
                    </th>
                    <th scope="col" className="text-nowrap">
                      <span id="sp" style={{ color: "#818181" }}>Time to Call</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Country/City</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Source</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Status</span>
                    </th>
                    {/* <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Allocated_To</span>
                    </th> */}
                   
                    
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Task</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Deadline</span>
                    </th>
                    <th scope="col" className="text-nowrap">
                      <span id="sp" style={{ color: "#818181" }}> Action Summary</span>
                    </th>
                     <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Recordings</span>
                    </th>
                   
                    <th scope="col" className="text-nowrap">
                      <span id="sp" style={{ color: "#818181" }}>Call To Action</span>
                    </th>
                    <th scope="col">
                      <span id="sp" style={{ color: "#818181" }}>Action</span>
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
                  {data?.filter((item)=>item?.lead!=null).map((item, index) => {
                    return <TableRow index={index} item={item.lead} allocated={item?.allocated_to} />;
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
        {data?.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={data[selectedID]} />
            <ModalDelete item={data[selectedID]} />
            <ModalView item={data[selectedID]} />
            <ModalEdit item={data[selectedID]} />
            <ModalClose item={data[selectedID]} />
          </>
        ) : null}
        <Row>
          {/* <Col>
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
          </Col> */}
        </Row>
      </div>
    </>
  );
}
