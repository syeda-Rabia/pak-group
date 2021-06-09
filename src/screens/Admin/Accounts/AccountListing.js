import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row,Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/Functions";
import { DayPicking } from "../../../utils/YearPicker";
import "./../Dashboard/AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Route } from "react-router-dom";
import {ModalData} from "../../../assests/constants/LAAadmin";
import ReactTooltip from "react-tooltip";
import { dummyData } from "../../../assests/constants/todoList";
import DynamicTable from "../../../components/dynamicTable";
import DynamicTableFormodal from "../../../components/dynamicTableForModal";


import {
  faEye,
  faPencilAlt,
  faTrash, 
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faRedo,
 faTimesCircle,
 faCheckDouble
} from "@fortawesome/free-solid-svg-icons";

function AdminAccounts() {
  const [employees, setEmployees] = React.useState("");
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [showExpense, setShowExpense] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [IsFilter, setIsFilter] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  var today = new Date();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const [data, setData] = useState(ModalData);
  const [home, setHome] = useState(dummyData);
  const [refresh, setRefresh] = useState(false);
  const { RangePicker } = DatePicker;

  const [days, setDays] = useState({
    day: [],
    month: "",
    year: "",
  });
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    // getEmployeeDetails();
    // getLeadReport();
  }, [refresh]);

  // const getLeadReport= async () => {
  //   let resp = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
  //   console.log("-----------dashboard-----".resp)
  //   setData(resp?.report);
  // };
  
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    // console.log()
    // let formData = {
      
    //   from_date:formatDate(Start) ,
    //   to_date: formatDate(End),
    // };
    // // console.log("formdata----", formData);
    // let resp = await POST(ApiUrls.POST_LEAD_FILTER, formData);

    // // console.log("console----", resp);
    // if (resp?.hasOwnProperty("success")){
    //   setMessage(resp?.success);
    //   setShowSuccessAlert(true);
    //   setIsFilter(true);
    //   setData(resp?.report);
     

    // }
    // else if (resp?.hasOwnProperty("error")){
    //   setMessage(resp.error);
    //   setShowErrorAlert(true);
    //   setIsFilter(false);
    // }
  
  };
  const ModalEdit = ({ item }) => {
    //  ;
    const [name, SetName] = useState(item.account_name);
    const [amount, SetAmount] = useState(item.total_amount);
    const [amountSpent, setAmountSpent] = useState(item.amount_spent);
    const [remaining, setRemaining] = useState(item.amount_remaining);



    const EditRecordToServer = async (event) => {
      event.preventDefault();
      event.preventDefault();
      let postData = {
        id: item.id,
        name:name,
        amount: amount,
        spent:amountSpent,
        remaining: remaining,
      
      };

      let arr = data.map((val) => {
        if (val.id == postData.id) val =postData;
        return val;
      });
      // arr.push(postData);
      setData(arr);
      // setShowAdd(false);
      setRefresh(!refresh);

      setShowEdit(false);

      // add validations
      // push

    //   let user = {
    //     id: item.id,
    //     home: home,
    //   };
    //   let res = await POST(ApiUrls.EDIT_INTEREST, user);
    //   if (res.error === false) {
    //     setMessage("Interest Edited Successfully");
    //     setShowSuccessAlert(true);
    //   } else {
    //     setMessage("Interest Not Edited");
    //     setShowErrorAlert(true);
    //   }
    //   // console.log(res);
    //   setRefresh(!refresh);

    //   setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Edit Account </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div>
          <Modal.Body>
            <div className="pb-3">
                <h6>Account Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter name of employee"
                  type="text"
                 
                  value={name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Total Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter amount of loan"
                  type="number"
                 
                  value={amount}
                  onChange={(e) => {
                    SetAmount(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Amount Spent</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter amount"
                  type="number"
                 readOnly
                  value={amountSpent}
                  onChange={(e) => {
                    setAmountSpent(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Remaining Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Remaining Amount"
                  type="text"
                  readOnly
                  value={remaining}
                  onChange={(e) => {
                    setRemaining(e.target.value);
                  }}
                />
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
                }}
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
        setShowDelete(false);
    //   let res = await GET(ApiUrls.DELETE_INTEREST + item.id);
    //   setShowDelete(false);

    //   if (res.error === false) {
    //     setMessage("Interest Deleted Successfully");
    //     setShowSuccessAlert(true);
    //     // setRefresh(!refresh);
    //     setSelectedID(0);
    //   } else {
    //     setMessage("Interest Not Deleted");
    //     setShowErrorAlert(true);
    //   }
    //   // console.log(res);
    //   setRefresh(!refresh);
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
          <Modal.Body>Do you really want to delete Account</Modal.Body>
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
  const ModalAddExpense= ({ item }) => {
  
    const [addExpense, setAddExpense] = useState(item.account_name);
    const [addHome, setAddHome] = useState("");
    const [tableData, setTableData] = React.useState([]);

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      // let projects = {
      //   id: item.id,
      //   name: ProjectName,
      // };
      // let res = await POST(ApiUrls.EDIT_PROJECT, projects); // Api to be implemented
      // if (res.success != false) {
      //   setRefresh(!refresh);
      // }

      // let arr = allProjects.map((val) => {
      //   if (val.id == projects.id) val = projects;
      //   return val;
      // }

      // // arr.push(projects);
      // setData(arr);
      // setAllProjects(arr);
      // console.log("edit", res);
      setShowExpense(false);
    };

    return (
      <Modal
        show={showExpense}
        onHide={() => {
          setShowExpense(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>
            Add Expense
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              {/*             
            <h6>ID</h6>
            <input className="form-control w-100"    placeholder="Enter id" /> */}
              <form>
                <div className="pb-3">
                  <h6>Account Name</h6>
                  <input
                    className="form-control w-100 "
                   
                   
                    min="1"
                    max="250"
                    value={addExpense}
                    readOnly
                    // onChange={(e) => {
                    //   if (e.target.value > 250) {
                    //     alert("You can add max 250 properties at one time");
                    //   } else {
                    //     setAddExpense(e.target.value);
                      
                    //   }
                    
                     
                    // }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Home or Office</h6>
                  <Form.Control
              className="w-100 "
              style={{ height:"32px",fontSize:"13px"}}
              controlid="Sale Person"
              as="select"
              value={addHome}
              onChange={(e) => {
                // console.log("select client ID is -----", e.target.value);
                setAddHome(e.target.value);
              }}
            >
              <option>{null}</option>
              { home.map((item) => (
                    <option
                      style={{ color: "#2258BF"}}
                      // key={e.id+"employee id"}
                      value={item}
                    >
                      {item}
                      {/* {e.first_name + " " + e.last_name} */}
                    </option>
                  ))
                }
            </Form.Control>
                 
                </div>
                <DynamicTableFormodal {...{setTableData,tableData,home}} />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowExpense(false);
                }}
              >
                Close
              </Button>
              {/* <Link to={{ pathname: "/admin/newinventory", query: { item:item,units:addUnit } }}> */}
              <Button
                type="submit"
                value="Submit"
                style={{ backgroundColor: "#2258BF" }}
                
                // onClick={(e) => {
                //   setShowUnit(false);
                //   EditRecordToServer(e);
                // }}
              >
                Add
              </Button>
             
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.account_name}</td>
        <td>{item.total_amount}</td>
        <td>{item.amount_spent}</td>
        <td>{item.amount_remaining}</td>
        <td>
        <button
              data-tip
              data-for="new"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowExpense(true);
                setSelectedID(index);
              }}
            >
              
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlusSquare} />
              
            </button>
            <ReactTooltip id="new" place="top" effect="solid">
            add more invoices
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
              // onClick={() => {
              //   // setShowView(true);
              //   setSelectedID(index);
              // }}
            >
              <Link to={{ pathname: "/admin/accountDetail", query: { item } }}>
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
              </Link>
            </button>
            <ReactTooltip id="ViewTip" place="top" effect="solid">
              View or Edit Details
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
    <Container fluid>
      {/* Ist Row */}
      <Container fluid>
        <Row className="shadow mb-3 bg-white rounded mt-4 pb-2 ">
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
          <Col lg={7} md={7} sm={12} xs={12} xl={7}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Account Listing</h4>
          </Col>
          
         
          <Col lg={4}  md={4} sm={6} xs={12} xl={3} className="pt-2 pb-0 ">
            
            <DayPicking value={today} setStart={setStart} setEnd={setEnd} />
           
          
          </Col>
          <Col lg={1} md={1} sm={4} xs={6} xl={1}>
            <Form.Control
              className="w-100"
              style={{
                marginTop: "32px",
                backgroundColor: "#2258BF",
                color: "white",
              }}
              // disabled

              as="button"
              defaultValue=""
              onClick={(e) => {
                SendRecordToServer(e);
              }}
            >
              Search
            </Form.Control>
          </Col>
        </Row>
      </Container>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        <Row className=" pl-2  w-100 d-flex justify-content-between align-items-center">
          <div>
            <div className="ml-2">
             
             

              <Link to="/admin/addAccount">
                <button
                  type="button"
                  className="btn btn-primary"
                 
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Account
                </button>
              </Link>
             
              <Link to="/admin/loan-details">
                <button
                  type="button"
                  className="btn btn-primary"
                 
                  style={{
                    backgroundColor: "#2258BF",
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Loan
                </button>
              </Link>
              </div>
              </div>
             
             

         
        </Row>
<Row className="mt-3 mb-2 ml-2" ><h4 style={{ color: "#818181" }}>Total Summary :{data?.totalSummary}</h4></Row>
        <div className="table-responsive "  
        // style={{height: "500px", overflow: "auto"}} 
        >
          <table className="table table-hover" >
            <thead >
              <tr>
             
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    ID
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Account Name
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Total Amount
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Amount Spent
                  </span>
                </th>
                

                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Remaining Amount
                  </span>
                </th>

                <th scope="col" className="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Add Expense
                      </span>
                    </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Action
                  </span>
                </th>

               
               

                
              </tr>
            </thead>
            <tbody>
              
                {data?.map((item, index) => (
                  <Table item={item} index={index}/>
                ))}
            
             
            </tbody>
          </table>
        </div>
        {data?.length > 0 && selectedID !== null ? (
          <>
            {/* <ModalPlay item={allLeads[selectedID]} />
         
            <ModalView item={allLeads[selectedID]} />
           
            <ModalClose item={allLeads[selectedID]} /> */}
             <ModalAddExpense item={data[selectedID]} />
             <ModalEdit item={data[selectedID]} />
             <ModalDelete item={data[selectedID]} />
          </> 
        ) : null}
        {/* <ModalAdd />  */}
       
      </Row>
   
      </Container>
  );
}
export default AdminAccounts;
