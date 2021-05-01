import React from "react";
import "./../Inventory/InventoryAdmin.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  Input,
  DialogActions,
  DialogContent,
  TextField,
  OutlinedInput,
} from "@material-ui/core";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory } from "react-router-dom";
function EmployeeInventory(props) {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
    dialog: {
      "&.MuiDialogActions-root": {
        // justifyContent: "center",
        marginRight: theme.spacing(1.5),
      },
    },
  }));

  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);
  const history = useHistory();
  const reqId=props?.location?.data?.data;
  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_EMPLOYEE_iNVENTORY_REQUEST_NOTIFICATION + "/"+reqId);
    if (res?.success != false) {
      setData(res?.request);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [reqId]);
  const Table = ({ item, index }) => {
    const NotificationArray = [
        { 
            name: "Name",
            att: item.user_name 
        },
        { 
            name: "Message",
            att: item.message
        },
    ];
    return (
     
           <>
        {NotificationArray.map((item) => {
          return (
            <tr>
              <td style={{ textAlign: "center" }}>{item.name}</td>
              <td style={{ textAlign: "justify" }}>{item.att}</td>
            </tr>
          );
        })}
      </>
       
 
    );
  };
  return (
    <Container fluid className="Laa">
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
     
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
      <Row>
      
        
<Col lg={10} sm={10} xs={10} xl={11}>
        <h3 style={{ color: "#818181" }}>Inventory Notification </h3>
</Col>
        </Row>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive col-md-6 col-sm-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                   
                    <th scope="col" style={{ color: "#818181" }}>
                      Name
                    </th>
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Last_Name
                    </th> */}
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Type of Unit
                    </th> */}
                    <th scope="col" style={{ color: "#818181" }}>
                      Values
                    </th>

                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Viewable To
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.slice(0,1).map((item, index) => (
                    <Table item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
      
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeInventory);
