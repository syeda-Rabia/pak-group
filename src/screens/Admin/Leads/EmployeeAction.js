import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { GET } from "../../../utils/Functions";
import AdminActionStepper from "./../../../components/adminActionStepper";
import EmployeeActionStepper from "./../../../components/EmployeeActionStepper";
import PreLoading from "./../../../components/PreLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
 faCircle,

} from "@fortawesome/free-solid-svg-icons";
// import "./../Leads/EmployeeLeads.css";
const useStyles = makeStyles((theme) => ({
  chipGracePeriod: {
    color: "#fff",
    backgroundColor: "red !important",
  },
  chipComplete: {
    color: "#fff",
    backgroundColor: "#67B367 !important",
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
  chipShifted: {
    color: "#fff",
    backgroundColor: "#CEAAC3 !important",
  },
  chipLoss: {
    color: "#fff",
    backgroundColor: "#AC917A !important",
  },
  chipLabelColor: {
    color: "black",
  },
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subNested: {
    paddingLeft: theme.spacing(6),
  },
}));

function EmployeeAction(props, lead_id) {
  const [data, setData] = React.useState([]);
  const [allactions, setAllActions] = useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showModalAction, setShowModalAction] = React.useState(true);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [goback, setGoBack] = React.useState("leads");
  const [showSuccessAlert, setShowSuccessAlert] = React.useState("");
  const [showErrorAlert, setShowErrorAlert] = React.useState("");
  const [postData, setPostData] = React.useState({});
  const [recordings, setRecordings] = React.useState([]);
  const [setPlay, setShowPlay] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState(null);
  const [showReset, setshowReset] = useState(false);
  const [filterurl, setFilterUrl] = React.useState("");

  const [IsFilter, setIsFilter] = useState(false);
  const [IsEmpty, setIsEmpty] = useState(false);

  const ref = useRef(null);
  // console.log(postData, "YES", value);
  var today = new Date();
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // let currentTime =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // today = mm + "-" + dd + "-" + yyyy;
  today = yyyy + "-" + mm + "-" + dd;
  const classes = useStyles();
  // const []

  // const handleMenuButtonClick = (event) => {};

  const leadID = props?.location?.query;
  const back=props?.location?.goback; 
  // const ActionId = props?.location?.data?.adminAction;

  const handleFetchData = async () => {
    setIsLoading(true);

    // let formData = {
    //   actions: ActionId,
    //   ids: leadID,
    // };
    let res = await GET(
      ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + leadID.item.id
    );
    console.log("-------------------------------", res);

    if (res?.success != false) {
      setData(res?.data?.actions);
      // setAllActions(res?.data?.adminAction);
    }
    // console.log("---------------leads----------------", formData, res);
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [leadID]);
  // console.log("---------------props----------------", props?.location?.data);
  const history = useHistory();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <Container fluid className="Laa">
      {/* <PreLoading startLoading={isLoading} /> */}
      <Row className=" shadow p-3 mb-3 mt-3 bg-white rounded ml-1 mr-1">
       <IconButton
          onClick={() => {
            if(back.goback=="leads"){
              history.push("/admin/leads");
            }
            if(back.goback=="dashboard"){
              history.push("/");
            }
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <h3 style={{ color: "#818181" }}>  Action Summary</h3>
        {/* <button className="btn btn-primary mt-0" style={{float:"right"}}>Abc</button> */}
      </Row>

      <PreLoading startLoading={isLoading} />

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={alertmessage}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={alertmessage}
        closeError={setShowErrorAlert}
      />

      <Row className=" shadow p-3  bg-white rounded ml-1 mr-1">
        <div className="col-md-6 col-sm-12 w-100">
          {data?.length > 0
            ? data?.map((item, index) =>
            // let date=item.created_at;
            // const d=date.toString().split("T")[0];
                item.action_by == "Admin" ? (
                  <>
                  <div className="col-12 col-md-6" style={{ dispaly: "flex" }}>
                    {" "}
                    <AdminActionStepper data={item} />
                  </div>
                   <div style={{width:"100%",border:"2px solid gray",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"50px"}}>
                   <p style={{position:"absolute",marginTop:"13px",backgroundColor:"white"}}><b>Date:</b> {item.created_at.toString().split("T")[0]} <b>Time:</b>  {item.created_at.toString().split("T")[1].split(".")[0]}</p>
                 </div>
                 </>
                ) : (
                  <>
                  <div className="col-12 d-block d-md-flex  justify-content-end">
                    <div
                      className="col-12 col-md-6"
                      style={{ dispaly: "flex", alignSelf: "flex-end" }}
                    >
                   

                      <EmployeeActionStepper data={item} />
                    </div>
                  </div>
                  <div style={{width:"100%",border:"2px solid gray",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"50px"}}>
                   <p style={{position:"absolute",marginTop:"13px",backgroundColor:"white"}}><b>Date:</b> {item.created_at.toString().split("T")[0]} <b>Time:</b>  {item.created_at.toString().split("T")[1].split(".")[0]}</p>
                 </div>
                  </>
                )
              )
            : null}
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeAction);
