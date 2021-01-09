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

export default function LeadsAdmin() {
  const [setPlay, setShowPlay] = useState(false);
  const [value, setValue] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState(LeadsData);
  const [selectedID, setSelectedID] = useState(0);
  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);

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
    const [client, setClient] = useState("");
    const [contact, setContact] = useState("");
    const [project, setProject] = useState("LDA City");
    const [budget, setBudget] = useState("");
    const [toc, setToc] = useState("");

    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("New");
    const [interest, setInterest] = useState("5 marla Residential");
    const [allocate_to, setAllocate] = useState("Rabia");
    const [email, setEmail] = useState("someone@gmail.com");
    const [task, setTask] = useState("Sale");
    const [deadline, setDeadline] = useState("");
    const [source, setSource] = useState("newspaper");

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      let user = {
        id: "1",
        Name: client,
        Contact: contact,
        Project: project,
        Budget: budget,
        Toc: "----",
        Country: country,
        Status: "----",
        Interest: interest,
        Allocate: "----",
        Email: email,
        Task: task,
        Deadline: "----",
      };
      // await
      axios
        .post(
          // "https://pak-group.herokuapp.com/ZaX*m=1/OP/J-D1e8a7z",
          "https://webhook.site/3abd16e7-5188-4930-9571-c2997d67d6aa",
          {
            // firstName: f_name,
            // lastName: l_name,
            // email: email,
            // gender: gender,
            // phone: phone_no,
            // password: password,
            // type: user_type,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(
          (res) => {
            console.log(res);
            console.log(res.data);
          },
          (error) => {
            console.log(error);
          }
        );

      let arr = data;
      arr.push(user);
      setData(arr);
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
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.Name}</td>
        <td>{item.Contact}</td>

        <td>{item.Project}</td>
        <td>{item.Budget}</td>
        <td>{item.Toc}</td>

        <td>{item.Country}</td>
        <td>{item.Status}</td>
        <td>{item.Interest}</td>
        <td>{item.Allocate}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td>

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
      </tr>
    );
  };
  return (
    <Container
      fluid
      className="Laa"
      // style={{
      //   // backgroundColor: 'red',
      //   margin: "auto",
      //   width: "100%",
      //   // border: '3px solid green',
      //   padding: "10px",
      //   marginTop: "10px",
      // }}
    >
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
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })}
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
