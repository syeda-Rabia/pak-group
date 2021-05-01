// import React from 'react';
import {
    faCheckDouble, faPause, faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Chip, makeStyles,

    Tooltip
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import CTAButton from "./CTAButton";
import ErrorNotification from "./ErrorNotification";
import PreLoading from "./PreLoading";
import LeadsMobileViewSidebar from "./Sidebar/LeadsMobileViewSidebar";
import SuccessNotification from "./SuccessNotification";
import ApiUrls from "../utils/ApiUrls";
import { POST } from "../utils/Functions";
import "../screens/Admin/Leads/LeadsAdmin.css";
import { publicURL } from "../utils/Config";
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

export default function RecordingFile(props) {
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
  const [recordings, setRecordings] = useState([{audio:(new Audio(publicURL + props.data.recording_file)),item:props.data}]);
  const ref = useRef(null);

  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
console.log("----------------------props----------------",props)
  const classes = useStyles();
  
  useEffect(() => {
    setIsLoading(true);
   
    
  }, []);

 

  const getAllLeadsData = async () => {
    //  ;

    // let resp = await GET(ApiUrls.GET_ADMIN_NOTIFICATION_ON_LEAD+ "/" +leadID+"/"+"empAction"+"/"+ActionId);

    // if (resp.data.showLead != null) {
    //   setAllLeads(resp.data.showLead);
    //   setAllActions(resp.data.empAction)
    // }
    // console.log("leads",resp);
    // setIsLoading(false);

    //  ;
    //  ;
  };


 
  //  console.log(currencyFormat(2665));

 
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
     
         
    
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p >
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
                <>
            {isActive() ? (
              <button
                type="button"
                className="bg-transparent  button-focus ml-3 button-bg"
                onClick={pauseSound}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
              </button>
            ) : (
              <button
                type="button"
                className="bg-transparent  button-focus ml-3 button-bg"
                onClick={playSound}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
              </button>
            )}
            </>
              </span>

              {/* <span className="spn1">
                2011/10/09 {item.recordings[0].recording_file} {"       "}  2011/10/09 {item.recordings[0].recording_file}
              </span> */}
              {/* <span className="spn1">
                2011/10/09 {item.recordings[0].recording_file}
              </span> */}
            </p>

            {/* <p class="marquee"><span  className="spn2">{item.recordings[0].recording_file}</span></p> */}

            {/* <span className="spn1">2011/10/09</span> */}
            {/* <span className="spn2">{item.recordings[0].recording_file}</span> */}
            {/* <span className="spn2">Recording {index} */}
            {/* <ReactTicker
          index={item.recordings[0].recording_file}
          /> */}
            {/* </span> */}
           
          </div>
      
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
//  setRecordings(item?.recordings?.map((item)=>{return {audio:(new Audio(publicURL + item.recording_file)),item:item}}));
//  setRecordings([{audio:(new Audio(publicURL + item.recording_file)),item:item}]);


    return (
      
       
        <div className="col-lg-12 shadow pt-2  bg-white rounded ">
        
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
           </div>
    );
  };

 
 
  return (
    <Container fluid>
      

      

      <Row className="">
        <div className="mt-5" >
          
           
                
                      <>
                        <ModalPlay item={props.data}  />

                        {/* <EmployeeActionStepper data={lead}/> */}
                      </>
                   
               
           
        </div>
        
        
      </Row>
    </Container>
  );
}
