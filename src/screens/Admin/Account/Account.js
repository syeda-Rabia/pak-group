import "./Account.css"
import { faEye, faPencilAlt, faPlusSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ErrorNotification from "../../../components/ErrorNotification";
import Image from "../../../components/imageupload";
import Pagination from "../../../components/Pagination/Pagination";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import {
  KeyboardDatePickerAttendance
} from "../../../utils/KeyboardTimePickerExample";
import ApiUrls from "./../../../utils/ApiUrls";
import { publicURLimage } from "./../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
// import "./../Leads/LeadsAdmin.css";

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
  // const [data, setData] = useState( AddCategory);
  const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  // const [date, setDate] = useState();

   /*  Pagination data  */

   const [pageSize, setPageSize] = React.useState(0);
   const [currentPage, setCurrentPage] = React.useState(0);
   const [pageCount, setPageCount] = React.useState(0);
   const [totalRecord, setTotalRecord] = React.useState(0);
 
   const lastIndex = currentPage * pageSize;
   const istIndex = lastIndex - pageSize;
  //  const currentData = data.slice(istIndex, lastIndex);
 
   // const [page, setPage] = React.useState(2);
   const handlePageChange = async (page) => {
     /*
     Api Call
     
     */
     setIsLoading(true);
     let resp = await GET(ApiUrls.GET_EMPLOYEE_DETAIL_LIST + page);
 
     if (resp?.data != null) {
       setCurrentPage(resp?.data?.employes?.current_page);
       setData(resp?.data?.employes?.data);
     }
   
     setIsLoading(false);
   };
 
   const handleShow = (pageCount) => {
     setPageCount(pageCount);
   };
 
   /*  Pagination data  */
 
  var today = new Date();
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  // const handleDateValue = (value) => {
  //   const str = value.toString();

  //   // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
  //   setDate(formatDate(value, "-"));
  // };
  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_EMPLOYEE_DETAIL_LIST);
    console.log("ress0", res);
    if (res?.success != false) {
      setData(res?.data?.employes?.data);
      setPageSize(res?.data?.employes?.per_page);
      setTotalRecord(res?.data?.employes?.total);
      setCurrentPage(res?.data?.employes?.current_page);
    }
    setIsLoading(false);
  };

  
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    // const [interest, SetInterest] = useState("");
    const [name, setName] = useState("");
    const [designation, SetDesignation] = useState("");
    const [joiningDate, SetJoiningDate] = useState("");
    const [dutyHour, setDutyHour] = useState(0);
    const [date, setDate] = useState(new Date());
    const [salaryStatus, SetSalaryStatus] = useState("");
    const [salary, SetSalary] = useState("");
    const [contact, SetContact] = useState("");
    const [CNICno, SetCNIC] = useState("");
    const [image, setImage] = React.useState("");
    const [isImage, setIsImage] = useState(false);

    const handleDateValue = (value) => {
      const str = value.toString();
  
      // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
      setDate(formatDate(value, "-"));
    };
    // const imageRef = React.useRef(null);
  
    // function useDisplayImage() {
    //   const [result, setResult] = React.useState("");
  
    //   function uploader(e) {
    //     const imageFile = e.target.files[0];
  
    //     const reader = new FileReader();
    //     reader.addEventListener("load", (e) => {
    //       setResult(e.target.result);
    //     });
  
    //     reader.readAsDataURL(imageFile);
    //   }
  
    //   return { result, uploader };
    // }
  
    // const { result, uploader } = useDisplayImage();


  

    const addData = async (event) => {
      event.preventDefault();
        // let postData = {
        //   id: "1",
        //   name: name,
        //   designation: designation,
        //   date_of_joining: joiningDate,
        //   salary_status: salaryStatus,
        //   salary: salary,
        //   contact: contact,
        //   cnic: CNICno,
        //   image:result,

        // };

        // let arr = data;
        // arr.push(postData);
        // setData(arr);
        // setShowAdd(false);
    

      //api
      //*--------------------------------------
      let postData = {
        name: name,
          designation: designation,
          date_of_joining: formatDate(date),
          salary_status: salaryStatus,
          salary: salary,
          emergency: contact,
          cnic: CNICno,
          image:image,
          // duty_hours:dutyHour,
      };
      let res = await POST(ApiUrls.POST_EMPLOYEE_DETAIL, postData);
      console.log("post request",postData, res);
      if(res.hasOwnProperty("success")){
        setMessage(res.success);
        setShowSuccessAlert(true);
      } 
      else if(res.hasOwnProperty("error")){
        setMessage(res.error);
        setShowErrorAlert(true);
      }
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
            addData(e);
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
                  required="true"
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
                  required="true"
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
                  required="true"
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
                <div  className="form-control  w-100 "> <KeyboardDatePickerAttendance value={date} showDate={handleDateValue}/> </div>
               
                {/* <input
                  className="form-control  w-100 "
                  placeholder="Enter date"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={joiningDate}
                  onChange={(e) => {
                    SetJoiningDate(e.target.value);
                  }}
                /> */}
              </div>
              <div className="pb-3">
                <h6>CNIC</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="xxxxx-xxxxxxx-x"
                // pattern="^[0-9]{5}-[-|]-[0-9]{7}-[-|]-[0-9]{1}"
                  // Mask="_____-_______-_"
                  required="true"
                  // type="text"
                  // minLength="3"
                  // maxLength="30"
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
                 pattern="[0-9]{4}-[0-9]{7}"
                  required="true"
                  type="tel"
                  minLength="3"
                  maxLength="30"
                  value={contact}
                  onChange={(e) => {
                    SetContact(e.target.value);
                  }}
                />
                 <small>Format:03xx-xxxxxxx</small>
              </div>
              {/* <div className="pb-3">
                <h6>Duty Hour</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter hours"
                  required="true"
                  type="text"
                
                  value={dutyHour}
                  onChange={(e) => {
                    setDutyHour(e.target.value);
                  }}
                />
              </div> */}
              <div className="pb-3">
                <h6>Salary Status</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter salary status"
                  type="text"
               
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

    <Image {...{setImage,image,setIsImage}}/>
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
                // onClick={addData}
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
    // const [joiningDate, SetJoiningDate] = useState(item.date_of_joining);
    const [salaryStatus, SetSalaryStatus] = useState(item.salary_status);
    const [salary, SetSalary] = useState(item.salary);
    const [contact, SetContact] = useState(item.emergency);
    const [CNICno, SetCNIC] = useState(item.cnic);
    const [image, setImage] = React.useState(publicURLimage+item.image);
    // const [image1, setImage1] = React.useState(item.image);
    const [dutyHour, setDutyHour] = useState(0);
    const [date, setDate] = useState(item.date_of_joining);
    const [isImage, setIsImage] = useState(false);


    const handleDateValue = (value) => {
      const str = value.toString();
  
      // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
      setDate(formatDate(value, "-"));
    };
    // const imageRef = React.useRef(null);
  
    // function useDisplayImage() {
    //   const [result, setResult] = React.useState("");
  
    //   function uploader(e) {
    //     const imageFile = e.target.files[0];
  
    //     const reader = new FileReader();
    //     reader.addEventListener("load", (e) => {
    //       setResult(e.target.result);
    //     });
  
    //     reader.readAsDataURL(imageFile);
    //   }
  
    //   return { result, uploader };
    // }
  
    // const { result, uploader } = useDisplayImage();

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push
    var postData
if(isImage==true){
  postData = {
    id: item.id,
    name: name,
      designation: designation,
      date_of_joining: formatDate(date),
      salary_status: salaryStatus,
      salary: salary,
      emergency: contact,
      cnic: CNICno,
      image:image,
      // duty_hours:dutyHour,

  };
}
else{
  postData = {
    id: item.id,
    name: name,
      designation: designation,
      date_of_joining: formatDate(date),
      salary_status: salaryStatus,
      salary: salary,
      emergency: contact,
      cnic: CNICno,
      image:item.image,
      duty_hours:dutyHour,

  };
}
       
      let res = await POST(ApiUrls.POST_EDIT_EMPLOYEE_DETAILS, postData);
      if(res.hasOwnProperty("success")){
        setMessage(res.success);
        setShowSuccessAlert(true);
      } 
      else if(res.hasOwnProperty("error")){
        setMessage(res.error);
        setShowErrorAlert(true);
      }
      console.log("updated",res,postData);
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
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Edit Employee Profile</Modal.Title>
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
                  className="form-control  w-100"
                  placeholder="Enter name"
                  type="text"
                  required="true"
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
                  required="true"
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
                  className="form-control  w-100"
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
                <div  className="form-control  w-100 "> <KeyboardDatePickerAttendance value={date} showDate={handleDateValue}/> </div>
              </div>
              <div className="pb-3">
                <h6>CNIC</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="xxxxx-xxxxxxx-x"
                  mask="_____-_______-_"
                  // placeholder="Enter CNIC no"
                 
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
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{7}"
                  minLength="3"
                  maxLength="30"
                  value={contact}
                  onChange={(e) => {
                    SetContact(e.target.value);
                  }}
                />
                 <small>Format:03xx-xxxxxxx</small>
              </div>
              <div className="pb-3">
                <h6>Salary Status</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter salary status"
                  type="text"
                 
                  value={salaryStatus}
                  onChange={(e) => {
                    SetSalaryStatus(e.target.value);
                  }}
                />
              </div>
              {/* <div className="pb-3">
                <h6>Duty Hour</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter hours"
                  required="true"
                  type="text"
                
                  value={dutyHour}
                  onChange={(e) => {
                    setDutyHour(e.target.value);
                  }}
                />
              </div> */}
              </Col>
              <Col className="col-md-6">
              {/* <div className="App"> */}
     <h6> Employee Image</h6>
      <Image {...{setImage,image,setIsImage}}/>
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
                // onClick={(e) => {
                //   setShowEdit(false);
                //   EditRecordToServer(e);
                //   // setData((state) =>
                //   //   state.map((val) => {
                //   //     if (val.id == item.id) {
                //   //       val.Description = description;
                //   //     }
                //   //     return val;
                //   //   })
                //   // );
                // }}
              >
                Update
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
 

  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
      console.log("item in delete modal",item.id)
      let res = await GET(ApiUrls.DELETE_EMPLOYEE +"/"+ item.id);
      setShowDelete(false);
      console.log(item.id);
      if(res.hasOwnProperty("success")){
        setMessage(res.success);
        setShowSuccessAlert(true);
        setSelectedID(0);
      } 
      else if(res.hasOwnProperty("error")){
        setMessage(res.error);
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
        <td style={{ verticalAlign:"inherit"}}>{index + 1}</td>
        <td>  <IconButton className="zoom" color="primary" aria-label="upload picture" component="span">
                    <Avatar id="avatar" src={publicURLimage+item.image}
                            style={{

                                width: "40px",
                                height: "40px",
                                // margin:"0px", 
                                // padding:"0px",
                            }}
                    />
                </IconButton>
            {/* {item.image} */}
            </td>

       
        <td>{item.name}</td>
         <td>
          <Link to={{ pathname: `/admin/attendance/empAttendance/${item.id}`, query: { item}}}>
          <Tooltip placement="top-start" title="View Employee Attendance">
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
            View Employee Attendance
          </ReactTooltip> */}
        </td>
        <td>{item.designation}</td>
        <td>{item.salary}</td>
        <td>{item.date_of_joining}</td>
        <td>{item.salary_status}</td>
        <td>{item.cnic}</td>
        <td>{item.emergency}</td>
       

        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
            {/* <button
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
            </ReactTooltip> */}
             <Tooltip placement="top-start" title="Edit Employee ">

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
             </Tooltip>
            {/* <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip> */}
             <Tooltip placement="top-start" title="Delete Record">
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
             </Tooltip>
           
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
          <h3 style={{ color: "#818181" }}>Employee Details</h3>
        </Col>
      </Row>

      <Row className=" shadow p-3  bg-white rounded ml-2 mr-1">
        <div>
        <button
          data-tip
          data-for="AddTip"
          type="button"
          className="btn btn-primary mt-2 ml-2"
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
     
        <Link to={{ pathname: "/admin/attendance/todayattendance"}}>
        <button
          data-tip
          data-for="empTip"
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
        <ReactTooltip id="empTip" place="top" effect="solid">
          Add Today Attendancee
        </ReactTooltip>
        </Link>
     
       
        <div className="table-responsive" style={{height: "500px", overflow: "auto"}}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  ID
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
              Employee Image
                  </span>
                </th>
               
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Name
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                <span id="sn" style={{ color: "#818181" }}>
                  Attendance Details
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
                  Joining Date
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
              
                <th scope="col" >
                <span id="sn" style={{ color: "#818181" }}>
                  Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody >
             
                   {data?.length > 0 ? (
                data?.map((lead, index) => (
                  <Table item={lead} index={index} />
                ))
              ) : null}
             
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
      <Row>
          <Col>
          {pageCount>1?(
 <p className="page-info">
 Showing {currentPage} from {pageCount}
</p>
          ):null
         
          }
            
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
    </Container>
  );
}



