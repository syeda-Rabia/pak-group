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
import Pagination from "../../../components/Pagination/Pagination";

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
  const [showReset, setshowReset] = useState(false);
  var today = new Date();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const [data, setData] = useState([]);
  const [home, setHome] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    getAccountListData();
  }, [refresh]);
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
   let resp = await GET(ApiUrls.GET_ALL_ACCOUNTS_LIST + page);

   if (resp?.data != null) {
     setCurrentPage(resp?.data?.Account?.current_page);
     setData(resp?.data?.Account?.data);
   }
   setIsLoading(false);
 };

 const handleShow = (pageCount) => {
   setPageCount(pageCount);
 };

 /*  Pagination data  */
  const getAccountListData= async () => {
    let resp = await GET(ApiUrls.GET_ALL_ACCOUNTS_LIST);
    console.log("-----------account listing----",resp)
    setData(resp?.data?.Account?.data);
    setPageSize(resp?.data?.Account?.per_page);
      setTotalRecord(resp?.data?.Account?.total);
      setCurrentPage(resp?.data?.Account?.current_page);
  };
  
  const SendRecordToServer = async (event) => {
    event.preventDefault();
    // console.log()
    let formData = {
     
      from_date: formatDate(Start),
      to_date: formatDate(End),
    };
    console.log("formdata filter----", formData);
    let resp = await POST(ApiUrls.GET_FILTER_ACCOUNT_DATA, formData);

    console.log("console-uh---", resp);
    if (resp?.hasOwnProperty("success")) {
      setshowReset(true);
      setMessage(resp?.success);
      setShowSuccessAlert(true);
      setIsFilter(true);
      setData(resp?.data?.Account);
     
    } else if (resp?.hasOwnProperty("error")) {
      setMessage(resp.error);
      setShowErrorAlert(true);
      setIsFilter(false);
    }
  };
 
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
        // let { id } = item;
        // console.log("ID is ", id);
  
        // let arr = data;
  
        // arr = arr.filter((user) => user.id != id.toString());
  
        // console.log("arr length ", arr.length, arr, selectedID);
        // setSelectedID((state) => {
        //   if (state == arr.length) return state - 1;
        //   return state;
        // });
        // setData(arr);
        // setShowDelete(false);
      let res = await GET(ApiUrls.DELETE_ACCOUNT + "/" + item.id);
      setShowDelete(false);

      if (res.error === false) {
        setMessage("Account  Deleted Successfully");
        setShowSuccessAlert(true);
        // setRefresh(!refresh);
        setSelectedID(0);
      } else {
        setMessage("Account Not Deleted");
        setShowErrorAlert(true);
      }
      // console.log(res);
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
 
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.account_name}</td>
        <td>{item.total_amount}</td>
        <td>{item?.amount?.amount_spent}</td>
        <td>{item?.amount?.remaing_amount}</td>
        
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
              <Link to={{ pathname: "/admin/edit-account", query: { item } }}>
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
              </Link>
            </button>
            <ReactTooltip id="ViewTip" place="top" effect="solid">
              View or Edit Details
            </ReactTooltip>
            {/* <button
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
            </ReactTooltip> */}
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
            
            <DayPicking  value={today} {...{setStart,setEnd,Start,End}}  />
           
          
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
            {showReset == true ? (
              <button
                type="button"
                className="btn btn-primary leadbtn mt-2"
                onClick={() => {
                  getAccountListData();
                  setshowReset(false);
                  setIsFilter(false);
                 
                  setStart("");
                  setEnd("");
                  // setRefresh(true);
                 
                  // setIsLoading(true);
                  // setIsEmpty(false);
                }}
                style={{
                  backgroundColor: "#2258BF",
                }}
              >
                <span className="text-nowrap">
                  <FontAwesomeIcon icon={faRedo} /> Reverse
                </span>
              </button>
            ) : null}
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
            
             <ModalDelete item={data[selectedID]} />
          </> 
        ) : null}
        {/* <ModalAdd />  */}
       
      </Row>
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
      </Container>
  );
}
export default AdminAccounts;
