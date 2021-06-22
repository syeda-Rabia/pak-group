import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AccountData } from "../../../assests/constants/AccountDetaildata";
import { DayPicking } from "../../../utils/YearPicker";
import DynamicTable from "../../../components/dynamicTable";
import ComplimentDynamicTable from "../../../components/ComplimentDynamicTable";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import ApiUrls from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/Functions";

  import { faPlusSquare, faTimes } from "@fortawesome/free-solid-svg-icons";



import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";

export default function AddAccount() {
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [selectedID, setSelectedID] = useState(0);
 
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
  const [refresh, setRefresh] = useState(false);
  
  // var datee = formatDate(today, "-");
 
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
  var today = new Date();
  const history = useHistory();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();

  console.log("table data", tableData);
  console.log("data", ComplimentData);
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
  useEffect(() => {
    getAccountListData();
  }, [refresh]);

  const getAccountListData= async () => {
    let resp = await GET(ApiUrls.VIEW_ACCOUNT_DETAILS + "/" +5);
    console.log("-----------account data----",resp)
    let obj={};
    resp?.data.HOC.map(v=>{
      obj[v.name]=v.hoc_exp;
    });
    setTableData(obj)

    setData(resp?.data?.HOC);
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
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Account Detail</h3>
        </Col>
      </Row>

      <Row className="col-lg-12 shadow p-3  bg-white rounded ml-1 mr-1 ">
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
                  <h4 style={{ color: "#818181" }}>{item.name}</h4>
                  {item.name !== "Compliment" ? (
                    
                    <>
                   
                  <DynamicTable
                    {...{ setTableData, tableData, value: "hoc_exps", item:item.name }}
                  />
                  </>
                  ): ( <ComplimentDynamicTable
                    {...{ setComplimentData, ComplimentData:item.hoc_exp }}
                  />)}
                </div>
              );
              setHomeData((state) => ({ ...state, [item.name]: tableData }));   

            
             
            
          })}

          {/* <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                  <h4 style={{ color: "#818181" }}>Compliment</h4>
          <ComplimentDynamicTable {...{setComplimentData,ComplimentData}}/>
          
              </div>  */}
        </div>
      </Row>
    </Container>
  );
}
