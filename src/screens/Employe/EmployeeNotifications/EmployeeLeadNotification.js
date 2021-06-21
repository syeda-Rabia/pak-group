import {
  faUpload,
  faEye,
  faPlay,
  faPause,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
  Fab,
} from "@material-ui/core";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "./../../../utils/KeyboardTimePickerExample";
import { Alert } from "@material-ui/lab";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
// import { token } from "../../../utils/Config";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST, formatDate } from "../../../utils/Functions";
import AdminActionStepper from "./../../../components/adminActionStepper";
import PreLoading from "./../../../components/PreLoading";
import EmployeeMobileViewSidebar from "./../../../components/Sidebar/EmployeeMobileViewSidebar";
import "./../Leads/EmployeeLeads.css";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  chipGracePeriod: {
    color: "#fff",
    backgroundColor: "red !important",
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
  chipShifted: {
    color: "#fff",
    backgroundColor: "#CEAAC3 !important",
  },
  chipLoss: {
    color: "#fff",
    backgroundColor: "#AC917A !important",
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

function EmployeeLeadsNotification(props, lead_id) {
  const [data, setData] = React.useState([]);
  const [allactions, setAllActions] = useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showModalAction, setShowModalAction] = React.useState(true);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [goback, setGoBack] = React.useState("leads");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  const [showErrorAlert, setShowErrorAlert] = React.useState("");
  const [postData, setPostData] = React.useState({});
  const [recordings, setRecordings] = React.useState([]);
  const [setPlay, setShowPlay] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState(null);
  const [showReset, setshowReset] = useState(false);
  const [filterurl, setFilterUrl] = React.useState("");

  const [IsFilter, setIsFilter] = useState(false);
  const [IsEmpty, setIsEmpty] = useState(false);

  const ref = useRef(null);
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
  const classes = useStyles();
  // const []

  // const handleMenuButtonClick = (event) => {};

  const leadID = props?.location?.data?.data;
  const ActionId = props?.location?.data?.adminAction;

  var closed=localStorage.getItem("data");
  let data1=JSON.parse(closed);
  console.log("-local lead---",data1)

  const handleFetchData = async () => {
    setIsLoading(true);
    let formData = {
      actions: data1.adminAction,
      ids: data1.data,
    };
    // let formData = {
    //   actions: ActionId,
    //   ids: leadID,
    // };
    let res = await POST(ApiUrls.GET_EMPLOYEE_NOTIFICATION_ON_LEAD, formData);
    console.log("-------------------------------", res);

    if (res?.success != false) {
      setData(res?.data?.showLead);
      setAllActions(res?.data?.adminAction);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [leadID, ActionId]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  
  const HandleAudioModule = ({
    recording,
    setActiveAudio,
    activeAudio,
    index,
    item,
  }) => {
    // console.log(recording,"Recording Audio")
    const [audioTune, setAudioTune] = useState(recording);
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
                  <b>File Name: </b>
                  {item.recording_file}
                </span>{" "}
                <span style={{ marginLeft: "50px" }}>
                  <b>Created Date :</b>{" "}
                  {item.created_at.toString().split("T")[0]}
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
  useEffect(() => {
    setRecordings((state) =>
      state.map((item) => {
        item.audio.pause();
        return item;
      })
    );
  }, [setPlay]);

  const ModalPlay = ({ item }) => {
    const [activeAudio, setActiveAudio] = React.useState({
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
  const Table = ({
    item,
    index,
    setShowModalAction,
    setValue,
    setRefresh,
    refresh,
    setPostData,
    userInfo,
    allocated,
  }) => {
    const [recordingFile, setRecordingFile] = React.useState(null);
    const [action, setAction] = React.useState("follow up");
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const [whatNext, setWhatNext] = React.useState(0);

    const classes = useStyles();

   
    // console.log(open, whatNext, index);
   

  
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setRecordingFile(file);
        console.log("selected File is -------,", file);
      });
    }, []);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop,
      accept: "audio/*",

      maxFiles: 1,
    });
  
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

    const LeadArray = [
      {
        name: "Clients",
        att: item.client_name,
      },
      {
        name: "Project",
        att: item.project.name,
      },
      {
        name: "Status",
        att:
          item.status != "" ? (
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
              label={item.status}
            />
          ) : (
            "-------"
          ),
      },
      {
        name: "TOC",
        att: item.time_to_call != null ? item.time_to_call : "-------",
      },
      {
        name: "Deadline",
        att: item.dead_line != null ? item.dead_line : "-------",
      },

      {
        name: "Email",
        att: item.email != null ? item.email : "-------",
      },
     
     
    ];
    // let created_date=item.created_at;
    return (
      <>
        {LeadArray.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.att}</td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <Container fluid className="Laa">
      {/* <PreLoading startLoading={isLoading} /> */}
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1 ">
        <Col lg={12} sm={12} xs={12} xl={12}>
          <h3 style={{ color: "#818181" }}>Notification on lead</h3>
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

      <Row className=" shadow p-3  bg-white rounded ml-1 mr-1">
        <div className="table-responsive  col-md-6 col-sm-12" ref={ref}>
          {data?.length > 0 ? (
            data?.map((lead, index) => (
              <table id="leadsTable" className="table table-hover shadow p-3 mb-3 bg-white rounded mt-4">
                <thead>
                  <tr>
                    <th scope="col">
                      <span style={{ color: "#818181" }}>Name</span>
                    </th>
                    <th scope="col">
                      <span style={{ color: "#818181" }}>values</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Table
                    item={lead}
                    // item={lead}
                    // allocated={item.allocated_to}
                    index={index}
                    setShowModalAction={setShowModalAction}
                    setValue={setValue}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setPostData={setPostData}
                    userInfo={props.userInfo}
                  />
                </tbody>
              </table>
            ))
          ) : (
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
          {data?.length > 0 && selectedID !== null ? (
            <>
              <ModalPlay item={data[selectedID]} />
            </>
          ) : null}
         
        </div>
        <div className="col-md-6 col-sm-12">
          {allactions?.length > 0 ? (
            <AdminActionStepper data={allactions[0]} />
          ) : null}
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
export default connect(mapStateToProps)(EmployeeLeadsNotification);
