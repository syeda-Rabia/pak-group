// import React from 'react';
import "./LeadsAdmin.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";
import { Link, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import sample from "./../../../assests/sample.mp3";
import sample2 from "./../../../assests/sample2.mp3";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LeadsData } from "./../../../assests/constants/Leadsadmindata";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import { Divider } from "antd";

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
} from "@material-ui/core";
import { validateEmail } from "../../../utils/Validation";
import CTAButton from "../../../components/CTAButton";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));

export default function LeadsAdmin() {
  const [allLeads, setAllLeads] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  var today = new Date();

  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  const classes = useStyles();

  useEffect(() => {
    // setIsLoading(true);
    getAllLeadsData();
    FetchInterestData();
  }, [refresh]);

  const FetchInterestData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_INTEREST);
    console.log("-----",res)
    if (res.success != false) {
      setInterestList(res.data.Interest);
    }
    setIsLoading(false);
  };

  const getAllLeadsData = async () => {
    //  ;

    let resp = await GET(ApiUrls.GET_ALL_LEADS);

    if (resp.data != null) {
      setAllLeads(resp.data.leads);
    }

    setIsLoading(false);

    //  ;
    //  ;
  };

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
        setAllProjects(resp.data.projects.data);
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
        phone: contact,
        email: email,
        // inventory_id: inventory,
        interest_id: interestID,
        project_id: project,
        budget: budget,
        country_city: country,
      };
      console.log(formData);
      let resp = await POST(ApiUrls.CREATE_LEAD, formData);
      if (resp.error.hasOwnProperty("interest_id")) {
        setMessage("Lead Not Submitted. Interest field is Required.");
        setShowErrorAlert(true);
      }
      console.trace(resp);

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
                    <Select
                      className="form-control form-control-sm w-100"
                      value={project}
                      onChange={(e) => {
                        console.log(
                          "select project ID is -----",
                          e.target.value
                        );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects.length > 0
                        ? allProjects.map((pro) => (
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
                      // value={interest}
                      onChange={(e) => {
                        console.log(
                          "selected Inventriry is ---- ",
                          e.target.value
                        );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList.length > 0
                        ? interestList.map((int, index) => (
                            <MenuItem key={int.id} value={int.id}>
                              {int.interest}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>

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

  const LeadTable = ({ item, index }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedID, setSelectedID] = useState(null);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [setPlay, setShowPlay] = useState(false);

    const ModalEdit = ({ item }) => {
      // console.log(
      //   "____________________________________________________________________",
      //   item
      // );

      const [time, setTime] = useState(timee);
      const [allProjects, setAllProjects] = useState([]);
      const [project, setProject] = useState(item.project.id);
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

      const [selectedSource, setSelectedSource] = useState(item.source);

      const [client, setClient] = useState(item.client_name);
      const [contact, setContact] = useState(item.contact);
      const [budget, setBudget] = useState(item.budget);

      const [country, setCountry] = useState(item.country_city);
      // const [status, setStatus] = useState("New");
      const [interest, setInterest] = useState([]);

      const [emailError, setEmailError] = useState(false);

      const [email, setEmail] = useState(item.email);
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
        console.log(resp);

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
                        defaultValue={item.project.id}
                        onChange={(e) => {
                          console.log(
                            "select project ID is -----",
                            e.target.value
                          );
                          setProject(e.target.value);
                        }}
                      >
                        {allProjects.length > 0
                          ? allProjects.map((pro) => (
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
                          item.interest !== null ? item.interest.id : null
                        }
                        onChange={(e) => {
                          console.log(
                            "selected Inventriry is ---- ",
                            e.target.value
                          );
                          setInterestID(e.target.value);
                        }}
                      >
                        {interestList.length > 0 ? (
                          interestList.map((int, index) => (
                            <MenuItem key={int.id} value={int.id}>
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

    const ModalPlay = ({ item }) => {
      const [playAudio, setPlayAudio] = useState(false);
      const [playAudio2, setPlayAudio2] = useState(false);

      useEffect(() => {
        audioTune.load();
      }, []);

      const playSound = () => {
        audioTune.play();
        audioTune2.pause();

        setPlayAudio(true);
        setPlayAudio2(false);
      };

      const pauseSound = () => {
        audioTune.pause();
        setPlayAudio(false);
      };

      useEffect(() => {
        audioTune2.load();
      }, []);

      const playSound2 = () => {
        audioTune2.play();
        audioTune.pause();

        setPlayAudio2(true);
        setPlayAudio(false);
      };

      const pauseSound2 = () => {
        audioTune2.pause();
        setPlayAudio2(false);
      };

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
              <Card
                className="shadow  bg-white rounded "
                style={{ width: "80%", height: "40px", marginLeft: "35px" }}
              >
                <Card.Body>
                  <span className="spn1">01/12/2020</span>
                  <span className="spn2">Recording 1</span>
                  {playAudio ? (
                    <button
                      type="button"
                      className="bg-transparent  button-focus mr-2 button-bg"
                      onClick={pauseSound}
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
                      onClick={playSound}
                    >
                      <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                    </button>
                  )}
                </Card.Body>
              </Card>
              <Card
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
                      defaultValue={item.project.name}
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
                        item.interest !== null
                          ? item.interest.interest
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
      console.log(item);
      const DeleteRecordFromData = async () => {
        let res = await GET(ApiUrls.DELETE_LEAD + item.id);
        if (res.error === false) {
          setMessage("Lead Deleted Successfully");
          setShowSuccessAlert(true);
        } else {
          setMessage("Lead Not Deleted");
          setShowErrorAlert(true);
        }
        console.log(res);
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
            <Modal.Title style={{ color: "#818181" }}>
              Delete Record
            </Modal.Title>
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
    // console.log(item);
    let country_city = "country/city";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>
        <td>{item.email}</td>

        <td>{item.project.name}</td>
        <td>{item.budget}</td>

        {/* <td>{item.inventory.serial_no}</td> */}
        <td>{item.interest != null ? item.interest.interest : "-------"}</td>

        <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td>
        <td>
          {item.hasOwnProperty("country_city") == true
            ? item.country_city
            : "-------"}
        </td>
        <td>{item.source}</td>

        <td>{item.status != "" ? item.status : "-------"}</td>

        <td>
          {item.allocation.length > 0
            ? item.allocation[0].allocated_to.first_name
            : "-------"}
        </td>
        <td>{item.task}</td>
        <td>{item.dead_line != null ? item.dead_line : "-------"}</td>

        {/* <td>{item.Allocate}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td> */}
        <td> 
        <Link to={{ pathname: "/admin/emp-action", query: { item } }}
        >
            <button
              data-tip
              data-for="view emp"
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
            <ReactTooltip id="view emp" place="top" effect="solid">
              View Employee Action
            </ReactTooltip></td>

        <td>
          <button
            data-tip
            data-for="play"
            type="button"
            className="bg-transparent  button-focus mr-2"
            onClick={() => {
              setShowPlay(true);
              setSelectedID(index);
            }}
          >
            <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
          </button>
          <ReactTooltip id="play" place="top" effect="solid">
            play
          </ReactTooltip>
        </td>

        <td>
          {item.allocation.length > 0 ? (
            <CTAButton
              // leadId={item.allocation[0].lead_id}
              empId={item.allocation[0].allocated_to.id}
              lead_id={item.id}
              // status={item.status}
            />
          ) : (
            "-------"
          )}
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
          </div>
          {allLeads.length > 0 && selectedID !== null ? (
            <>
              <ModalPlay item={allLeads[selectedID]} />
              <ModalDelete item={allLeads[selectedID]} />
              <ModalView item={allLeads[selectedID]} />
              <ModalEdit item={allLeads[selectedID]} />
            </>
          ) : null}
        </td>
      </tr>
    );
  };
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
            <LeadsMobileViewSidebar />
          </div>
        </Col>
      </Row>
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}

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
        <Row className=" pl-2 md-5">
          <div className=" pl-2 ">
            <Dropfile />
          </div>
          <div>
            <Link to="/admin/add-interest">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2258BF",
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} /> Add Interest
              </button>
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setShowAdd(true);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} /> Add Lead
          </button>{" "}
        </Row>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
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
                    Status
                  </span>
                </th>

                {/* <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th> */}
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Allocated_To
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Task
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Deadline
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Show_Employee_action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Recording
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Call_To_Action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {allLeads.length > 0
                ? allLeads.map((lead, index) => (
                    <LeadTable item={lead} index={index} />
                  ))
                : null}

              {/* <h1>Other Leads</h1>
                  {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
            </tbody>
          </table>
        </div>
        <ModalAdd />
      </Row>
    </Container>
  );
}
