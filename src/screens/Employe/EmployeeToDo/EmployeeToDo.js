import React, { useCallback ,useState,useEffect,useRef } from "react";
import axios from 'axios';
import "./../Leads/EmployeeLeads.css";
import { Container, Row, Col, Button, Modal,Card } from "react-bootstrap";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "./../../../utils/KeyboardTimePickerExample";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload,faEye ,faPlay ,faPause,faRedo, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { GET, POST, formatDate,POSTFile } from "./../../../utils/Functions";
import { Link, Route } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import ApiUrls from "./../../../utils/ApiUrls";
import { server_url } from "./../../../utils/Config";
import { publicURL } from "./../../../utils/Config";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
// import {faEye} from "@fortawesome/free-solid-svg-icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import { token } from "../../../utils/Config";
import { useDropzone, Dropzone } from "react-dropzone";
import nodata from "./../../../assests/nodata.png";
import PreLoading from "../../../components/PreLoading";

import Pagination from "../../../components/Pagination/Pagination";
import EmployeeMobileViewSidebar from "../../../components/Sidebar/EmployeeMobileViewSidebar";

import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import ActionButton from "./../../../components/ActionButton";
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

const colors = {
  New: {color: '#E0E0E0', textColor: 'black'},
  Overdue: {color: '#DBAD73', textColor: 'black'},
  "Grace Period": {color: '#F19595', textColor: 'black'},
  Complete: {color: '#99CB99', textColor: 'black'},
  Loss: {color: '#C8B6A7', textColor: 'black'},
  Allocated: {color: '#A0C5E2', textColor: 'black'},

};
function EmployeeLeads(props, lead_id) {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showModalAction, setShowModalAction] = React.useState(true);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  const [showErrorAlert, setShowErrorAlert] = React.useState("");
  const [postData, setPostData] = React.useState({});
  const [recordings, setRecordings] = React.useState([]);
  const [setPlay, setShowPlay] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState(null);
  const [goback, setGoBack] = React.useState("todo");
  const [showReset, setshowReset] = useState(false);
  const [errorResponce, setErrorResponce] = useState("");
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

  /*  Pagination data  */

 const [pageSize, setPageSize] = React.useState(0);
 const [currentPage, setCurrentPage] = React.useState(0);
 const [pageCount, setPageCount] = React.useState(0);
 const [totalRecord, setTotalRecord] = React.useState(0);

 const lastIndex = currentPage * pageSize;
 const istIndex = lastIndex - pageSize;
 
 // const [page, setPage] = React.useState(2);
 const handlePageChange = async (page) => {
   /*
    Api Call
    
    */
   setIsLoading(true);
   let resp = await GET(ApiUrls.GET_USER_LEADS_PAGINATION+ page);

   if (resp?.data != null) {
     setCurrentPage(resp?.data?.leads?.current_page);
     setData(resp?.data?.leads?.data);
   }
   setIsLoading(false);
 };

 const handleShow = (pageCount) => {
   setPageCount(pageCount);
 };

 /*  Pagination data  end*/
  //filter pagination

  const [filterPageSize, setfilterPageSize] = React.useState(0);
  const [filtercurrentPage, setFilterCurrentPage] = React.useState(0);
  const [filterpageCount, setFilterPageCount] = React.useState(0);
  const [filtertotalRecord, setfilterTotalRecord] = React.useState(0);
 
  const filterlastIndex = filtercurrentPage * filterPageSize;
  const filteristIndex = filterlastIndex - filterPageSize;
  const handleFilterPageChange = async (page) => {
    /*
     Api Call
     
     */
 
    setIsLoading(true);
    
    let res =await GET(filterurl+"&& page="+page);
   
    if (res?.data != null) {
      setFilterCurrentPage(res?.data?.leads?.current_page);
      setData(res?.data?.leads?.data);
      setfilterPageSize(res?.data?.leads?.per_page);
      setfilterTotalRecord(res?.data?.leads?.total);
 
    }
    console.log("console log in filter pagination-------------------------------------->")
    setIsLoading(false);
  };
 
  const handleFilterShow = (filterpageCount) => {
    setFilterPageCount(filterpageCount);
  };
  //filter pagination end

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_USER_LEADS_PAGINATION );
    console.log("RESPONSE FROM SERVER -------------------------------", res);
    
    if (res?.success != false) {
      setData(res?.data?.leads?.data);
      setPageSize(res?.data?.leads?.per_page);
      setTotalRecord(res?.data?.leads?.total);
      setCurrentPage(res?.data?.leads?.current_page);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [refresh]);
  useEffect(() => {
    if (props?.searchData?.search == true) setFilterdata();
  }, [props?.searchData?.search]);

  const setFilterdata = async () => {
    setshowReset(true);
    setIsLoading(true); 
    
    let res = await GET(props.searchData.url);
    setFilterUrl(props?.searchData.url);
    console.log("-----", res);
    if (res?.error === false) {
      setData(res?.data?.leads?.data);

      setfilterPageSize(res.data?.leads?.per_page);
      setfilterTotalRecord(res.data?.leads?.total);
      setFilterCurrentPage(res.data?.leads?.current_page);
      setMessage("Lead find Successfully");
      setShowSuccessAlert(true);
      setIsFilter(true);
      setIsEmpty(false);
    } else if(res?.error?.hasOwnProperty("month"))
    {
      console.log("res.error.hasOwnProperty(month)");
      // setErrorResponce(resp.error);
      setMessage(res?.error?.month[0]);
      setShowErrorAlert(true);
      // setshowReset(false);
      setshowReset(true);
    setIsEmpty(true);
    
    }
    else if(res?.hasOwnProperty("error")){
      // setMessage(res.error);
      // setShowErrorAlert(true);
      // setshowReset(false);
      setshowReset(true);
    setIsEmpty(true);
    }
   
    setIsLoading(false);
  };


  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
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
      console.log("------respose-------",resp);
      if (resp.error === false) {
        setAlertMessage("Send Successfully");
        setShowSuccessAlert(true);
      } else if(resp.hasOwnProperty("error"))
      {
        // setErrorResponce(resp.error);
        setAlertMessage(resp.error);
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
                <span >
                  <b>File Name: </b>
                  {item.recording_file}
                </span>{" "}
                <span style={{ marginLeft: "50px" }}>
                  <b>Created Date :</b> {item.created_at.toString().split("T")[0]}
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
    const [recordingFile, setRecordingFile] = React.useState("");
    const [action, setAction] = React.useState("follow up");
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    // const [whatNext, setWhatNext] = React.useState(0);
  
    const classes = useStyles();
  
    const [open, setOpen] = React.useState([
      {
        name: "Call",
        open: false,
        sub: [
          { name: "CALL RECEIVED", set: false },
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
          { name: "VISIT SUCCESSFUL", set: false },
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
      setOpen( [
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
        console.log("recording file is",recordingFile);
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
  
      // let actionresp = await POST(ApiUrls.EMPLOYEE_ACTION, {
      //   id: item.id,
      //   action: action,
      // });
      // console.log(actionresp);
      // if (actionresp.error === false)  {
      //   setMessage("Lead updated Successfully");
      //   setShowSuccessAlert(true);
      // } else if(actionresp.hasOwnProperty("error"))
      // {
      //   // setErrorResponce(resp.error);
      //   setAlertMessage(actionresp.error);
      //   setShowErrorAlert(true);
      // }
      // if (actionresp.error.hasOwnProperty("allocated_to")) {
      //   alert("Action Field is required");
  
      //   // setErrorAlert(true);
      // }
      // setRefresh(!refresh);
      let token = JSON.parse(localStorage.getItem("token"));
      console.log('token ',JSON.stringify(token))
        let formData1={
          lead_id:item.id,
          recording_file: recordingFile,
        };
        // formData1 = JSON.stringify(formData1);
        console.log('Recording File in Send File to Server Function is ----------------------------------',recordingFile);
      let formData = new FormData();
      formData.append("lead_id", item.id);
      formData.append("recording_file", recordingFile);
      console.log('form data JSON ------------>',JSON.stringify(formData));
      // console.log('form data ITEM  ------------>',formData.item);
      // console.log('form data in Recording File ------------>',formData.recordingFile);
      // console.log('form data in Recording File ------------>',typeof recordingFile);


      // fetch('https://webhook.site/e5c1ac35-5004-468e-8cf1-609f30e73b04', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: JSON.stringify({
      //     formData,
      //   })
      // });

      // let resp = await POSTFile(formData); 
      // "https://webhook.site/e5c1ac35-5004-468e-8cf1-609f30e73b04"
      // let resp = await POST(ApiUrls.ADD_RECORDING, formData); 
      let uri = 'https://ova.technovier.com/api/'+ApiUrls.ADD_RECORDING;
      console.log('uri',uri );

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;multipart/form-data;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }
      };

      axios.post(uri,formData,
       axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        //  setAlertMessage(res.data.data.error.recording_file);
        setMessage("Recording submitted Successfully");
        setShowSuccessAlert(true);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        
        // setErrorResponce(resp.error);
        setAlertMessage("Recording not submitted ");
        setShowErrorAlert(true);
      })
      setRefresh(!refresh);
      console.log('login after error');
      
     
      // let resp =axios.post(uri, formData); 
    //   const resp = await axios({
    //     method: 'post',
    //     url: uri,
    //     formData: formData,
    //     headers: {
    //         'Content-Type': `multipart/form-data;`,
    //     },
    // });
     
      // if (resp.hasOwnProperty("success")) {
      //   setAlertMessage(resp.success);
      //   // setMessage("Recording submitted Successfully");
      //   setShowSuccessAlert(true);
      // } else if(resp.hasOwnProperty("error"))
      // {
      //   // setErrorResponce(resp.error);
      //   setAlertMessage(resp.error);
      //   setShowErrorAlert(true);
      // }
      // console.trace("---------recording--------------",resp);
      // console.log('000000000000000000000000000    ----->>> ',resp);
      // setRefresh(!refresh);

      // for (var value of formData.values()) {
      //   console.log(value,"FormDATA");
      // }
      // await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
        // let token = JSON.parse(localStorage.getItem("token"));
      //   let resp=await POSTFile(ApiUrls.ADD_RECORDING, formData);
       
      // console.log("---------recording--------------",resp,formData);
  
    };
    // const formatTime = () => {
    //   if (item?.time_to_call !== null) {
    //     let str = item?.time_to_call;
    //     let res = str.match(/(\d\d)/g);
    //     let hours = res[0];
    //     let min = res[1];
  
    //     let AmOrPm = hours >= 12 ? "pm" : "am";
    //     hours = hours % 12 || 12;
    //     return hours + ":" + min + " " + AmOrPm;
    //     //  ;
    //   }
    // };
    let created_date=item?.created_at;
    let current=allocated?.first_name;
    let user=userInfo?.first_name;
    if( item.status!=="Loss"  && item.status!=="Complete") {
        
    
    return (
     
      <tr style={{backgroundColor: colors[item.status]?.color, color: colors[item.status]?.textColor}}>
         <td> {item.action=="Follow Up"?(
 <FontAwesomeIcon style={{ fontSize: 15,color:"yellow",marginLeft:"5px" }} icon={faCheckCircle} />
          ):null}</td>
        <td scope="row">{index + 1}</td>
        <td>{item?.client_name}</td>
        <td>{item?.contact}</td>
        <td>{item?.project?.name}</td>
        <td>{item?.budget + " PKR"}</td>
        <td>{item?.time_to_call != null ? item?.time_to_call : "-------"}</td>
        {/* <td>{item.time_to_call}</td> */}
     
  
        <td>
        {item.status != "" ? (
            <Chip
              classes={{
                label: classes.chipLabelColor,
                root:
                  item?.status === "Overdue"
                    ? classes.chipOverdue
                    : item?.status === "Grace Period"
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
          )}
         
        </td>
  
        {/* <td>{item.inventory.inventory_name}</td> */}
        <td>{item?.interest?.interest}</td>
        {/* <td>
          {allocated?.first_name} 
           {userInfo.first_name} {userInfo.last_name} 
        </td> */}
       
        <td>
            <Link to= 
             {{ pathname: "/employee/admin-action", query: { item } ,goback:{goback}}}
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
            Actions on lead
            </ReactTooltip>
          </td>
        {/* <td>{"---"}</td> */}
       
        <td>
          {/* <div
            style={{ outline: "none", height: ""}}
            className="d-flex"
            {...getRootProps()}
          >
            <button className="bg-transparent  button-focus mr-2"><FontAwesomeIcon style={{ fontSize: 15 }} icon={faUpload} />Upload_file</button>
            <p className="pl-1">
              {acceptedFiles.map((file) => {
                return file.path;
              })}
            </p>
            <input {...getInputProps()} />
          </div> */}
          <input style={{ }} type="file" accept="audio/*" onChange={(e)=>{
            console.log('file choose successfully -------------------->',e.target.files[0]);
            setRecordingFile(e.target.files[0]);
          }} />
        </td>
        <td>
            {item.recordings.length > 0 ? (
              <>
                <button
                  data-tip
                  data-for="play"
                  type="button"
                  className="bg-transparent  button-focus mr-2"
                  onClick={() => {
                    // isLoading(true);
                    // let arr=[sample,sample,sample];
                    setRecordings(item?.recordings?.map((item)=>{return {audio:(new Audio(publicURL + item?.recording_file)),item:item}}));
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
        {/* <td><ActionButton style={{backgroundColor:"blue",color:"white"}}/></td> */}

        <td>
        {item.status!=="Loss"  && item.status!=="Complete" ? (
              <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Actions
          </Button>
          </>
          ):"----"}
          <Menu
          style={{overflow:"auto"}}
            // className={classes.root}
            id="simple-menu"
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            keepMounted
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
    transformOrigin={{ vertical: "top", horizontal: "center" }}
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
        {item.status!=="Loss"  && item.status!=="Complete"? (
             <>
             {recordingFile !=""?
             (
              <Button  onClick={() => {
                SendFileToServer();
              }}>Update</Button>
             ):"----"}
   
              </>
        ):"----"}
        </td>
        <td>{item?.country_city}</td>
        <td>{item?.email != null ? item.email : "-------"}</td>
        <td>{item?.task}</td>
        <td>{created_date.toString().split("T")[0]}</td>
        <td>{item?.dead_line}</td>
      </tr>
    );
            }
            else{
            return null
            }
  };
  if(IsEmpty==true){
    return (<div>
      <Row className=" shadow p-3 mb-3 bg-white rounded mt-3">

      <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
          To Do List
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
          <EmployeeMobileViewSidebar />
          </div>
        </Col>
        {showReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn ml-2" 
            onClick={() => {

              handleFetchData();
              setshowReset(false);
              setIsLoading(true);
              setIsFilter(false);
              setIsEmpty(false);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faRedo} /> reverse filter
          </button>
           ):null} 
     </Row>
    <div style={{ display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop:"10%",
  marginBottom:"auto",
  width:"50%"}}> 
  <img style={{ width:"100%",height: "500px" }} src={nodata} /></div>
    </div>
  );
  }
  else
  return (
    <Container fluid className="Laa">
      {/* <PreLoading startLoading={isLoading} /> */}
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            To Do List
            
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <EmployeeMobileViewSidebar />
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
      <Row>
     
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
        {showReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn ml-2" 
            onClick={() => {
             
              handleFetchData();
              setshowReset(false);
              setIsFilter(false);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faRedo} /> reverse filter
          </button>
           ):null} 
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
          
          </div>
           */}
          <div className="table-responsive" style={{height: "500px", overflow: "auto"}} ref={ref}>
            <table id="leadsTable" className="table table-hover">
              <thead>
                <tr>
                <th scope="col">
                    <span  style={{ color: "#818181" }}>
                      {""}
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
                      Status
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Interest
                    </span>
                  </th>
                  {/* <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                      Allocate To
                    </span>
                  </th> */}
                 
                  <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                    Action Summary
                    </span>
                  </th>
                  <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                      Add Recording
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Recordings
                    </span>
                  </th>
                  {/* <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                      Test Action
                    </span>
                  </th> */}
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
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Country/City
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
                  <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                      Created at
                    </span>
                  </th>
                  <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Deadline
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <Table
                    item={item.lead}
                    allocated={item.allocated_to}
                    index={index}
                    setShowModalAction={setShowModalAction}
                    setValue={setValue}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setPostData={setPostData}
                    userInfo={props.userInfo}
                  />
                ))) : null
                // (
                //   <Snackbar
                //     open={true}
                //     autoHideDuration={2000}
                //     // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                //     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                //   >
                //     <Alert variant="filled" severity="info">
                //       No Lead to Show
                //     </Alert>
                //   </Snackbar>
                // )
                }
  
              
              </tbody>
            </table>
            {data?.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={data[selectedID]} />
            
          </>
        ) : null}
            <ModalAction data={postData} />
          </div>
          </div>
          <Col>
          {IsFilter==false?(
          pageCount>1?( <p className="page-info">
          Showing {currentPage} from {pageCount}
        </p>):null ):filterpageCount>1?(<p className="page-info">
         Showing {filtercurrentPage} from {filterpageCount}
       </p>):null}
        </Col>
        
        <Col >
        {IsFilter==false?(
        <Pagination
 itemsCount={totalRecord}
 pageSize={pageSize}
 currentPage={currentPage}
 onPageChange={handlePageChange}
 show={handleShow}
/>
        ):<Pagination
        itemsCount={filtertotalRecord}
        pageSize={filterPageSize}
        currentPage={filtercurrentPage}
        onPageChange={handleFilterPageChange}
        show={handleFilterShow}
        />}
        </Col>
        

       
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