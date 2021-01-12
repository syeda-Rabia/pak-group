// import React from 'react';
import "./LeadsAdmin.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";
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
} from "@material-ui/core";
import { validateEmail } from "../../../utils/Validation";

export default function LeadsAdmin() {
  const [allLeads, setAllLeads] = useState([]);

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [setPlay, setShowPlay] = useState(false);
  const [value, setValue] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState(LeadsData);
  const [selectedID, setSelectedID] = useState(0);
  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);
  const [isLoading, setIsLoading] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getAllLeadsData();
  }, []);

  const getAllLeadsData = async () => {
    console.log("get all lead call ");

    let resp = await GET(ApiUrls.GET_ALL_LEADS);

    if (resp.data != null) {
      setAllLeads(resp.data.leads.data);
    }
    setIsLoading(false);

    // console.log("***********************");
    // console.log(JSON.stringify(resp.data.leads));
  };

  const ModalPlay = ({ item }) => {
    const [playAudio, setPlayAudio] = useState(false);
    const [playAudio2, setPlayAudio2] = useState(false);

    useEffect(() => {
      audioTune.load();
    }, []);

    const playSound = () => {
      audioTune.play();
      setPlayAudio(true);
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
      setPlayAudio2(true);
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
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
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

  const ModalAdd = ({ item }) => {
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState();
    const [inventory, setInventory] = useState();
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
    const [toc, setToc] = useState("");

    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("New");
    const [interest, setInterest] = useState([]);

    const [emailError, setEmailError] = useState(false);

    // {
    //   id: 4,
    //   project_id: 1,
    //   inventory_name: "resen all",
    //   block_name: "V",
    //   inventory_category: "Rent",
    //   property_status: "Open",
    //   is_deleted: 0,
    //   created_at: null,
    //   updated_at: "2021-01-09T08:31:48.000000Z",
    // },
    // {
    //   id: 1,
    //   project_id: 1,
    //   inventory_name: "house",
    //   block_name: "V",
    //   inventory_category: "Rent",
    //   property_status: "Open",
    //   is_deleted: 0,
    //   created_at: null,
    //   updated_at: "2021-01-09T08:31:48.000000Z",
    // },
    const [allocate_to, setAllocate] = useState("Rabia");
    const [email, setEmail] = useState("");
    const [task, setTask] = useState("Sale");
    const [deadline, setDeadline] = useState("");
    const [source, setSource] = useState("newspaper");
    const [innerLoading, setInnerLoading] = useState(false);

    useEffect(() => {
      setInnerLoading(true);
      getProjectDetails();
    }, []);

    useEffect(() => {
      getInventroyDataAgaintsProject(project);
    }, [project]);

    const getProjectDetails = async () => {
      console.log("getProjectDetails is call ----- ");

      let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

      console.log("response in Leads ------", JSON.stringify(resp));

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
      console.log("inventory -----------------", JSON.stringify(resp));
    };

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // send data to server
      let formData = {
        client_name: client,
        contact: contact,
        source: selectedSource,
        phone: contact,
        email: email,
        inventory_id: inventory,
        project_id: project,
        budget: budget,
        "country/city": country,
      };

      console.log("sending data is ----- ", formData);

      let resp = await POST(ApiUrls.CREATE_LEAD, formData);

      console.log("Receving data after submission-----------------");
      console.log(JSON.stringify(resp.data));

      // let user = {
      //   id: "1",
      //   Name: client,
      //   Contact: contact,
      //   Project: project,
      //   Budget: budget,
      //   Country: country,
      //   Interest: inventory,
      //   Email: email,
      //   Task: task,
      //   Toc: "----",
      //   Status: "----",
      //   Allocate: "----",
      //   Deadline: "----",
      // };
      // console.log("sending user is -----> ", user);

      // // await

      // let arr = data;
      // arr.push(user);
      // setData(arr);
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

        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Add Lead</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded ">
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
                    <h6>Country/city</h6>
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
                    <h6>Interest</h6>
                    <Select
                      className="form-control form-control-sm w-100"
                      value={inventory}
                      onChange={(e) => {
                        console.log(
                          "selected Inventriry is ---- ",
                          e.target.value
                        );
                        setInventory(e.target.value);
                      }}
                    >
                      {interest.length > 0
                        ? interest.map((int, index) => (
                            <MenuItem key={int.id} value={int.id}>
                              {int.inventory_name} - {int.block_name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>

                  <div className="pb-3">
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

  const ModalView = ({ item }) => {
    return (
      <Modal
        show={showView}
        onHide={() => {
          setShowView(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Lead Record</Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
                className=""
              >
                {/* <div> */}
                <div className="">
                  <div className="pb-3">
                    <h6>Client </h6>
                    <input
                      className="form-control  input-width w-100"
                      value={item.Name}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Contact</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Contact}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Project</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Project}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Budget</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Budget}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Toc</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Toc}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Country/city</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Country}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="pb-3">
                    <h6>Status</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Status}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Interest</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Interest}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Allocated To</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Allocate}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Email</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Email}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Task</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Task}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Deadline</h6>
                    <input
                      className="form-control input-width w-100 "
                      value={item.Deadline}
                    />
                  </div>
                </div>
                {/* <label>ID</label>
          <input type="number">{item.id}</input>
          <label>Name</label>
          <input type="name">{item.Name}</input>
          <label>Email</label>
          <input type="email">{item.Email}</input>
          <label>Type</label>
          <input type="type">{item.Type}</input> */}
                {/* </div> */}
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
          </form>
        </div>
      </Modal>
    );
  };

  const ModalEdit = ({ item }) => {
    const [client, setClient] = useState(item.Name);
    const [contact, setContact] = useState(item.Contact);
    const [project, setProject] = useState(item.Project);
    const [budget, setBudget] = useState(item.Budget);
    const [toc, setToc] = useState(item.Toc);

    const [country, setCountry] = useState(item.Country);
    const [status, setStatus] = useState(item.Status);
    const [interest, setInterest] = useState(item.Interest);
    const [allocate_to, setAllocate] = useState(item.Allocate);
    const [email, setEmail] = useState(item.Email);
    const [task, setTask] = useState(item.Task);
    const [deadline, setDeadline] = useState(item.Deadline);
    const [source, setSource] = useState(item.Source);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      console.log("SendRecordToServer", event);
      // add validations
      // push

      let user = {
        id: "1",
        Name: client,
        Contact: contact,
        Project: project,
        Budget: budget,
        Toc: toc,
        Country: country,
        Status: status,
        Interest: interest,
        Allocate: allocate_to,
        Email: email,
        Task: task,
        Deadline: deadline,
      };

      let arr = data;
      arr.push(user);
      setData(arr);
      setShowAdd(false);
    };
    const EditRecordToServer = (event) => {
      event.preventDefault();

      console.log("EditRecordToServer", event);
      // add validations
      // push

      // let user = {
      // id: item.id,
      // Name: client,
      // Contact: contact,
      // Project: project,
      // Budget: budget,
      // Toc: toc,
      // Source: source,
      // Country: country,
      // Status: status,
      // Interest: interest,
      // Allocate: allocate_to,
      // Task: task,
      // Deadline: deadline,
      // Returned: returned_from,
      // };
      let user = {
        id: item.id,
        Name: client,
        Contact: contact,
        Project: project,
        Budget: budget,
        Toc: toc,
        Country: country,
        Status: status,
        Interest: interest,
        Allocate: allocate_to,
        Email: email,
        Task: task,
        Deadline: deadline,
      };
      let arr = data.map((val) => {
        if (val.id == user.id) val = user;
        return val;
      });

      // arr.push(user);
      setData(arr);
      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Record</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow  bg-white rounded ">
            <Modal.Body>
              <form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                  className=""
                >
                  <div>
                    <div className="pb-3">
                      <h6>Client</h6>
                      <input
                        className="form-control input-width w-100 "
                        placeholder="Enter  Name"
                        type="text"
                        minLength="3"
                        maxLength="10"
                        value={client}
                        onChange={(e) => {
                          setClient(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Contact</h6>
                      <input
                        className="form-control input-width w-100 "
                        placeholder="Enter Contact"
                        type="number"
                        minLength="11"
                        maxLength="11"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Project</h6>
                      <select
                        value={project}
                        onChange={(e) => {
                          setProject(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"LDA"}>LDA City</option>
                        <option value={"DHA"}>DHA </option>
                      </select>
                    </div>
                    <div className="pb-3">
                      <h6>Budget</h6>
                      <input
                        className="form-control input-width w-100"
                        placeholder="Enter Budget"
                        type="text"
                        value={budget}
                        onChange={(e) => {
                          setBudget(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="pb-3">
                      <h6>Country/city</h6>
                      <input
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
                      <h6>Interest</h6>
                      <select
                        value={interest}
                        onChange={(e) => {
                          setInterest(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"5marla"}>5 Marla</option>
                        <option value={"10marla"}>10 Marla</option>
                      </select>
                    </div>

                    <div className="pb-3">
                      <h6>Email</h6>
                      <input
                        className="form-control input-width w-100"
                        placeholder="Enter email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pb-3">
                      <h6>Task</h6>
                      <select
                        value={task}
                        onChange={(e) => {
                          setTask(e.target.value);
                        }}
                        className="form-control form-control-sm w-100"
                      >
                        <option value={"Sale"}>Sale</option>
                        <option value={"rent"}>Rent</option>
                        <option value={"other"}>other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
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
                type="submit"
                value="Submit"
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowAdd(false);
                }}
              >
                Add
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = (item) => {
      console.log("item is ", item);

      let { id } = item;
      console.log("ID is ", id);

      let arr = data;

      arr = arr.filter((user) => user.id != id.toString());

      console.log("arr length ", arr.length, arr, selectedID);
      setSelectedID((state) => {
        if (state == arr.length) return state - 1;
        return state;
      });
      setData(arr);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Delete Record</Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                DeleteRecordFromData(item);
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

  const TableEmployee = ({ item, index }) => {
    let country_city = "country/city";

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>

        <td>{item.project_id}</td>
        <td>{item.budget} PKR</td>

        <td>
          {item.hasOwnProperty("time_to_call") == true
            ? item.time_to_call
            : "-------"}
        </td>
        <td>
          {item.hasOwnProperty("country_city") == true
            ? item.country_city
            : "-------"}
        </td>

        <td>
          {item.hasOwnProperty("Status") == true ? item.Status : "-------"}
        </td>
        <td>{item.source}</td>
        <td>{item.inventory_id}</td>

        <td>{"-------"}</td>
        <td>{"-------"}</td>
        <td>{"-------"}</td>
        <td>{"-------"}</td>

        {/* <td>{item.Allocate}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td> */}

        <td>
          <button
            data-tip
            data-for="ViewTip"
            type="button"
            className="bg-transparent  button-focus mr-2"
            onClick={() => {
              setShowPlay(true);
              setSelectedID(index);
            }}
          >
            <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
          </button>
          <ReactTooltip id="ViewTip" place="top" effect="solid">
            play
          </ReactTooltip>
        </td>

        <td>
          <Button variant="primary">CTA</Button>
        </td>

        <td>{"-------"}</td>
        <td>
          <div className="d-flex d-inline">
            <button
              data-tip
              data-for="ViewTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            <ReactTooltip id="ViewTip" place="top" effect="solid">
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
        </td>
      </tr>
    );
  };

  return (
    <Container fluid className="Laa">
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>Leads </h3>
      </div>
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row className="mb-2">
          <div className=" pl-2">
            <Dropfile />
          </div>

          <div className=" float-right pl-2">
            <button
              data-tip
              data-for="AddTip"
              type="button"
              className="btn btn-primary"
              style={{
                backgroundColor: "#2258BF",
              }}
              onClick={() => {
                setShowAdd(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} /> Add Lead
            </button>
            <ReactTooltip id="AddTip" place="top" effect="solid">
              Add new Lead
            </ReactTooltip>
          </div>
        </Row>
        <span></span>
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
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
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Budget
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
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Source
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Allocated_To
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Email
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
                        <TableEmployee item={lead} index={index} />
                      ))
                    : null}

                  {/* <h1>Other Leads</h1>
                  {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
                </tbody>
                {data.length > 0 ? (
                  <>
                    <ModalPlay item={data[selectedID]} />
                    <ModalDelete item={data[selectedID]} />
                    <ModalView item={data[selectedID]} />
                    <ModalEdit item={data[selectedID]} />
                  </>
                ) : null}
              </table>
            </div>
            <ModalAdd />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
