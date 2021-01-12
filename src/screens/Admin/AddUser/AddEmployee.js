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
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { server_url, token } from "../../../utils/Config";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/Functions";

import { validateEmail } from "../../../utils/Validation";
// import GetRecordFromServer from "../../../utils/Functions";
import {
  Backdrop,
  makeStyles,
  CircularProgress,
  Slide,
  Grow,
  Snackbar,
  Input,
} from "@material-ui/core";
import Pagination from "../../../components/Pagination/Pagination";

import axios from "axios";

export default function AddEmployee() {
  const [userRecord, setUserRecord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [value, setValue] = useState();
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);

  const [data, setData] = useState(ModalData);
  const [selectedID, setSelectedID] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  /*  Pagination data  */

  const [pageSize, setPageSize] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(null);

  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);

  // const [page, setPage] = React.useState(2);
  const handlePageChange = async (page) => {
    /*
    Api Call
    
    */
    let resp = await GET(ApiUrls.USER_DATA_PAGINATION + page);

    if (resp.data != null) {
      setCurrentPage(resp.data.users.current_page);
      setUserRecord(resp.data.users.data);
    }

    // let res = await fetch(server_url + "admin/employee/all?page=" + page, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log("Pagination Button hit", result.data.users);
    //       setCurrentPage(result.data.users.current_page);
    //       setUserRecord(result.data.users.data);
    //     },

    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  };

  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };

  /*  Pagination data  */

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleErrorClose = () => {
    setErrorAlert(false);
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    console.log("use efect is run");
    GetUserRecordFromServer();
  }, []);

  const GetUserRecordFromServer = async () => {
    console.log("GetUserRecordFromServer is run");

    // setIsLoading(true);

    let resp = await GET(ApiUrls.GET_ALL_USER);

    // console.log("res --------------------------------------------------------");
    // console.log(JSON.stringify(resp));
    if (resp.data != null) {
      setUserRecord(resp.data.users.data);
      setPageSize(resp.data.users.per_page);
      setTotalRecord(resp.data.users.total);
      setCurrentPage(resp.data.users.current_page);
    }

    // setIsLoaded(false);

    // let res = await fetch(server_url + "admin/employee/all", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       setIsLoaded(true);
    //       // setItems(result);

    //       if (result.error != true) {
    //         setUserRecord(result.data.users.data);
    //         setPageSize(result.data.users.per_page);
    //         setTotalRecord(result.data.users.total);
    //         setCurrentPage(result.data.users.current_page);
    //         console.log("------------------------", result.data);
    //       } else {
    //         console.log(
    //           "server throw error ---------> ",
    //           JSON.stringify(result)
    //         );
    //       }
    //     },
    //     (error) => {
    //       setIsLoaded(true);
    //       setError(error);
    //       console.log(error);
    //     }
    //   );
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
        <div className="col-lg-12 shadow   bg-white rounded ">
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
          <div className="col-lg-12 shadow  bg-white rounded ">
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
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
    const [gender, setGender] = useState("Male");
    const [user_type, setUser_type] = useState("Employee");
    const [password, setPassword] = useState("");
    const [phone_no, setPhone_no] = useState("");
    const [emailError, setEmailError] = useState(false);

    const SendRecordToServer = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      // let resp = await POST(ApiUrls.GET_ALL_USER);
      // if(resp.data !=''){

      // }

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
        first_name: f_name,
        last_name: l_name,
        email: email,
        gender: gender,
        phone: phone_no,
        password: password,
        user_type: user_type,
      };

      try {
        let resp = await fetch(server_url + "admin/employee/add", {
          method: "post",
          // mode: "no-cors",
          crossDomain: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            first_name: f_name,
            last_name: l_name,
            email: email,
            gender: gender == "male" ? "Male" : "Female",
            phone: phone_no,
            password: password,
            user_type: user_type == "Admin" ? "Admin" : "Employee",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("response from server  -------- ,", json);
            if (json.success != false) {
              setShowAlert(true);
              console.log("DATA SET SUCCESSFULLY");

              setUserRecord((state) => [formData].concat(state));
            }
            if (json.success == false) {
              setErrorAlert(true);
            }
          });
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);

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
          <div className="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>First Name</h6>
                <Input
                  className="form-control  w-100 "
                  placeholder="Enter First Name"
                  required="true"
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
                <Input
                  className="form-control  w-100 "
                  placeholder="Enter Last Name"
                  required="true"
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
                <Input
                  className="form-control  w-100"
                  // {true ?  error :null}
                  error={emailError ? true : false}
                  // style={{ borderColor: "red !important" }}
                  placeholder="Enter Email"
                  required="true"
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
                <h6>Phone</h6>
                <Input
                  className="form-control  w-100"
                  placeholder="Enter Phone"
                  required="true"
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
                <Input
                  className="form-control  w-100 "
                  placeholder="Enter password"
                  required="true"
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
              <Button style={{ backgroundColor: "#2258BF" }} type="submit">
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
        margin: "auto",
        width: "100%",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      {showAlert == true ? (
        <Slide in={showAlert} direction="up">
          <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="success">
              <AlertTitle>Success</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Record Submitted
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}

      {/* Error Alert */}
      {errorAlert == true ? (
        <Slide in={errorAlert} direction="up">
          <Snackbar
            open={errorAlert}
            autoHideDuration={3000}
            onClose={handleErrorClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Record not Submitted
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}

      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Employees Record</h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                  {
                    userRecord != ""
                      ? userRecord.map((user, index) => (
                          <>
                            <TableEmployee item={user} index={index} />
                          </>
                        ))
                      : // <h1>No Data</h1>
                        null

                    // <Skeleton variant="rect" width={"100%"} height={"100%"} />
                  }
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
        <Row>
          <Col>
            <p className="page-info">
              Showing {currentPage} from {pageCount}
            </p>
          </Col>
          <Col>
            <Pagination
              itemsCount={totalRecord}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              show={handleShow}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
