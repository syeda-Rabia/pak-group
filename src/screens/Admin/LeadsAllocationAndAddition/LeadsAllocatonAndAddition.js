import "./LeadsAllocatonAndAddition.css";
import { Container, Row, Col, Button,Modal } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";

import React, { useEffect, useState, useRef } from "react";
import { ModalData } from "./../../../assests/constants/LAAadmin";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import FaceIcon from "@material-ui/icons/Face";
import { GET, POST, formatDate } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import {
  makeStyles,
  MenuItem,
  Snackbar,
  Select,
  Chip,
  Fab,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { Label } from "@material-ui/icons";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import Pagination from "../../../components/Pagination/Pagination";
import nodata from "./../../../assests/nodata.png";
export default function LeadsAllocatonAndAddition(props) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [alertmessage, setAlertMessage] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [showReset, setshowReset] = useState(false);
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const [filterurl, setFilterUrl] = React.useState("");

  var today = new Date();
  var datee = formatDate(today, "-");
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const [date, setDate] = useState(formatDate(today, "-"));

  const [AllleadsToAllocate, setAllLeadsToAllocate] = useState([]);
  const [employeesToAllocateLeads, setEmployeesToAllocateLeads] = useState([]);

  const [select, setSelect] = React.useState([]);
  const [currentStatus, setCurrentStatus] = React.useState("");
  const [task, setTask] = useState("");
  const ref = useRef(null);
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };

  const [viewable, setViewable] = React.useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [IsFilter, setIsFilter] = useState(false);
  const [IsEmpty, setIsEmpty] = useState(false);

  const handleDateValue = (value) => {
    setDate(formatDate(value, "-"));
    // console.log(formatDate(value, "-"));
  };
  //pagination
  const [pageSize, setPageSize] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(null);

  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;

  const handlePageChange = async (page) => {
    /*
     Api Call
     
     */
    setIsLoading(true);
    let resp = await GET(
      ApiUrls.GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS_PAGINATION + page
    );
    // console.log("console log in  pagination-------------------------------------->",resp)
    if (resp?.data != null) {
      setCurrentPage(resp?.data?.leads?.current_page);
      setAllLeadsToAllocate(resp?.data?.leads?.data);
    }
    setIsLoading(false);
  };

  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };
  //pagination end

  //filter pagination

  const [filterPageSize, setfilterPageSize] = React.useState(0);
  const [filtercurrentPage, setFilterCurrentPage] = React.useState(null);
  const [filterpageCount, setFilterPageCount] = React.useState(0);
  const [filtertotalRecord, setfilterTotalRecord] = React.useState(null);

  const filterlastIndex = filtercurrentPage * filterPageSize;
  const filteristIndex = filterlastIndex - filterPageSize;
  const handleFilterPageChange = async (page) => {
    /*
     Api Call
     
     */
     console.log("console log in filter pagination-------------------------------------->")
    setIsLoading(true);
    // console.log("console log-------------------------------------->",filterurl+"&& page="+page)
    let res =await GET(filterurl+"&& page="+page);
    // console.log("console log in filter  pagination-------------------------------------->",props.searchData.url+"&& page="+page,res)
    if (res?.data != null) {
      setFilterCurrentPage(res?.data?.leads?.current_page);
      setAllLeadsToAllocate(res?.data?.leads?.data);
      setfilterPageSize(res?.data?.leads?.per_page);
      setfilterTotalRecord(res?.data?.leads?.total);
     
    }
    // console.log("console log in filter pagination-------------------------------------->")
    setIsLoading(false);
  };

  const handleFilterShow = (filterpageCount) => {
    setFilterPageCount(filterpageCount);
  };
  //filter pagination end
  React.useEffect(() => {
    if (AllleadsToAllocate?.length > 0 && select?.length > 0) {
      // console.log(
      //   AllleadsToAllocate?.filter((leads) =>
      //   select.includes(leads?.id)
      // )
      // )
      let status = AllleadsToAllocate.filter((leads) =>
        select.includes(leads.id)
      )[0].status;
      // console.log(status);
      setCurrentStatus(status);
    } else setCurrentStatus("");
  }, [select]);

  const ModalCTA = () => {
   
    const [message, setMessage] = useState("");
    const [time, setTime] = useState(timee);
    const [date, setDate] = useState(today);
    const [checked, setChecked] = React.useState({ index: 0 });

   
  
    const showText = [
      "Show current Employee previous actions",
      "Don't show current Employee previous actions",
    ];
  
   
   
    const handleChecked = (event, id) => {
      setChecked({ index: id });
    };
    // if (options.title === optionsArray[0].title)
    //
    return (
      <Modal
        show={showModalCTA}
        onHide={() => {
          setShowModalCTA(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Shift and Warn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <p>
              Do you really want to shift this lead to
              <b> {selectedEmployee.name}</b>.
            </p>
            {showText.map((item, index) => {
              return (
                <div key={index}>
                  <Checkbox
                    checked={checked.index === index}
                    color="primary"
                    onChange={(e) => {
                      handleChecked(e, index);
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {item}
                </div>
              );
            })}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setShowModalCTA(false);
            }}
          >
            Close
          </Button>
          <Button
            // style={{ backgroundColor: "#2258BF" }}
            onClick={(e) => {
              // SendShitLeadToServer(e);
              SelectData(e,checked.index)
              setShowModalCTA(false);
            }}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  // var timee =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const useStyles = makeStyles((theme) => ({
    chipGracePeriod: {
      color: "#fff",
      backgroundColor: "#FF5555 !important",
    },
    chipComplete: {
      color: "#fff",
      backgroundColor: "green !important",
    },
    chipFollowUp: {
      color: "#fff",
      backgroundColor: "yellow !important",
    },
    chipOverdue: {
      color: "#fff",
      backgroundColor: "orange !important",
    },
    chipAllocated: {
      color: "#fff",
      backgroundColor: "#90caf9 !important",
    },
    chipLoss: {
      color: "#fff",
      backgroundColor: "#AC917A !important",
    },
    chipLabelColor: {
      color: "black",
    },
  }));
  const handleClose = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const classes = useStyles();

  useEffect(() => {
    getAllLeads();
    getAllEmployees();
  }, [refresh]);
  // console.log(props.searchData, "LET SEE");
  const getAllLeads = async () => {
    setIsLoading(true);

    let resp = await GET(ApiUrls.GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS);
    // console.log("response--------allocation--------", resp);

    if (resp?.data != null) {
      // console.trace("lead allocation", resp);
      setAllLeadsToAllocate(resp?.data?.leads?.data);

      setPageSize(resp?.data?.leads?.per_page);
      setTotalRecord(resp?.data?.leads?.total);
      setCurrentPage(resp?.data?.leads?.current_page);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (props?.searchData?.search == true) {
      setFilterdata();
    }
  }, [props.searchData.search]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const setFilterdata = async () => {
    setshowReset(true);
    setIsLoading(true);

    let res = await GET(props.searchData.url);
    setFilterUrl(props?.searchData?.url);
    // console.log("-------filter -------",props.searchData.url);
    if (res?.error === false) {
      setAllLeadsToAllocate(res?.data?.leads?.data);
      setfilterPageSize(res?.data?.leads?.per_page);
      setfilterTotalRecord(res?.data?.leads?.total);
      setFilterCurrentPage(res?.data?.leads?.current_page);
      setMessage("Lead find Successfully");
      setShowSuccessAlert(true);
      setIsFilter(true);
      setIsEmpty(false);
    } else if (res?.error?.hasOwnProperty("month")) {
      // console.log("res.error.hasOwnProperty(month)");
      // setErrorResponce(resp.error);
      setMessage(res?.error?.month[0]);
      setShowErrorAlert(true);
      // setshowReset(false);
      setshowReset(true);
      setIsEmpty(true);
    } else if (res?.hasOwnProperty("error")) {
      // setMessage(res.error);
      // setShowErrorAlert(true);
      // setshowReset(false);
      setshowReset(true);
      setIsEmpty(true);
    }
    // {
    //   setMessage("Lead Not found");
    //   setShowErrorAlert(true);
    //   setshowReset(false);
    // }

    setIsLoading(false);
  };

  const getAllEmployees = async () => {
    let resp = await GET(ApiUrls.GET_ALL_EMPLOYEES);

    if (resp?.data != null) {
      setEmployeesToAllocateLeads(resp?.data?.users);
    }
  };

  const LeadsAllocationAndAdditionTable = ({ item, index, leads }) => {
    const [time, setTime] = useState(timee);
    const [date, setDate] = useState(datee);

    const [selectedEmployee, setSelectedEmployee] = useState();

    const handlePostUpdate = async (event,view=0) => {
      setIsLoading(true);

      // setAllLeadsToAllocate((state) => {
      //   const temp = [...state];
      //   const objectChange = temp[index];
      //   objectChange.time_to_call = time;
      //   objectChange.dead_line = date;
      //   objectChange.allocated_to = selectedEmployee;
      //   objectChange.lead_id = item.id;
      //   objectChange.task = item.project.category.name;
      //   temp[index] = { ...objectChange };
      //   formData = { ...objectChange };
      //   return temp;
      // });
      //  ;
      // console.log("-----------", {
      //   // time_to_call: time,
      //   dead_line: date,
      //   allocated_to: selectedEmployee,
      //   lead_id: item.id,
      //   task: item.project.category.name,
      //   isView:true,
      // });

      let resp = await POST(ApiUrls.UPDATE_LEAD_TO_USER, {
        // time_to_call: time,
        dead_line: date,
        allocated_to: selectedEmployee,
        lead_id: item.id,
        task: item.project.category.name,
        isView:true,
      });
      // console.log("error message", resp);
      setRefresh(!refresh);
      setIsLoading(false);

      if (resp.error === false) {
        setMessage("LEAD Allocated SUCCESSFULLY");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      // console.log("error message", resp);
    };

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      setTime(res);
    };

    const handleDateValue = (value) => {
      const str = value.toString();

      // var res = str.match(/([A-Za-z]*\s\d{2}\s\d{4})/g)[0];
      setDate(formatDate(value, "-"));
    };
    let created_date = item.created_at;
    let splitDate = created_date.toString().split("T").reverse()[1];
    return (
      <tr>
        <td>
          <input
            type="checkBox"
            disabled={
              currentStatus != ""
                ? currentStatus == item.status
                  ? false
                  : true
                : false
            }
            checked={select.includes(item.id)}
            onChange={(e) => {
              setTask(item.project.category.name);
              HandleName(item.id);
            }}
          />
        </td>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>

        <td>{item.project.name}</td>
        <td>{item.budget}</td>
        {/* <td>
          <KeyboardTimePickerExample value={today} showTime={HandleTimeValue} />
        </td> */}

        <td>{item.source}</td>
        <td>{item.country_city}</td>
        <td>
          {item.status != "" ? (
            <Chip
              classes={{
                label: classes.chipLabelColor,
                root:
                  item.status === "Overdue"
                    ? classes.chipOverdue
                    : item.status === "Grace Period"
                    ? classes.chipGracePeriod
                    : item.status === "Complete"
                    ? classes.chipComplete
                    : item.status === "Follow up"
                    ? classes.chipFollowUp
                    : item.status === "Allocated"
                    ? classes.chipAllocated
                    : item.status === "Loss"
                    ? classes.chipLoss
                    : null,
              }}
              label={item.status}
            />
          ) : (
            "-------"
          )}
          {/* {item.status != "" ? item.status : "------"} */}
          {/* <select className="form-control form-control-sm w-100">
            <option value={"sold"}>Sold</option>
            <option value={"open"}>Open</option>
            <option value={"onhold"}>On Hold</option>
          </select> */}
        </td>
        <td>
        {item.allocated_to[0]?.returned?.first_name}
          {/* {item?.allocated_to?.length > 0
            ? 
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item.allocated_to[0].returned.first_name}
              style={{ marginRight: "5px" }}
            />
            // item.previous_emp[0].returned.first_name
            : "------"} */}
        </td>
        {/* <td>
          {item?.previous_emp.length > 0
            ? item.previous_emp[0].returned?.first_name
            : "------"}
        </td> */}
        {/* <td>{"------"}</td> */}
        <td>
          <Select
            className="form-control form-control-sm w-100"
            value={selectedEmployee}
            onChange={(e) => {
              setSelectedEmployee(e.target.value);
            }}
          >
            {leads.length > 0
              ? leads.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </td>
        {/* <td>
          <select className="form-control form-control-sm w-100">
            <option value={"Rabia"}>Rabia</option>
            <option value={"sana"}>Sana</option>
            <option value={"atif"}>Atif</option>
            <option value={"ali"}>Ali</option>
          </select>
        </td> */}

        <td>
          {item.project.category.name}
          {/* {item.task != null ? item.task : "-------"} */}
          {/* <select className="form-control form-control-sm w-100">
            <option value={"sale"}>Sale</option>
            <option value={"rent"}>Rent</option>
            <option value={"other"}>Other</option>
          </select> */}
        </td>
        <td>{splitDate}</td>
        <td>
          <KeyboardDatePickerExample value={today} showDate={handleDateValue}/>
        </td>
        <td>{item.interest.interest}</td>
        <td>
          {" "}
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#2258BF",
            }}
            
            onClick={(e) => handlePostUpdate(e)}
            
          >
            Update
          </button>
        </td>
      </tr>
    );
  };
  const MultiLeadAssign = async (event) => {
    event.preventDefault();
    let postData = {
      lead_id: select,
      allocated_to: selectedEmployee,
      dead_line: date,
      task: task,
    };
    await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
      method: "post",
      mode: "no-cors",
      crossDomain: true,
      headers: {
        // "Content-Disposition": "attachment; filename=report.xlsx",
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    //  let res = await POST(
    //    ApiUrls.POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY,
    //    postData
    //  );
    //  setRefresh(!refresh);
    //   ;
    // setSelect([]);
    setViewable([]);
    //  let arr = data;
  };
  // console.trace("------------------", AllleadsToAllocate);
  const SelectData = async (event,view=0) => {
    event.preventDefault();
    let postData = {
      lead_id: select,
      allocated_to: selectedEmployee,
      task: task,
      dead_line: date,
      isView:view
    };
    // console.log(postData);

    let res = await POST(ApiUrls.POST_ADD_MULTIPLE_LEAD_ALLOCATION, postData);
    // console.log("accepted", res);
    setRefresh(!refresh);
    setSelect([]);
    setViewable([]);
    if (res.error === false) {
      setAlertMessage("Lead allocated successfully");
      setShowSuccessAlert(true);
    } else {
      setAlertMessage("Lead not shifted");
      setShowErrorAlert(true);
    }
    // let arr = data;
  };

  if (IsEmpty == true) {
    return (
      <div>
        <Row className=" shadow p-3 mb-3 bg-white rounded mt-3">
          <Col lg={10} sm={10} xs={10} xl={11}>
            <h3 style={{ color: "#818181" }}>Leads Allocation and Addition</h3>
          </Col>

          <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
            <div className="float-right ">
              <SwipeableTemporaryDrawer update={props.update} />
            </div>
          </Col>
          {showReset == true ? (
            <button
              type="button"
              className="btn btn-primary leadbtn ml-2"
              onClick={() => {
                getAllLeads();
                setshowReset(false);
                setIsFilter(false);
                setIsEmpty(false);
              }}
              style={{
                backgroundColor: "#2258BF",
              }}
            >
              <FontAwesomeIcon icon={faRedo} /> reverse filter
            </button>
          ) : null}
        </Row>
        <div
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            marginBottom: "auto",
            width: "50%",
          }}
        >
          <img style={{ width: "100%", height: "500px" }} src={nodata} />
        </div>
      </div>
    );
  } else
    return (
      <Container fluid>
        <Row className="shadow p-3 mb-2 bg-white rounded mt-4 ">
          <Col lg={10} sm={10} xs={10} xl={11}>
            <h3 style={{ color: "#818181" }}>Leads Allocation and Addition</h3>
          </Col>

          <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
            <div className="float-right ">
              <SwipeableTemporaryDrawer update={props.update} />
            </div>
          </Col>
        </Row>
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

        {select.length > 0 ? (
          <>
            <form onSubmit={MultiLeadAssign}>
              <Row className="shadow py-2  bg-white rounded mb-2 ">
                {/* <div className="col-lg-7"> */}

                <Col lg={6}>
                  <div class="form-group">
                    <label for="selectEmployee">Select Employee</label>

                    <Select
                      id="selectEmployee"
                      disableUnderline
                      className="form-control form-control-sm w-100"
                      value={selectedEmployee}
                      onChange={(e) => {
                        // console.log(
                        //   "select employee ID is -----",
                        //   e.target.value
                        // );
                        setSelectedEmployee(e.target.value);
                      }}
                    >
                      {employeesToAllocateLeads.length > 0
                        ? employeesToAllocateLeads.map((emp) => (
                            <MenuItem key={emp.id} value={emp.id}>
                              {emp.first_name} {emp.last_name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                </Col>
                {/* </div> */}

                <Col lg={6}>
                  <div className="">
                    <label>Select_Deadline</label>
                  </div>

                  <div className="row">
                    <div className="w-50 px-2 mx-2">
                      <KeyboardDatePickerExample
                        value={date}
                        showDate={handleDateValue}
                      />
                    </div>

                    <div className="ml-3">
                      <button
                        className="btn btn-primary "
                        type="submit"
                        style={{ backgroundColor: "#2258BF" }}
                        // disabled={!select.every((v) => v === true)}

                        onClick={(e)=>{
                          if(currentStatus == "New")
                          SelectData(e)
                          else 
                            setShowModalCTA(true);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </>
        ) : null}
        <Row>
          <div className="col-lg-12 shadow p-3  bg-white rounded ">
            <div
              className="float-right floatingbtn"
              style={{
                display: "flex",
                justifyContent: "space-between",
                zIndex: 100,
              }}
            >
              <div style={{ paddingRight: 10 }}>
                <Fab
                  className={classes.fab}
                  onClick={() => scroll(-50)}
                  color="primary"
                  aria-label="left"
                  style={{
                    inlineSize: "34px",
                    blockSize: "26px",
                    backgroundColor: "#2258bf",
                  }}
                >
                  <ChevronLeftIcon style={{}} />
                </Fab>
              </div>
              <div style={{ paddingRight: 10 }}>
                <Fab
                  className={classes.fab}
                  onClick={() => scroll(50)}
                  color="primary"
                  aria-label="right"
                  style={{
                    inlineSize: "34px",
                    blockSize: "26px",
                    backgroundColor: "#2258bf",
                  }}
                >
                  <ChevronRightIcon />
                </Fab>
              </div>
            </div>

            {showReset == true ? (
              <button
                type="button"
                className="btn btn-primary leadbtn ml-2"
                onClick={() => {
                  getAllLeads();
                  setIsFilter(false);
                  setshowReset(false);
                }}
                style={{
                  backgroundColor: "#2258BF",
                }}
              >
                <FontAwesomeIcon icon={faRedo} /> reverse filter
              </button>
            ) : null}

            <div className="table-responsive" ref={ref}>
              <table
                className="table table-hover"
                style={{ minHeight: "200px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Select
                      </span>
                    </th>
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
                    {/* <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      TOC
                    </span>
                  </th> */}
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Source
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
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Returned From
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Allocate/Re-Allocate
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Task
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Created at
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Deadline
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Update Record
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllleadsToAllocate.length > 0 ? (
                    AllleadsToAllocate.map((lead, index) => (
                      <LeadsAllocationAndAdditionTable
                        item={lead}
                        index={index}
                        leads={employeesToAllocateLeads}
                      />
                    ))
                  ) : (
                    <Snackbar
                      open={true}
                      autoHideDuration={6000}
                      // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                      <Alert variant="filled" severity="info">
                        No Lead to Show
                      </Alert>
                    </Snackbar>
                  )}
                  {/* {data.map((item, index) => {
                  return <TableEmployee item={item} index={index} />;
                })} */}
                </tbody>
              </table>
            </div>
          </div>
          {showModalCTA ? <ModalCTA /> : null}
          <Col>
          {IsFilter==false?(
          pageCount>1?( <p className="page-info">
          Showing {currentPage} from {pageCount}
        </p>):null ):filterpageCount>1?(<p className="page-info">
         Showing {filtercurrentPage} from {filterpageCount}
       </p>):null}
        </Col>
          <Col>
            {IsFilter == false ? (
              <Pagination
                itemsCount={totalRecord}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                show={handleShow}
              />
            ) :<Pagination
            itemsCount={filtertotalRecord}
            pageSize={filterPageSize}
            currentPage={filtercurrentPage}
            onPageChange={handleFilterPageChange}
            show={handleFilterShow}
          />}
          </Col>
        </Row>
      </Container>
    );
}
