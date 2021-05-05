import { Chip, makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ErrorNotification from "../../../components/ErrorNotification";
import SuccessNotification from "../../../components/SuccessNotification";
import ApiUrls from "../../../utils/ApiUrls";
import { POST } from "../../../utils/Functions";
import AdminActionStepper from "./../../../components/adminActionStepper";
import PreLoading from "./../../../components/PreLoading";
import "./../Leads/EmployeeLeads.css";

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

function EmployeeLeadsNotification(props, lead_id) {
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

  // const leadID = props?.location?.data?.data;

  // const ActionId = props?.location?.data?.adminAction;
  const handleFetchData = async () => {
    setIsLoading(true);

    let endpoint = window.location.href
      .split("/")
      [window.location.href.split("/").length - 1].toLocaleLowerCase();
      console.log("end point",endpoint)

    var closed = localStorage.getItem("item.screen");
    let data = JSON.parse(closed);
    console.log("-local---", data);

    let formData = {
      // actions: ActionId,
      ids: data?.data,
    };
    let res = await POST(ApiUrls.POST_CLOSED_LEAD_NOTIFICATION, formData);
    console.log("-------------------------------", res);

    if (res?.success != false) {
      setData(res?.data?.showLead);
      // setAllActions(res?.data?.adminAction);
    }
    console.log("---------------leads----------------", formData, res);
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [data?.data]);
  console.log("---------------props----------------", props?.location?.data);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const Table = ({
    item,
    index,
    setShowModalAction,
    setValue,
    setRefresh,
    refresh,
    setPostData,
    userInfo,
    allocated,
  }) => {
    // const [whatNext, setWhatNext] = React.useState(0);

    const classes = useStyles();

    // console.log(open, whatNext, index);

    const formatTime = () => {
      if (item.time_to_call !== null) {
        let str = item.time_to_call;
        let res = str.match(/(\d\d)/g);
        let hours = res[0];
        let min = res[1];

        let AmOrPm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        return hours + ":" + min + " " + AmOrPm;
        //  ;
      }
    };

    const LeadArray = [
      {
        name: "Clients",
        att: item.client_name,
      },
      {
        name: "Project",
        att: item.project.name,
      },
      {
        name: "Status",
        att:
          item.status != "" ? (
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
          ),
      },
      {
        name: "TOC",
        att: item.time_to_call != null ? item.time_to_call : "-------",
      },
      {
        name: "Deadline",
        att: item.dead_line != null ? item.dead_line : "-------",
      },

      {
        name: "Email",
        att: item.email != null ? item.email : "-------",
      },
    ];
    // let created_date=item.created_at;
    return (
      <>
        {LeadArray.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.att}</td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <Container fluid className="Laa">
      {/* <PreLoading startLoading={isLoading} /> */}
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1 ">
        <Col lg={12} sm={12} xs={12} xl={12}>
          <h3 style={{ color: "#818181" }}>Notification on lead</h3>
        </Col>
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
        <div className="table-responsive  col-md-6 col-sm-12" ref={ref}>
          {data?.length > 0 ? (
            data?.map((lead, index) => (
              <table
                id="leadsTable"
                className="table table-hover shadow p-3 mb-3 bg-white rounded mt-4"
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <span style={{ color: "#818181" }}>Name</span>
                    </th>
                    <th scope="col">
                      <span style={{ color: "#818181" }}>values</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Table
                    item={lead}
                    // item={lead}
                    // allocated={item.allocated_to}
                    index={index}
                    setShowModalAction={setShowModalAction}
                    setValue={setValue}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setPostData={setPostData}
                    userInfo={props.userInfo}
                  />
                </tbody>
              </table>
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
          {/* {data?.length > 0 && selectedID !== null ? (
              <>
                <ModalPlay item={data[selectedID]} />
              </>
            ) : null}
            <ModalAction data={postData} /> */}
        </div>
        <div className="col-md-6 col-sm-12">
          {allactions?.length > 0 ? (
            <AdminActionStepper data={allactions[0]} />
          ) : null}
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
export default connect(mapStateToProps)(EmployeeLeadsNotification);
