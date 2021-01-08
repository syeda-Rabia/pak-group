// import React from 'react';
import "./AddEmployee.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import img2 from "./../../../assests/tiwtr-2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlineIcon } from "@material-ui/icons/DeleteOutline";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ModalData } from "./../../../assests/constants/modal";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import Grow from "@material-ui/core/Grow";
import { server_url } from "../../../utils/Config";
// import GetRecordFromServer from "../../../utils/Functions";

import axios from "axios";

export default function AddEmployee() {
  const [userRecord, setUserRecord] = useState("");

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [value, setValue] = useState();
  const [showAlert, setShowAlert] = React.useState(false);

  const [data, setData] = useState(ModalData);
  const [selectedID, setSelectedID] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const handleClose = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    console.log("use efect is run");
    GetUserRecordFromServer();
  }, []);

  const GetUserRecordFromServer = async () => {
    console.log("GetUserRecordFromServer is run");

    fetch(server_url + "admin/employee/all", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjc4M2JjNzQxZTcwMTg2NTNkZTk5YjdiMDdjMDFhYTA0ODIwNTdmYzc5OTcxOGVkYWRjMWUzNjhkZjAzNDk5ZWQ3NjVkYWVlYzhjOWE4ZTYiLCJpYXQiOiIxNjEwMTA5NDUzLjU4ODI1NCIsIm5iZiI6IjE2MTAxMDk0NTMuNTg4MjYwIiwiZXhwIjoiMTY0MTY0NTQ1My41NzI1NjUiLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.EcAsb01SH8jjiQIlkTGl22orcs0LuEH7IXq3iC9GBZXbNLqDRWvMnV4ge7GTWtsxrtwBuUhHARvdZ1aYYx7DnuhDtj4r6bbBeEUEkCgkymm_yiJzePxfU2CgdZJYGdkg7UUkowZcf_f-jm4su8KqCJRy8JMApR9FlspRTH_9ef9I2UPNoetn_wz75lKB74wkpEEpR1VIp9et6TReUONB1IfWl7_nUxb8tiIHn4XjKUaNEsJhKelzPPF3njsgyH9jtlVrhqQfhsJkX1E6yZCt-txd4SqBLnQW5fXIlUxflwwtA2lNkMWBRgaGoAIzNNn9m_hftI2XyZv0JnLN6jCoYC2TbpXEKV2Ot6pioXRCJyOIK3gqkwtMOZR-XHEuVsbLh-GPxOqksGx6SZKhaeVV0rhx4vceChILW2PKHyR327QUeKMLrfK6fwH8UGiORGa_HPs3VfTwjLvxSkF_nZsA2TWpFiKBOum2klQ9hxtbX4ogm69dV63OGkzKJHXfsFQTJYOdoz1-xQXVka2yiKCkHRuBV0jsNpW4yqbnADjX2am8ZeSke72g_TcHFH3iv9A4UWRfKIt31S7K6S57P80l5Jc2OpfpWybCBwaEO3PSuP0uoH8RkCmlwMjBCalOcxPWiqiOWx9KSffFMqFJ7gq_-NFccJRlX0X2YDsc4pfyfpg"}`,
        // Authorization:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1YTY3ZWYwNjU0ZjAwMTdmNzlhZDIiLCJpYXQiOjE2MDk5OTg5NDZ9.ni9LQdAd8lsq3fMuwr2qGmOjRK3_5xA1-17InSj6c10",
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1YTcyZWYwNjU0ZjAwMTdmNzlhZDUiLCJpYXQiOjE2MDk5MzQ3Mjl9.mLqgYtTKk6uevRcfxAKwHnv9_bKZ6n1sHa_2k6fDtGA",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          // setItems(result);

          if (result.error != true) {
            setUserRecord(result.data.users.data);
            console.log("------------------------", result.data.users.data);
          } else {
            console.log(
              "server throw error ---------> ",
              JSON.stringify(result)
            );
          }
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
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
          <Modal.Title style={{ color: "#818181" }}>
            Employee Record
          </Modal.Title>
        </Modal.Header>
        <div class="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div style={{ alignContent: "center" }}>
                <div className="pb-3">
                  <h6>First Name </h6>
                  <input className="form-control  w-100" value={item.Name} />
                </div>
                <div className="pb-3">
                  <h6>Last name</h6>
                  <input
                    className="form-control w-100 "
                    value={item.Last_Name}
                  />
                </div>
                <div className="pb-3">
                  <h6>Email</h6>
                  <input className="form-control w-100 " value={item.Email} />
                </div>
                <div className="pb-3">
                  <h6>Gender</h6>
                  <input className="form-control w-100 " value={item.Gender} />
                </div>

                <div className="pb-3">
                  <h6>Contact</h6>
                  <input className="form-control w-100 " value={item.Contact} />
                </div>
                <div className="pb-3">
                  <h6>Type</h6>
                  <input className="form-control w-100 " value={item.Type} />
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
    const [f_name, setF_name] = useState(item.Name);
    const [l_name, setL_name] = useState(item.Last_Name);
    const [email, setEmail] = useState(item.Email);
    const [gender, setGender] = useState(item.Gender);
    const [password, setPassword] = useState("");

    const [user_type, setUser_type] = useState(item.Type);
    const [phone_no, setPhone_no] = useState(item.Contact);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      console.log("SendRecordToServer", event);
      // add validations
      // push

      let user = {
        id: "1",
        Name: f_name,
        Last_Name: l_name,
        Email: email,
        Gender: gender,
        Contact: phone_no,
        Type: user_type,
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

      let user = {
        id: item.id,
        Name: f_name,
        Last_Name: l_name,
        Email: email,
        Gender: gender,
        Contact: phone_no,
        Type: user_type,
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
          <Modal.Title style={{ color: "#818181" }}>Edit Employee</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div class="col-lg-12 shadow  bg-white rounded ">
            <Modal.Body>
              {/*             
            <h6>ID</h6>
            <input className="form-control w-100"    placeholder="Enter Id" /> */}
              <form>
                <div className="pb-3">
                  <h6>First Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter First Name"
                    type="text"
                    value={f_name}
                    onChange={(e) => {
                      setF_name(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Last Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter Last Name"
                    type="text"
                    value={l_name}
                    onChange={(e) => {
                      setL_name(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Email</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="pb-3">
                  <h6>Phone</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter Phone"
                    type="tel"
                    value={phone_no}
                    onChange={(e) => {
                      setPhone_no(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Gender</h6>
                  <select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
                <div className="pb-3">
                  <h6>Type</h6>
                  <select
                    value={user_type}
                    onChange={(e) => {
                      setUser_type(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <option value={"Admin"}>Admin</option>
                    <option value={"Employee"}>Employee</option>
                  </select>
                </div>
                <div className="pb-3">
                  <h6>Initial Password</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
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
        <div class="col-lg-12 shadow p-3  bg-white rounded ">
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
  const ModalBan = ({ item }) => {
    return (
      <Modal
        show={showBan}
        onHide={() => {
          setShowBan(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Block User</Modal.Title>
        </Modal.Header>
        <div class="col-lg-12 shadow p-3  bg-white rounded ">
          <Modal.Body>Do you really want to Block this Employee!</Modal.Body>
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
              onClick={() => {
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
  const ModalAdd = ({ item }) => {
    const [f_name, setF_name] = useState("");
    const [l_name, setL_name] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [user_type, setUser_type] = useState("Admin");
    const [password, setPassword] = useState("");
    const [phone_no, setPhone_no] = useState("");

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // console.log("SendRecordToServer", event);
      // add validations

      // push

      let user = {
        id: "1",
        Name: f_name,
        Last_Name: l_name,
        Email: email,
        Gender: gender,
        Contact: phone_no,
        Password: password,
        Type: user_type,
      };

      const formData = {
        firstName: f_name,
        lastName: l_name,
        email: email,
        gender: gender,
        phone: phone_no,
        password: password,
        type: user_type,
      };
      const jsonData = JSON.stringify(formData);
      // await axios
      //   .post(
      //     "https://pak-group.herokuapp.com/ZaX*m=1/OP/J-D1e8a7z",
      //     // "https://webhook.site/3abd16e7-5188-4930-9571-c2997d67d6aa",
      //     jsonData,
      //     {
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //   .then(
      //     (res) => {
      //       console.log("resssssssssssssss", res);
      //       if (res.status === 200) {
      //         setShowAlert(true);
      //         // alert("skjdhfkjd");
      //       }

      //       console.log("res.dataaaaaaaaaaa", res.data);
      //     },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );

      // Fetch Code Start
      await fetch("https://pak-group.herokuapp.com/ZaX*m=1/OP/J-D1e8a7z", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log("response", response);
          console.log("response Data", response.data);

          if (response.status === 200) {
            setShowAlert(true);

            // alert("skjdhfkjd");
          }
        })
        // .then((response) => response.json())
        // .then((json) => {
        //   console.log(json);
        // })

        .catch((error) => {
          console.error(error);
        });
      // Fetch Code End
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
          <Modal.Title style={{ color: "#818181" }}>Add Employee</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            SendRecordToServer(e);
          }}
        >
          <div class="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>First Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter First Name"
                  type="text"
                  minLength="3"
                  maxLength="10"
                  value={f_name}
                  onChange={(e) => {
                    setF_name(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Last Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Last Name"
                  type="text"
                  minLength="0"
                  maxLength="10"
                  value={l_name}
                  onChange={(e) => {
                    setL_name(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Email</h6>
                <input
                  className="form-control  w-100"
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="pb-3">
                <h6>Phone</h6>
                <input
                  className="form-control  w-100"
                  placeholder="Enter Phone"
                  type="tel"
                  value={phone_no}
                  onChange={(e) => {
                    setPhone_no(e.target.value);
                  }}
                />
              </div>

              <div className="pb-3">
                <h6>Gender</h6>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  className="form-control form-control-sm w-100"
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>
              <div className="pb-3">
                <h6>Type</h6>
                <select
                  value={user_type}
                  onChange={(e) => {
                    setUser_type(e.target.value);
                  }}
                  className="form-control form-control-sm w-100"
                >
                  <option value={"Admin"}>Admin</option>
                  <option value={"Employee"}>Employee</option>
                </select>
              </div>
              <div className="pb-3">
                <h6>Initial Password</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
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
              {/* <Button
            type="submit"
            value="Submit"
            style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowAdd(false);
            }}
          >
            Add
          </Button> */}
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const TableEmployee = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>

        <td>{item.email}</td>
        <td>{item.gender != "Male" || "Female" ? item.gender : "----"}</td>
        <td>{item.phone != null ? item.phone : "----"}</td>

        <td>{item.user_type == 1 ? "Admin" : "Employee"}</td>
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
              className="bg-transparent  button-focus mr-2"
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
              className="bg-transparent  button-focus mr-2"
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
            <button
              data-tip
              data-for="BlockTip"
              type="button "
              className="bg-transparent  button-focus mr-2 button-bg "
              onClick={() => {
                setShowBan(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faBan} />
            </button>
            <ReactTooltip id="BlockTip" place="top" effect="solid">
              Block User
            </ReactTooltip>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Container
      fluid
      className="Laa"
      style={{
        // backgroundColor: 'red',
        margin: "auto",
        width: "100%",
        // border: '3px solid green',
        padding: "10px",
        marginTop: "10px",
      }}
    >
      {showAlert == true ? (
        <Grow in={showAlert}>
          <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert variant="filled" severity="success">
              <AlertTitle>Success</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Record Submitted
              </span>
            </Alert>
          </Snackbar>
        </Grow>
      ) : null}

      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Employees Record</h3>
      </div>
      <div class="col-lg-12 shadow p-3  bg-white rounded ">
        <button
          data-tip
          data-for="AddTip"
          type="button"
          className="btn btn-primary my-4"
          style={{
            backgroundColor: "#2258BF",
          }}
          onClick={() => {
            setShowAdd(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} /> Create Employee
        </button>
        <ReactTooltip id="AddTip" place="top" effect="solid">
          Add new user
        </ReactTooltip>
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
                    <th scope="col" style={{ color: "#818181" }}>
                      ID
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      First Name
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Last Name
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Email
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Gender
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Contact
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Type
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userRecord != "" ? (
                    userRecord.map((user, index) => (
                      <>
                        <TableEmployee item={user} index={index} />
                      </>
                    ))
                  ) : (
                    <h1>No Data</h1>
                  )}
                  {/* {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
                </tbody>
                {data.length > 0 ? (
                  <>
                    <ModalDelete item={data[selectedID]} />
                    <ModalView item={data[selectedID]} />
                    <ModalEdit item={data[selectedID]} />
                    <ModalBan item={data[selectedID]} />
                  </>
                ) : null}
              </table>
              <ModalAdd />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
