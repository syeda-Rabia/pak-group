// import React from 'react';
import "../Leads/LeadsAdmin.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";
import { Link, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faRedo,
  faTimesCircle,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import sample from "./../../../assests/sample.mp3";
import sample2 from "./../../../assests/sample2.mp3";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { LeadsData } from "./../../../assests/constants/Leadsadmindata";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import { Divider } from "antd";
import { publicURL } from "./../../../utils/Config";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import EmployeeActionStepper from "./../../../components/EmployeeActionStepper";
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Input,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Slide,
  Chip,
  Fab,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { validateEmail, validateMobile } from "../../../utils/Validation";
import CTAButton from "../../../components/CTAButton";
import ReactTicker from "../../../components/Ticker/ReactTicker";
import Ticker from "react-ticker";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import { Alert } from "@material-ui/lab";
import PreLoading from "../../../components/PreLoading";
import Pagination from "../../../components/Pagination/Pagination";
import nodata from "./../../../assests/nodata.png";
import "react-phone-number-input/style.css";
// import PhoneInput from 'react-phone-number-input';
const useStyles = makeStyles((theme) => ({
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
  fab: {
    backgroundColor: "rgb(34, 88, 191)",
    marginRight: "15px",
  },
}));

export default function LeadsAdmin(props) {
  const [allLeads, setAllLeads] = useState([]);
  const [allactions, setAllActions]=useState([]);

  const [showAdd, setShowAdd] = useState(false);

  // const audioTune = new Audio(sample);
  // const audioTune2 = new Audio(sample2);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [setPlay, setShowPlay] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [checked, setChecked] = React.useState({ index: 0 });
  const [showActive, setShowActive] = useState(false);
  const [filterurl, setFilterUrl] = React.useState("");

  const [goback, setGoBack] = React.useState("leads");
  const [select, setSelect] = React.useState([]);
  const [showReset, setshowReset] = useState(false);
  const [IsFilter, setIsFilter] = useState(false);
  const [IsEmpty, setIsEmpty] = useState(false);
  const history = useHistory();
  var today = new Date();
  const [recordings, setRecordings] = useState([]);
  const ref = useRef(null);

  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const classes = useStyles();
  const leadID=props?.location?.data?.data;
  const ActionId=props?.location?.data?.empAction;
  useEffect(() => {
    setIsLoading(true);
    getAllLeadsData();
    
  }, [leadID,ActionId]);

 

  const getAllLeadsData = async () => {
    //  ;

    let resp = await GET(ApiUrls.GET_ADMIN_NOTIFICATION_ON_LEAD+ "/" +leadID+"/"+"empAction"+"/"+ActionId);

    if (resp.data.showLead != null) {
      setAllLeads(resp.data.showLead);
      setAllActions(resp.data.empAction)
    }
    setIsLoading(false);

    //  ;
    //  ;
  };

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "PKR";
  };
  //  console.log(currencyFormat(2665));

  const ModalClose = ({ item }) => {
    // console.log(item);
    const [checked, setChecked] = React.useState({ index: 0 });
    const showText = ["Lead successfully Completed", "Lead Loss"];
    const handleChecked = (event, id) => {
      setChecked({ index: id });
    };
    const SendRecordToServer = async (event) => {
      // event.preventDefault();
      let resp = await POST(ApiUrls.POST_CLOSE_OR_WIN_LEAD, {
        lead_id: item.id,

        status: checked.index == 0 ? "Complete" : "Loss",
      });
      if (resp.error === false) {
        setAlertMessage("Lead closed Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Lead not closed");
        setShowErrorAlert(true);
      }
      setIsLoading(false);
      setRefresh(!refresh);
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
                <div key={index}>
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

  const SelectData = async (event) => {
    event.preventDefault();
    let postData = {
      leadArray: select,
    };
    // let apendURL=select.map((item,id)=>`leadArray[${id}]=${item}`)
    let res = await POST(
      ApiUrls.DELETE_LEAD,
      postData
      // postData
    );
    // console.log("-------",postData,"---------", ApiUrls.DELETE_LEAD+`?${apendURL.join("&")}`,",,,,,,,,,,,,,,,,",res)
    if (res.error === false) {
      setMessage("Leads Deleted Successfully");
      setShowSuccessAlert(true);
    } else {
      setMessage("Operation Failed");
      setShowErrorAlert(true);
    }

    setRefresh(!refresh);
    setSelect([]);

    // let arr = data;
  };
  const LeadTable = ({ item, index }) => {
    // console.log(item);
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
        name: "Allocated_To",
        att:
          item.allocation?.length > 0 ? (
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item.allocation[0]?.allocated_to?.first_name}
              style={{ marginRight: "5px" }}
            />
          ) : (
            "-------"
          ),
      },
      {
        name: "Deadline",
        att: item.dead_line != null ? item.dead_line : "-------",
      },
      {
        name: "Recording",
        att:
          item.recordings?.length > 0 ? (
            <>
              <Tooltip placement="top-start" title="play">
                <button
                  data-tip
                  data-for="play"
                  type="button"
                  className="bg-transparent  button-focus mr-2"
                  onClick={() => {
                    // isLoading(true);
                    // let arr=[sample,sample,sample];
                    setRecordings(
                      item.recordings.map((item) => {
                        return {
                          audio: new Audio(publicURL + item.recording_file),
                          item: item,
                        };
                      })
                    );
                    setShowPlay(true);
                    setSelectedID(index);
                  }}
                >
                  <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                </button>
              </Tooltip>
              {/* <ReactTooltip id="play" place="top" effect="solid">
              play
            </ReactTooltip> */}
            </>
          ) : (
            "-----"
          ),
      },
      {
        name: "CTA",
        att:
          item.allocation?.length > 0 ? (
            <CTAButton
            // leadId={item.allocation[0].lead_id}
            empId={item.allocation[0].allocated_to.id}
            lead_id={item.id}
            deadline={item.dead_line}
            // status={item.status}
            />
          ) : (
            "-------"
          ),
      },
      {
        name: "Close Lead",
        att: (
          <div className="">
            <Tooltip placement="top-start" title="close lead">
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
                <FontAwesomeIcon
                  style={{ fontSize: 15 }}
                  icon={faCheckDouble}
                />
              </button>
            </Tooltip>
            {/* <ReactTooltip id="close" place="top" effect="solid">
          Close Lead
        </ReactTooltip> */}
          </div>
        ),
      },
    ];
    let country_city = "country/city";
    let created_date = item.created_at;
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
    <Container fluid>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Notification on Lead</h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <LeadsMobileViewSidebar update={props.update} />
          </div>
        </Col>
      </Row>

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

      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <div className="table-responsive col-md-6 col-sm-12" ref={ref}>
          <table className="table table-hover" style={{ minHeight: "200px" }}>
            <thead>
              <tr>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Name
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    values
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                allLeads.length > 0
                  ? allLeads.slice(0, 1).map((lead, index) => (
                      <>
                        <LeadTable item={lead} index={index} />

                        {/* <EmployeeActionStepper data={lead}/> */}
                      </>
                    ))
                  : null
                // (
                //   <Snackbar
                //     open={true}
                //     autoHideDuration={6000}
                //     // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                //     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                //   >
                //     <Alert variant="filled" severity="info">
                //       No Lead to Show
                //     </Alert>
                //   </Snackbar>
                // )
              }

              {/* <h1>Other Leads</h1>
                  {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-sm-12">
          {allactions.length > 0 ? (
            <EmployeeActionStepper data={allactions[0]} />
          ) : null}
        </div>
        {allLeads.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={allLeads[selectedID]} />

            <ModalClose item={allLeads[selectedID]} />
          </>
        ) : null}
      </Row>
    </Container>
  );
}
