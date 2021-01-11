// import React from 'react';
import "./LeadsAdmin.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
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

export default function LeadsAdmin() {
  const [allLeads, setAllLeads] = useState([]);

  const [setPlay, setShowPlay] = useState(false);
  const [value, setValue] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState(LeadsData);
  const [selectedID, setSelectedID] = useState(0);
  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);

  useEffect(() => {
    getAllLeadsData();
  }, []);

  const getAllLeadsData = async () => {
    console.log("get all lead call ");

    let resp = await GET(ApiUrls.GET_ALL_LEADS);

    if (resp.data != null) {
      setAllLeads(resp.data.leads.data);
    }

    console.log("***********************");
    console.log(JSON.stringify(resp.data.leads));
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
    const [interest, setInterest] = useState([
      {
        id: 4,
        project_id: 1,
        inventory_name: "resen all",
        block_name: "V",
        inventory_category: "Rent",
        property_status: "Open",
        is_deleted: 0,
        created_at: null,
        updated_at: "2021-01-09T08:31:48.000000Z",
      },
      {
        id: 1,
        project_id: 1,
        inventory_name: "house",
        block_name: "V",
        inventory_category: "Rent",
        property_status: "Open",
        is_deleted: 0,
        created_at: null,
        updated_at: "2021-01-09T08:31:48.000000Z",
      },
    ]);
    const [allocate_to, setAllocate] = useState("Rabia");
    const [email, setEmail] = useState("");
    const [task, setTask] = useState("Sale");
    const [deadline, setDeadline] = useState("");
    const [source, setSource] = useState("newspaper");

    useEffect(() => {
      getProjectDetails();
    }, []);

    // useEffect(() => {
    //   getInventroyDataAgaintsProject(project);
    // }, [project]);

    const getProjectDetails = async () => {
      console.log("getProjectDetails is call ----- ");

      let resp = await GET("admin/project/all");

      let { data } = resp;
      if (data != null) {
        setAllProjects(resp.data.users.data);
      }

      console.log(
        "response in Leads ------",
        JSON.stringify(resp.data.users.data)
      );
    };

    const getInventroyDataAgaintsProject = async (id) => {
      let resp = await GET("admin/inventory/all/" + id);

      if (resp.data != null) {
        let { inventories } = resp.data;
        // setInterest(inventories);
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
          <div class="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
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
                        console.log(
                          "select project ID is -----",
                          e.target.value
                        );
                        setProject(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allProjects.length > 0
                        ? allProjects.map((pro) => (
                            <option key={pro.id} value={pro.id}>
                              {pro.name}
                            </option>
                          ))
                        : null}

                      {/* <option value={"LDA"}>LDA City</option>
                      <option value={"DHA"}>DHA </option> */}
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
                      value={inventory}
                      onChange={(e) => {
                        console.log(
                          "selected Inventriry is ---- ",
                          e.target.value
                        );
                        setInventory(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {interest.length > 0
                        ? interest.map((int, index) => (
                            <option key={int.id} value={int.id}>
                              {int.inventory_name} - {int.block_name}
                            </option>
                          ))
                        : null}
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

                  <div className="pb-3">
                    <h6>Source</h6>
                    <select
                      value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <option key={src} value={src}>
                              {src}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
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
      </tr>
    );
  };

  return (
    <Container fluid className="Laa">
      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>Leads </h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row className="mb-2">
          <div className=" pl-2">
            <Dropfile />
          </div>

          <ReactTooltip id="AddTip" place="top" effect="solid">
            import Excel
          </ReactTooltip>
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
