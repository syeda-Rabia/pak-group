import { faCheckCircle, faEye, faPause, faPlay, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  makeStyles
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ErrorNotification from "../../../components/ErrorNotification";
import Pagination from "../../../components/Pagination/Pagination";
import PreLoading from "../../../components/PreLoading";
import EmployeeMobileViewSidebar from "../../../components/Sidebar/EmployeeMobileViewSidebar";
import SuccessNotification from "../../../components/SuccessNotification";
import nodata from "./../../../assests/nodata.png";
import ApiUrls from "./../../../utils/ApiUrls";
import { publicURL } from "./../../../utils/Config";
import { GET } from "./../../../utils/Functions";
import "./EmployeeLeads.css";

import {
    Tooltip,
    IconButton,
  } from "@material-ui/core";
  import ArrowBackIcon from "@material-ui/icons/ArrowBack";
  import {useHistory } from "react-router-dom";


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
function EmployeeShiftedLeads(props, lead_id) {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showModalAction, setShowModalAction] = React.useState(true);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [goback, setGoBack] = React.useState("shifted");
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

 /*  Pagination data  */

 const [pageSize, setPageSize] = React.useState(0);
 const [currentPage, setCurrentPage] = React.useState(0);
 const [pageCount, setPageCount] = React.useState(0);
 const [totalRecord, setTotalRecord] = React.useState(0);

 const lastIndex = currentPage * pageSize;
 const istIndex = lastIndex - pageSize;
 const history = useHistory();
 // const [page, setPage] = React.useState(2);
 const handlePageChange = async (page) => {
   /*
    Api Call
    
    */
   setIsLoading(true);
   let resp = await GET(ApiUrls. GET_SHIFTED_LEADS + page);

   if (resp.data != null) {
     setCurrentPage(resp.data.leads.current_page);
     setData(resp?.data?.leads?.data);
   }
   setIsLoading(false);
 };

 const handleShow = (pageCount) => {
   setPageCount(pageCount);
 };

 /*  Pagination data  end*/

 
  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_SHIFTED_LEADS );
    console.log("-------------------------------", res);
    
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
    const [recordingFile, setRecordingFile] = React.useState(null);
    const [action, setAction] = React.useState("follow up");
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    // const [whatNext, setWhatNext] = React.useState(0);
  
    const classes = useStyles();
  
    
 
   
   
  
    
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
    // let created_date=item.created_at;
    return (
      <tr >
         
        <td scope="row">{index + 1}</td>
        <td>{item?.client_name}</td>
        <td>{item?.contact}</td>
        <td>{item?.project?.name}</td>
        <td>{item?.budget + " PKR"}</td>
        <td>{item?.time_to_call != null ? item?.time_to_call : "-------"}</td>
        {/* <td>{item.time_to_call}</td> */}
    
  
      
      
       
       
        <td>
            <Link to= 
             {{ pathname: "/employee/admin-action", query: { item },goback:{goback} }}
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
       
      <td>{item.country_city}</td>
          <td>{item.email != null ? item.email : "-------"}</td>
        <td>{item.task}</td>
        <td>{item.created_at.toString().split("T")[0]}</td>
        <td>{item.dead_line}</td>
     
      </tr>
    );
  };
  
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
          <IconButton
          onClick={() => {
            history.push("/employee/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
            Shifted Leads
            
          </h3>
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
   
     
        <div className="col-lg-12 shadow p-3  bg-white rounded  ml-1 mr-1">
        
        

          <div className="table-responsive" style={{height: "500px", overflow: "auto"}} ref={ref}>
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
                 
                 
                  
                  {/* <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Allocate_To
                    </span>
                  </th> */}
                 
                  <th scope="col" className="text-nowrap">
                    <span id="st" style={{ color: "#818181" }}>
                      Action Summary
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
                  {/* <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Action
                    </span>
                  </th> */}
                  {/* <th scope="col">
                    <span id="st" style={{ color: "#818181" }}>
                      Update
                    </span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <Table
                    item={item}
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
                ))) : null
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
  
              
              </tbody>
            </table>
            {data?.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={data[selectedID]} />
            
          </>
        ) : null}
            
          </div>
        </div>
        <Col>
        {
          pageCount>1?( <p className="page-info">
          Showing {currentPage} from {pageCount}
        </p>):null }
        </Col>
        <Col >
       
        <Pagination
 itemsCount={totalRecord}
 pageSize={pageSize}
 currentPage={currentPage}
 onPageChange={handlePageChange}
 show={handleShow}
/>
        
        </Col>
        
     
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeShiftedLeads);