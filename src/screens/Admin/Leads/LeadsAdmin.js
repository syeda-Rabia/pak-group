// import React from 'react';
import "./LeadsAdmin.css";
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
  faStar,
  faCheckCircle,
 faTimesCircle,
 faCheckDouble
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
import {useHistory } from "react-router-dom";
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
import 'react-phone-number-input/style.css';
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
const colors = {
  New: {color: '#E0E0E0', textColor: 'black'},
  Overdue: {color: '#DBAD73', textColor: 'black'},
  "Grace Period": {color: '#F19595', textColor: 'black'},
  Complete: {color: '#99CB99', textColor: 'black'},
  Loss: {color: '#C8B6A7', textColor: 'black'},
  Allocated: {color: '#A0C5E2', textColor: 'black'},
};
export default function LeadsAdmin(props) {
  const [allLeads, setAllLeads] = useState([]);

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
  const [checked, setChecked] = React.useState({ index: 0});
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
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  const classes = useStyles();

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
    let resp = await GET(ApiUrls.GET_ALL_LEADS_PAGINATION + page);
console.log("kkkkkk",resp)
    if (resp?.data != null) {
      setCurrentPage(resp?.data?.leads?.current_page);
      setAllLeads(resp?.data?.leads?.data);
    }
    setIsLoading(false);
  };

  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };

  /*  Pagination data  */


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
    // console.log("console log-------------------------------------->",filterurl+"&& page="+page)
    let res =await GET(filterurl+"&& page="+page);
    // console.log("console log in filter  pagination-------------------------------------->",props.searchData.url+"&& page="+page,res)
    if (res?.data != null) {
      setFilterCurrentPage(res?.data?.leads?.current_page);
      setAllLeads(res?.data?.leads?.data);
      setfilterPageSize(res?.data?.leads?.per_page);
      setfilterTotalRecord(res?.data?.leads?.total);

    }
    // console.log("console log in filter pagination-------------------------------------->")
    setIsLoading(false);
  };

  const handleFilterShow = (filterpageCount) => {
    setFilterPageCount(filterpageCount);
  };
  //filter pagination end
  // console.log("props", props);
  useEffect(() => {
    // setIsLoading(true);
    getAllLeadsData();
    FetchInterestData();
  }, [refresh]);

  useEffect(() => {
    if (props?.searchData?.search == true) setFilterdata();
  }, [props.searchData.search]);

  const FetchInterestData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_INTEREST);
    // console.log("-----", res);
    if (res?.success != false) {
      setInterestList(res?.data?.Interest);
    }
    setIsLoading(false);
  };

  const getAllLeadsData = async () => {
    //  ;
   
    let resp = await GET(ApiUrls.GET_ALL_LEADS_PAGINATION);

    if (resp?.data != null) {
      setAllLeads(resp?.data?.leads?.data);

      setPageSize(resp?.data?.leads?.per_page);
      setTotalRecord(resp?.data?.leads?.total);
      setCurrentPage(resp?.data?.leads?.current_page);
    }
    console.log("leads", resp);
    setIsLoading(false);

    //  ;
    //  ;
  };
  const setFilterdata = async () => {
    setshowReset(true);
    setIsLoading(true);
   
    setRecordings([]);
    let res = await GET(props.searchData.url);
    setFilterUrl(props?.searchData?.url);
    console.log("--filter---", res);
    if (res?.success != false) {
     
      setAllLeads(res?.data?.leads?.data);
      setfilterPageSize(res?.data?.leads?.per_page);
      setfilterTotalRecord(res?.data?.leads?.total);
      setFilterCurrentPage(res?.data?.leads?.current_page);
      setMessage("Lead find Successfully");
      setShowSuccessAlert(true);
      setIsFilter(true);
      setIsEmpty(false);
    } else if(res.error.hasOwnProperty("month"))
    {
      // console.log("res.error.hasOwnProperty(month)");
      // setErrorResponce(resp.error);
      setMessage(res.error.month[0]);
      setShowErrorAlert(true);
      setshowReset(true);
    setIsEmpty(true);
    }
    else if(res.hasOwnProperty("error")){
      // setMessage(res.error);
      // setShowErrorAlert(true);
      setshowReset(true);
      setIsEmpty(true);
    }
    setIsLoading(false);
  };
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "PKR";
  };
  //  console.log(currencyFormat(2665));
  const ModalAdd = ({}) => {
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState();
    const [allSource, setAllSource] = useState([
      "Newspaper",
      "Digital Marketing",
      "Other",
      "TV",
      "Personal Personal",
      "SMS",
      "Outdoor",
    ]);

    const [selectedSource, setSelectedSource] = useState("");

    const [client, setClient] = useState("");
    const [contact, setContact] = useState("");
    const [budget, setBudget] = useState("");

    const [country, setCountry] = useState("");
    const [interestID, setInterestID] = useState();

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState("");
    const [innerLoading, setInnerLoading] = useState(false);

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    var datee = formatDate(today);
    const [time, setTime] = useState(timee);

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      setTime(res);
    };
    useEffect(() => {
      setInnerLoading(true);
      getProjectDetails();
    }, []);

    // useEffect(() => {
    //   getInventroyDataAgaintsProject(project);
    // }, [project]);

    const getProjectDetails = async () => {
      let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

      if (resp.data != null) {
        setAllProjects(resp?.data?.projects?.data);
      }
      setInnerLoading(false);
    };

    // const getInventroyDataAgaintsProject = async (id) => {
    //   let resp = await GET("admin/inventory/all/" + id);

    //   if (resp.data != null) {
    //     let { inventories } = resp.data;
    //     setInterest(inventories);
    //   }
    // };

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // send data to server
      let formData = {
        client_name: client,
        contact: contact,
        source: selectedSource,
        time_to_call: time,
        // phone: contact,
        email: email,
        // inventory_id: inventory,
        interest_id: interestID,
        project_id: project,
        budget: budget,
        country_city: country,
      };
      // console.log(formData);
      let resp = await POST(ApiUrls.CREATE_LEAD, formData);
      // console.log("console----",resp);
      if (resp.error.hasOwnProperty("interest_id")) { 
        setMessage("Lead Not Submitted. Interest field is Required.");
        setShowErrorAlert(true);
      }
      setMessage("Lead added Successfully");
      setShowSuccessAlert(true);

      // console.trace(resp);

      setRefresh(!refresh);
      //  ;
      //  ;

      setShowAdd(false);
    };

    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
        }}
      >
        {innerLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}

        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Add Lead</Modal.Title>
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
                    <h6>Client<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
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
                    <h6>Contact<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    {/* <PhoneInput
                    color="#2258bf"
                    defaultCountry="Pakistan"
      placeholder="Enter phone number"
      value={contact}
      onChange={setContact}/> */}
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="03xxxxxxxxx"
                      type="tel"
                      minLength="11"
                      maxLength="11"
                      value={contact}
                      onChange={(e) => {
                        // if (e.target.value.match(/(^[0-9]*$)/g))
                        if(e.target.value.length<13)  
                          setContact(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Email<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
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
                          // console.log("a");
                          setEmailError(false);
                        } else {
                          // do some
                          // console.log("b");

                          setEmailError(true);
                         
                        }
                        
                        setEmail(e.target.value);
                      }}
                    />
                     {emailError == true ? (
                      <small
                        className="form-text  text-red"
                        style={{ color: "red" }}
                      >
                        *Email should contain "@" and  "." Like (.com or pk.co)
                      </small>
                    ) : null}
                  </div>
                 
                  <div className="pb-3">
                    <h6>Country/City<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Country/City"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Time of Call</h6>
                    <div className="form-control w-100">
                      <KeyboardTimePickerExample
                        value={today}
                        showTime={HandleTimeValue}
                        // onChange={(e) => {
                        //   setTime(formatDate(e.target.value));
                        //    ;
                        // }}
                      />
                    </div>
                  </div>
                </Col>
                <Col className="ml-3">
                  <div className="pb-3">
                    <h6>Project<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    <Select
                      className="form-control form-control-sm w-100"
                      required="true"
                      value={project}
                      onChange={(e) => {
                        // console.log(
                        //   "select project ID is -----",
                        //   e.target.value
                        // );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects?.length > 0
                        ? allProjects.map((pro) => (
                            <MenuItem key={pro.id} value={pro.id}>
                              {pro.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="pb-3">
                    <h6 style={{ marginTop: 7 }}>Interest<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    <Select
                      className="form-control form-control-sm w-100"
                      required="true"
                      // value={interest}
                      onChange={(e) => {
                        // console.log(
                        //   "selected Inventriry is ---- ",
                        //   e.target.value
                        // );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList?.length > 0
                        ? interestList.map((int, index) => (
                            <MenuItem key={int.id} value={int.id}>
                              {int.interest}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>

                  <div className="pb-3">
                    <h6>Budget<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Budget"
                      type="text"
                      value={budget}
                      onChange={(e) => {
                        if(e.target.value.length<20)  
                        setBudget(e.target.value);
                      }}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Source<sup style={{color:"red",fontSize:"14px"}}>*</sup></h6>
                    <Select
                     required="true"
                      value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <MenuItem key={src} value={src}>
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
                  setShowAdd(false);
                }}
              >
                Close
              </Button>
              
                 <Button
                 style={{ backgroundColor: "#2258BF" }}
                  disabled={emailError}
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
  const ModalEdit = ({ item }) => {
   

    const [time, setTime] = useState(timee);
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState(item?.project?.id);
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

    const [selectedSource, setSelectedSource] = useState(item?.source);

    const [client, setClient] = useState(item?.client_name);
    const [contact, setContact] = useState(item?.contact);
    const [budget, setBudget] = useState(item?.budget);

    const [country, setCountry] = useState(item?.country_city);
    // const [status, setStatus] = useState("New");
    const [interest, setInterest] = useState([]);

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState(item?.email);
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
        id: item.id,
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
      // console.log(resp);

      if (resp.error === false) {
        setMessage("Lead Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Edited");
        setShowErrorAlert(true);
      }

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
                      defaultValue={item?.project?.id}
                      onChange={(e) => {
                        // console.log(
                        //   "select project ID is -----",
                        //   e.target.value
                        // );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects?.length > 0
                        ? allProjects?.map((pro) => (
                            <MenuItem key={pro.id} value={pro.id}>
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
                        item?.interest !== null ? item?.interest?.id : null
                      }
                      onChange={(e) => {
                        // console.log(
                        //   "selected Inventriry is ---- ",
                        //   e.target.value
                        // );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList?.length > 0 ? (
                        interestList?.map((int, index) => (
                          <MenuItem key={int?.id} value={int.id}>
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
                      defaultValue={item.source}
                      // value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <MenuItem key={src} value={src}>
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
      
        lead_id: item.id,
       
        status:checked.index==0?"Complete":"Loss",
      
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
  // console.log(recordings, "Recording");
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
                  item={recording?.item}
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

  const ModalView = ({ item }) => {
    // console.log(
    //   "____________________________________________________________________",
    //   item
    // );

    const [client, setClient] = useState(item.client_name);
    const [contact, setContact] = useState(item.contact);
    const [budget, setBudget] = useState(item.budget);

    const [country, setCountry] = useState(item.country_city);
    // const [status, setStatus] = useState("New");

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState(item.email);

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
                    value={item.time_to_call}
                  />
                </div>
                <div className="pb-3">
                  <h6>Allocated to</h6>
                  <Input
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={
                      item?.allocation?.length > 0
                        ? item?.allocation[0]?.allocated_to?.first_name
                        : "-------"
                    }
                  />
                </div>
              </Col>
              <Col className="ml-3">
                <div className="pb-2">
                  <h6>Project</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item?.project?.name}
                  />
                </div>
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
                      item?.interest !== null
                        ? item?.interest?.interest
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
                    defaultValue={item.source}
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
                      item.dead_line != null ? item.dead_line : "-------"
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
                    defaultValue={item.status}
                  />
                </div>
              </Col>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  };

  const ModalDelete = ({ item }) => {
    // console.log(item);
    const DeleteRecordFromData = async () => {
      let res = await POST(ApiUrls.DELETE_LEAD+"?leadArray[0]=" + item.id);
      // console.log("*************************",res);
      if (res.error === false) {
        setMessage("Lead Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Deleted");
        setShowErrorAlert(true);
      }
      // console.log("-----------------",res);
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
  const SelectData = async (event) => {
    event.preventDefault();
    let postData = {
      leadArray: select, 
    };
    // let apendURL=select.map((item,id)=>`leadArray[${id}]=${item}`)
    let res = await POST(
      ApiUrls.DELETE_LEAD,postData
      // postData
      );
      // console.log("----------------",res);
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
    let country_city = "country/city";
    let created_date=item.created_at;
    return (
      <tr style={{backgroundColor: colors[item?.status]?.color, color: colors[item?.status]?.textColor}}>
        <td> {item.action=="Follow Up"?(
 <FontAwesomeIcon style={{ fontSize: 15,color:"yellow",marginLeft:"5px" }} icon={faCheckCircle} />
          ):null}</td>
         <td> 
          <input
            type="checkBox"
            checked={select.includes(item.id)}
            onChange={(e) => {
              // setTask(item.project.category.name);
              HandleName(item?.id);
            }}
          />
         
        </td>
        <td>{index + 1}</td>
        <td>{item?.client_name}</td>
        <td>{item?.contact}</td>
        <td>{item?.email}</td>

        <td>{item?.project?.name}</td>
        <td>{item?.budget}</td>

        {/* <td>{item.inventory.serial_no}</td> */}
        <td>{item?.interest != null ? item?.interest?.interest : "-------"}</td>

        <td>{item?.time_to_call != null ? item?.time_to_call : "-------"}</td>
      

        <td>
          {item.status != "" ? (
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
          )}
        </td>

        <td>
          {item?.allocation?.length > 0 ? (
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item?.allocation[0]?.allocated_to?.first_name}
              style={{ marginRight: "5px" }}
            />
          ) : (
            "-------"
          )}
        </td>
       

        <td>{item?.dead_line != null ? item?.dead_line : "-------"}</td>

        {/* <td>{item.Allocate}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td> */}
        <td>
          <Link to={{ pathname: "/admin/emp-action", query: { item}, goback:{goback}}}>
          <Tooltip placement="top-start" title=" Actions on Lead">
            <button
              data-tip
              data-for="action"
              type="button"
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   // setShowView(true);
              //   // setSelectedID(index);
              // }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            </Tooltip>
          </Link>
          {/* <ReactTooltip id="action" place="top" effect="solid">
            View Employee Action
          </ReactTooltip> */}
        </td>

        <td>
          {item?.recordings?.length > 0 ? (
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
          )}
        </td>

        <td>
          {item?.allocation?.length > 0 ? (
            item.status!=="Complete" && item.status!=="Loss"?(
             
              <CTAButton
                // leadId={item.allocation[0].lead_id}
                empId={item?.allocation[0]?.allocated_to?.id}
                lead_id={item?.id}
                deadline={item?.dead_line}
                // status={item.status}
              />
            ):"------" )
            : (
            "-------"
          )}
        </td>

        <td>
          <div className="d-flex d-inline">
          <Tooltip placement="top-start" title=" View Details">
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
            </Tooltip>
            {/* <ReactTooltip id="delete" place="top" effect="solid">
              View Details
            </ReactTooltip> */}
            <Tooltip placement="top-start" title="Edit Details">
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
            </Tooltip>
            {/* <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip> */}
             <Tooltip placement="top-start" title="Delete Record">
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
            </Tooltip>
            {/* <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip> */}
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
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faCheckDouble} />
            </button>
            </Tooltip>
            {/* <ReactTooltip id="close" place="top" effect="solid">
              Close Lead
            </ReactTooltip> */}
          </div>
        </td>
        <td>
          {item.hasOwnProperty("country_city") == true
            ? item?.country_city
            : "-------"}
        </td>
        <td>{item?.source}</td>
        <td>{item?.task}</td>
        <td>{created_date.toString().split("T")[0]}</td>
      </tr>
    );
  };
  if(IsEmpty==true){
    return (<div>
      <Row className=" shadow p-3 mb-3 bg-white rounded mt-3">
     
      <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Leads<sub>(Admin)</sub>
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <LeadsMobileViewSidebar update={props.update} />
          </div>
        </Col>
        {showReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn ml-2" 
            onClick={() => {
             
              getAllLeadsData();
              setshowReset(false);
              setIsFilter(false);
              setIsLoading(true);
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
    <Container fluid>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Leads<sub>(Admin)</sub>
          </h3>
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
        <Row className=" pl-2  w-100 d-flex justify-content-between align-items-center">
          <div>
            <div className="ml-2">
              <Dropfile setRefresh={setRefresh} disabled={select.length > 0 }
              className="ml-2"/>

              <Link to="/admin/add-interest">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={select.length > 0 }
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Interest
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-primary leadbtn"
                disabled={select.length > 0 }
                onClick={() => {
                  setShowAdd(true);
                }}
                style={{
                  backgroundColor: "#2258BF",
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} /> Add Lead
              </button>
              {showReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn ml-2" 
            onClick={() => {
             
              getAllLeadsData();
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
              </div>
              </div>
             
              <div>

         {select.length > 0 ? (
            <>
            
                    <button
                    data-tip
                    data-for="Deletelead"
                   
                      className=" float-right btn btn-primary leadbtn"
                      type="submit"
                      style={{ backgroundColor: "#2258BF" }}
                      // disabled={!select.every((v) => v === true)}

                      onClick={SelectData}
                    >
                     <FontAwesomeIcon icon={faTrash} /> Delete 
                    </button>
                   
                   <ReactTooltip id="Deletelead" place="top" effect="solid">
                   Delete selected leads
                 </ReactTooltip>
                 </>
                  ) : null}
                     
              </div>
            

         
        </Row>

        <div className="table-responsive mt-4"  style={{height: "500px", overflow: "auto"}} ref={ref}>
          <table className="table table-hover " >
            <thead >
              <tr>
              <th scope="col" >
                  <span  style={{ color: "#818181" }}>
                   {""}
                  </span>
                </th>
              <th scope="col" >
                  <span id="sn" style={{ color: "#818181" }}>
                    Select
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    ID
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Clients
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Contacts
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Email
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Project
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Budget
                  </span>
                </th>
                {/* <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Serial_No
                  </span>
                </th> */}
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Interest
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    TOC
                  </span>
                </th>

                

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Status
                  </span>
                </th>

                {/* <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th> */}
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Allocated To
                  </span>
                </th>

               
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Deadline
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                  Action Summary
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Recording
                  </span>
                </th>

                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Call To Action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Action
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Country/City
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Source
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Task
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Created at
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {allLeads?.length > 0 ? (
                allLeads?.map((lead, index) => (
                  <LeadTable item={lead} index={index} />
                ))
              ) : null
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
        {allLeads?.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={allLeads[selectedID]} />
            <ModalDelete item={allLeads[selectedID]} />
            <ModalView item={allLeads[selectedID]} />
            <ModalEdit item={allLeads[selectedID]} />
            <ModalClose item={allLeads[selectedID]} />
          </> 
        ) : null}
        <ModalAdd />
        <Col>
        {IsFilter==false?(
          pageCount>1?( <p className="page-info">
          Showing {currentPage} from {pageCount}
        </p>):null ):filterpageCount>1?(<p className="page-info">
         Showing {filtercurrentPage} from {filterpageCount}
       </p>):null}
        </Col>
        <Col>
       
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