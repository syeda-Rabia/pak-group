import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyData } from "../../../assests/constants/todoList";
import { DayPicking } from "../../../utils/YearPicker";
import DynamicTable from "../../../components/dynamicTable";
import ComplimentDynamicTable from "../../../components/ComplimentDynamicTable";
import { faPlusSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { v4 as uuidv4 } from "uuid";

import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/Functions";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
export default function AddAccount() {
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = React.useState({});
  const [homeData, setHomeData] = React.useState([]);
  const [ComplimentData, setComplimentData] = React.useState([]);
  const [accountData, setAccountData] = React.useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [accountName, setAccountName] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  var today = new Date();
  const history = useHistory();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const arrayData = () => {
    let arr = Object.keys(tableData).map((key) => {
      return { name: key, hoc_exps: tableData[key] };
    });
    arr.push({ name: "Compliment", hoc_exps: ComplimentData.Compliment });
    //   console.log({hoc:arr,account: {
    //     "account_name":"Account1",
    //     "total_amount":"5000",
    //     "start_date":"2021-06-01",
    //     "end_date":"2021-06-09"
    // }});
    return arr;
  };
  React.useEffect(()=>{
    let data={
      "Account": [
          {
              "id": 1,
              "account_name": "Account1",
              "total_amount": "5000",
              "start_date": "2021-06-01",
              "end_date": "2021-06-09",
              "is_deleted": 0,
              "created_at": "2021-06-21T07:44:21.000000Z",
              "updated_at": "2021-06-21T07:44:21.000000Z",
              "hoc": [
                  {
                      "id": 1,
                      "account_id": 1,
                      "name": "Home1",
                      "is_deleted": 0,
                      "created_at": "2021-06-21T07:44:21.000000Z",
                      "updated_at": "2021-06-21T07:44:21.000000Z",
                      "hoc_exp": [
                          {
                              "id": 1,
                              "hoc_id": 1,
                              "name_of_invoice": "Home1 name_of_invoice",
                              "amount_spent": "001 amount_spent",
                              "description": "001 description",
                              "cor": "001 cor",
                              "quantity": null,
                              "distributed_to": null,
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          },
                          {
                              "id": 2,
                              "hoc_id": 1,
                              "name_of_invoice": "Home1 name_of_invoice",
                              "amount_spent": "002 amount_spent",
                              "description": "002 description",
                              "cor": "002 cor",
                              "quantity": null,
                              "distributed_to": null,
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          }
                      ]
                  },
                  {
                      "id": 2,
                      "account_id": 1,
                      "name": "Home2",
                      "is_deleted": 0,
                      "created_at": "2021-06-21T07:44:21.000000Z",
                      "updated_at": "2021-06-21T07:44:21.000000Z",
                      "hoc_exp": [
                          {
                              "id": 3,
                              "hoc_id": 2,
                              "name_of_invoice": "Home2 name_of_invoice",
                              "amount_spent": "003 amount_spent",
                              "description": "003 description",
                              "cor": "003 cor",
                              "quantity": null,
                              "distributed_to": null,
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          },
                          {
                              "id": 4,
                              "hoc_id": 2,
                              "name_of_invoice": "Home2 name_of_invoice",
                              "amount_spent": "004 amount_spent",
                              "description": "004 description",
                              "cor": "004 cor",
                              "quantity": null,
                              "distributed_to": null,
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          }
                      ]
                  },
                  {
                      "id": 3,
                      "account_id": 1,
                      "name": "Compliment",
                      "is_deleted": 0,
                      "created_at": "2021-06-21T07:44:21.000000Z",
                      "updated_at": "2021-06-21T07:44:21.000000Z",
                      "hoc_exp": [
                          {
                              "id": 5,
                              "hoc_id": 3,
                              "name_of_invoice": "Compliment name_of_invoice",
                              "amount_spent": "003 amount_spent",
                              "description": "003 description",
                              "cor": "003 cor",
                              "quantity": "10",
                              "distributed_to": "Distributed To",
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          },
                          {
                              "id": 6,
                              "hoc_id": 3,
                              "name_of_invoice": "Compliment name_of_invoice",
                              "amount_spent": "004 amount_spent",
                              "description": "004 description",
                              "cor": "004 cor",
                              "quantity": "10",
                              "distributed_to": "Distributed To",
                              "is_deleted": 0,
                              "created_at": "2021-06-21T07:44:21.000000Z",
                              "updated_at": "2021-06-21T07:44:21.000000Z"
                          }
                      ]
                  }
              ]
          }
      ]}
      setTimeout(() => {
        setTableData(data.Account.hoc.name.hoc_exp)
      }, 1500);
      console.log("kknkn",tableData)
  },[])
  const handleData = (data) => {
    setData((state) => state.concat(data));
    setTableData((state) => ({
      ...state,
      [data]: [
        {
          id:null,
          name_of_invoice: "",
          amount_spent: "",
          description: "",
          cor: "PG-" + uuidv4().split("-")[0],
        },
      ],
    }));
  };
  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);

    setData(list);
  };
  const SendRecordToServer = async (event) => {
    // event.preventDefault();
    let formData = {
      account: {
        account_name: accountName,
        total_amount: totalAmount,
        start_date: formatDate(Start),
        end_date: formatDate(End),
      },
      hoc: arrayData(),
      // account_name: accountName,
      //   amount: totalAmount,
      //   from_date: formatDate(Start),
      //     to_date: formatDate(End),
      //     data:accountData,
    };
    // const myObjStr = JSON.stringify(myObjStr);
    let resp = await POST(ApiUrls.POST_ADD_EXPENCES, formData);
    console.log("account data", formData, resp);
    if (resp.error == false) {
      setMessage("Account Created Successfully.");
      setShowSuccessAlert(true);
    } else {
      // ;
      setMessage("Account Not Created");
      setShowErrorAlert(true);
    }

    setShowAdd(false);
  };
  console.log("table data", tableData);
  console.log("home data", homeData);
  console.log("data", ComplimentData);
  const ModalAdd = ({ item }) => {
    const [home, SetHome] = useState("");
    const [type, SetType] = useState("Home");
    const addData = async (event) => {
      event.preventDefault();
      let postData = {
        // id: "1",
        name: home,
        type: type,
      };
      // let arr = data;
      // arr.push(postData);
      // setData(arr);
      // setShowAdd(false);
      //api
      // let res = await POST(ApiUrls.POST_ADD_HOME_OR_OFFICE, postData);
      // console.log("post request", res,postData);
      // if (res?.hasOwnProperty("success")) {
      //   setMessage(res?.success);
      //   setShowSuccessAlert(true);
      // } else if (res?.hasOwnProperty("error")) {
      //   setMessage(res?.error);
      //   setShowErrorAlert(true);
      // }
      // setRefresh(!refresh);

      // setShowAdd(false);
    };
    //api
    // };

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
          <Modal.Title style={{ color: "#818181" }}>
            Add Home and Office
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded">
            <Modal.Body>
              <div className="pb-3">
                <h6>Home and Office</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Home or Office name"
                  type="text"
                  value={home}
                  onChange={(e) => {
                    SetHome(e.target.value);
                  }}
                />
              </div>
              {/* <div className="pb-3">
                <h6>Select Home or office</h6>
                <Form.Control
              className="w-100 "
              style={{ height: "32px", fontSize: "13px" }}
              controlid="type"
              as="select"
              value={type}
              onChange={(e) => {
                console.log("select client ID is -----", e.target.value);
                SetType(e.target.value);
              }}
            >
              
              <option value={"Home"}>Home</option>
              <option value={"Office"}>Office</option>
             
            </Form.Control>
              </div> */}
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
                onClick={() => {
                  handleData(home);
                  setShowAdd(false);
                }}
                // onClick={addData}
              >
                Add
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        <IconButton
          onClick={() => {
            history.push("/admin/account");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
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
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Add Account</h3>
        </Col>
      </Row>

      <Row className="col-lg-12 shadow p-3  bg-white rounded ml-1 mr-1 ">
        <Container fluid>
          <Row className="">
            <Col lg={2} sm={12} xs={12} xl={2}>
              {/* <span class="text-nowrap"> Account Name</span> */}
              <h6 style={{ color: "#818181" }}> Account Name</h6>
              <input
                className="form-control w-100 bg-white"
                placeholder=""
                type="text"
                value={accountName}
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              />
            </Col>
            <Col lg={2} sm={12} xs={12} xl={2}>
              {/* <span class="text-nowrap">Total samount</span> */}
              <h6 style={{ color: "#818181" }}>Total Amount</h6>

              <input
                className="form-control w-100 bg-white"
                placeholder=""
                type="number"
                value={totalAmount}
                onChange={(e) => {
                  setTotalAmount(e.target.value);
                }}
              />
            </Col>
            <Col lg={3} sm={12} xs={12} xl={3}>
              <DayPicking value={today} {...{ setStart, setEnd, Start, End }} />
            </Col>
          </Row>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#2258BF",
            }}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} /> Add Home and office
          </button>
        </Container>

        {/* <Col lg={4} md={4} sm={12} xs={12} xl={4}>
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Account Name</h4>
            <input
              className="form-control bg-white"
              placeholder=""
              type="text"
            
              value={null}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
            <h4 style={{ color: "#818181",paddingTop:"12px" }}>Total Amount</h4>
            <input
              className="form-control  bg-white"
              placeholder=""
              type="text"
            
              value={null}
              // onChange={(e) => {
              //   setTargetAssigned(e.target.value);
              // }}
            />
            <DayPicking value={today} setStart={setStart} setEnd={setEnd}/>
          </Col> */}

        {/* <Col lg={7} md={7} sm={12} xs={12} xl={7} >
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Total Amount :____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Amount spent:____________________</h4>
          <h4 style={{ color: "#818181",paddingTop:"12px" }}>Remaining:____________________</h4>
          </Col> */}

        <div className="w-100">
          {data?.map((item, index) => {
            return (
              <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                <div>
                  {" "}
                  <button
                    type="button"
                    className=" bg-transparent  button-focus "
                    style={{
                      fontSize: "26px",
                      backgroundColor: "#2258BF",
                      fontWeight: "bold",
                      float: "right",
                    }}
                    onClick={() => {
                      handleRemove(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <h4 style={{ color: "#818181" }}>{item}</h4>

                <DynamicTable
                  {...{ setTableData, tableData, value: "hoc_exps", item }}
                />
              </div>
            );
            setHomeData((state) => ({ ...state, [item]: tableData }));
          })}
          <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
            <h4 style={{ color: "#818181" }}>Compliment</h4>
            <ComplimentDynamicTable
              {...{ setComplimentData, ComplimentData }}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary mt-5"
              style={{
                backgroundColor: "#2258BF",
                float: "right",
              }}
              onClick={(e) => {
                console.log("home data", homeData);
                setAccountData({ ...tableData, ...ComplimentData });
                SendRecordToServer(e);
                let arr = Object.keys(tableData).map((key) => {
                  return { name: key, hoc_exps: tableData[key] };
                });
                arr.push({
                  name: "Compliment",
                  hoc_exps: ComplimentData.Compliment,
                });
                console.log({
                  hoc: arr,
                  account: {
                    account_name: "Account1",
                    total_amount: "5000",
                    start_date: "2021-06-01",
                    end_date: "2021-06-09",
                  },
                });
              }}
            >
              Finish
            </button>
          </div>
        </div>
        <ModalAdd />
      </Row>
    </Container>
  );
}
