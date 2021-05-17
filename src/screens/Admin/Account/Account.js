import "./../Leads/LeadsAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { AddCategory } from "./../../../assests/constants/addcategory";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
// import { dummyData } from "../../../assests/constants/todoList";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import PreLoading from "../../../components/PreLoading";
import ActionButton from "./../../../components/ActionButton";
import TextEditor from "../../../components/editor/TextEditor";
import DynamicTable from "../../../components/dynamicTable";
import Pak from "../../../assests/Image_pak.png";
import Image from "../../../components/imageupload";
import {

  
  Input,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Slide,
  Chip,
  Fab,


  Avatar,
} from "@material-ui/core";

import TextArea from "antd/lib/input/TextArea";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function AddAccount() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [data, setData] = useState( AddCategory);
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  

//   const handleFetchData = async () => {
//     setIsLoading(true);
//     let res = await GET(ApiUrls.GET_POLICY_LIST);
//     console.log("ress0", res);
//     if (res?.success != false) {
//       setData(res?.data?.policies);
//     }
//     setIsLoading(false);
//   };
  
//   useEffect(() => {
//     handleFetchData();
//   }, [refresh]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    // const [interest, SetInterest] = useState("");
    const [name, setName] = useState("");
    const [designation, SetDesignation] = useState("");
    const [joiningDate, SetJoiningDate] = useState("");
    const [salaryStatus, SetSalaryStatus] = useState("");
    const [salary, SetSalary] = useState("");
    const [contact, SetContact] = useState("");
    const [CNICno, SetCNIC] = useState("");
    const [image, setImage] = React.useState("");
    const imageRef = React.useRef(null);
  
    function useDisplayImage() {
      const [result, setResult] = React.useState("");
  
      function uploader(e) {
        const imageFile = e.target.files[0];
  
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setResult(e.target.result);
        });
  
        reader.readAsDataURL(imageFile);
      }
  
      return { result, uploader };
    }
  
    const { result, uploader } = useDisplayImage();


  

    const addData = async (event) => {
      event.preventDefault();
        let postData = {
          id: "1",
          name: name,
          designation: designation,
          date_of_joining: joiningDate,
          salary_status: salaryStatus,
          salary: salary,
          contact: contact,
          cnic: CNICno,
          image:result,

        };

        let arr = data;
        arr.push(postData);
        setData(arr);
        setShowAdd(false);
    

      //api
      //*--------------------------------------
    //   let postData = {
    //     title: title,
    //     body: description,
    //   };
    //   let res = await POST(ApiUrls.ADD_POLICY_DETAILS, postData);
    //   console.log("post request", res);
    //   if (res?.error === false) {
    //     setMessage("Policy Added Successfully");
    //     setShowSuccessAlert(true);
    //   } else {
    //     setMessage("Policy Not Added");
    //     setShowErrorAlert(true);
    //   }
      setRefresh(!refresh);

      setShowAdd(false);
    };

    //*-------------------------------------------------------
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
            // SendRecordToServer(e);
          }}
        >
            

          {/* <div className="col-lg-12 shadow bg-white rounded "> */}
            <Modal.Body>
            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
            <Col className="col-md-6">
              <div className="pb-3">
                <h6>Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter name"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Designation</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Designation"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={designation}
                  onChange={(e) => {
                    SetDesignation(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Salary</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Salary"
                  type="number"
                  minLength="3"
                  maxLength="30"
                  value={salary}
                  onChange={(e) => {
                    SetSalary(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Date of Joining</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter date"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={joiningDate}
                  onChange={(e) => {
                    SetJoiningDate(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>CNIC</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter CNIC no"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={CNICno}
                  onChange={(e) => {
                    SetCNIC(e.target.value);
                  }}
                />
              </div>
              
              <div className="pb-3">
                <h6>Contact</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter contact no"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={contact}
                  onChange={(e) => {
                    SetContact(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Salary Status</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter salary status"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={salaryStatus}
                  onChange={(e) => {
                    SetSalaryStatus(e.target.value);
                  }}
                />
              </div>
              </Col>
              <Col className="col-md-6">
              {/* <div className="App"> */}
     <h6> Employee Image</h6>

    <Image/>
      {/* <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          uploader(e);
      console.log("image",image,imageRef);

          
        }}
      />
      <div className="mt-3"> {result && <img ref={imageRef} src={result} alt="" width="150" height="150"/>} */}
      
      {/* </div> */}
    
    {/* </div> */}
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
                onClick={addData}
              >
                Add
              </Button>
            </Modal.Footer>
          {/* </div> */}
        </form>
      </Modal>
    );
  };
  const ModalEdit = ({ item }) => {
    //  ;
    // const [interest, SetInterest] = useState(item.interest);
    const [name, setName] = useState(item.name);
    const [designation, SetDesignation] = useState(item.designation);
    const [joiningDate, SetJoiningDate] = useState(item.date_of_joining);
    const [salaryStatus, SetSalaryStatus] = useState(item.salary_status);
    const [salary, SetSalary] = useState(item.salary);
    const [contact, SetContact] = useState(item.contact);
    const [CNICno, SetCNIC] = useState(item.cnic);
    const [image, setImage] = React.useState(item.image);
    const imageRef = React.useRef(null);
  
    function useDisplayImage() {
      const [result, setResult] = React.useState("");
  
      function uploader(e) {
        const imageFile = e.target.files[0];
  
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setResult(e.target.result);
        });
  
        reader.readAsDataURL(imageFile);
      }
  
      return { result, uploader };
    }
  
    const { result, uploader } = useDisplayImage();

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let postData = {
        id: "1",
        name: name,
        designation: designation,
        date_of_joining: joiningDate,
        salary_status: salaryStatus,
        salary: salary,
        contact: contact,
        cnic: CNICno,
        image:result,

      };
      // let res = await POST(ApiUrls.EDIT_POLICY_DETAILS, postData);
      // if (res.error === false) {
      //   setMessage("Policy Edited Successfully");
      //   setShowSuccessAlert(true);
      // } else {
      //   setMessage("Policy Not Edited");
      //   setShowErrorAlert(true);
      // }
      // console.log(res);
      // setRefresh(!refresh);

      // setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Edit Policies</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
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
            <Col className="col-md-6">
              <div className="pb-3">
                <h6>Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter name"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Designation</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Designation"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={designation}
                  onChange={(e) => {
                    SetDesignation(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Salary</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Salary"
                  type="number"
                  minLength="3"
                  maxLength="30"
                  value={salary}
                  onChange={(e) => {
                    SetSalary(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Date of Joining</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter date"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={joiningDate}
                  onChange={(e) => {
                    SetJoiningDate(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>CNIC</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter CNIC no"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={CNICno}
                  onChange={(e) => {
                    SetCNIC(e.target.value);
                  }}
                />
              </div>
              
              <div className="pb-3">
                <h6>Contact</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter contact no"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={contact}
                  onChange={(e) => {
                    SetContact(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Salary Status</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter salary status"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={salaryStatus}
                  onChange={(e) => {
                    SetSalaryStatus(e.target.value);
                  }}
                />
              </div>
              </Col>
              <Col className="col-md-6">
              {/* <div className="App"> */}
     <h6> Employee Image</h6>
      <Image/>
      {/* <input
        type="file"
        value={item.image}
        onChange={(e) => {
          setImage(e.target.files[0]);
          uploader(e);
      console.log("image",image,imageRef);

          
        }}
      />
      <div className="mt-3"> {result && <img ref={imageRef} src={result} alt="" width="150" height="150"/>}
      
      </div> */}
    
    {/* </div> */}
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
                type="submit"
                value="Submit"
                style={{ backgroundColor: "#2258BF" }}
                onClick={(e) => {
                  setShowEdit(false);
                  EditRecordToServer(e);
                  // setData((state) =>
                  //   state.map((val) => {
                  //     if (val.id == item.id) {
                  //       val.Description = description;
                  //     }
                  //     return val;
                  //   })
                  // );
                }}
              >
                Edit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
 

  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
    //   let res = await GET(ApiUrls.DELETE_POLICY_DETAILS + item.id);
    //   setShowDelete(false);

    //   if (res.error === false) {
    //     setMessage("Policy Deleted Successfully");
    //     setShowSuccessAlert(true);
    //     // setRefresh(!refresh);
    //     setSelectedID(0);
    //   } else {
    //     setMessage("Policy Not Deleted");
    //     setShowErrorAlert(true);
    //   }
    //   console.log(res);
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
          <Modal.Body>Do you really want to delete this Record</Modal.Body>
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
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.designation}</td>
        <td>{item.salary}</td>
        <td>{item.date_of_joining}</td>
        <td>{item.salary_status}</td>
        <td>{item.cnic}</td>
        <td>{item.contact}</td>
        <td>  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Avatar id="avatar" src={Pak}
                            style={{

                                width: "40px",
                                height: "30px",
                                margin:"0px", 
                                padding:"0px",
                            }}
                    />
                </IconButton>
            {/* {item.image} */}
            </td>

        <td>
          <Link to={{ pathname: "/admin/accounts/empAttendance", query: { item}}}>
          {/* <Tooltip placement="top-start" title="View Employee Action"> */}
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
            {/* </Tooltip> */}
          </Link>
          <ReactTooltip id="action" place="top" effect="solid">
            View Employee Attendance
          </ReactTooltip>
        </td>

        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
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
          </div>
        </td>
       
      </tr>
    
    );
  };
  return (
    <Container fluid className="Laa">
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

      <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        {/* <IconButton
          onClick={() => {
            history.push("/admin/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton> */}
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Employee Detail</h3>
        </Col>
      </Row>

      <Row className=" shadow p-3  bg-white rounded ml-2 mr-1">
        <div>
        <button
          data-tip
          data-for="AddTip"
          type="button"
          className="btn btn-primary mt-2"
          style={{
            backgroundColor: "#2258BF",
          }}
          onClick={() => {
            setShowAdd(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} />{" "}
          Add Employee
        </button>
        <ReactTooltip id="AddTip" place="top" effect="solid">
          Add new Employee
        </ReactTooltip>
        </div>
     
        <Link to={{ pathname: "/admin/accounts/todayattendance"}}>
        <button
          data-tip
          data-for="AddTip"
          type="button"
          className="btn btn-primary ml-2"
          style={{
            backgroundColor: "#2258BF",
          }}
          onClick={() => {
            // setShowAdd(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} />{" "}
        Today Attendance
        </button>
        {/* <ReactTooltip id="AddTip" place="top" effect="solid">
          Add Today Attendancee
        </ReactTooltip> */}
        </Link>
     
       
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  ID
                  </span>
                </th>

                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Name
                  </span>
                </th>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Designation
                  </span>
                </th>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Salary
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
                  joining date
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
                Salary Status
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
                CNIC No
                  </span>
                </th>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                Contact
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
              Employee image
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
                  Attendece details
                  </span>
                </th>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {data
                 
                  .map((item, index) => {
                    return <Table item={item} index={index} />;
                  })} */}
              {data?.map((item, index) => {
                return <Table index={index} key={index} item={item} />;
              })}
            </tbody>
            {data?.length > 0 ? (
              <>
                <ModalDelete item={data[selectedID]} />
                <ModalEdit item={data[selectedID]} />
               
              </>
            ) : null}
          </table>
       
          <ModalAdd />
        </div>
      </Row>
    </Container>
  );
}



