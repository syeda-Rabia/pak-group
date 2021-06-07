import React, { useState } from "react";
import "./../EmployeeInventory/EmployeeInventory.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { Link, Route } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Dialog,
  DialogTitle,
  Input,
  DialogActions,
  DialogContent,
  TextField,
  OutlinedInput,
} from "@material-ui/core";
import {
  faTrash,
  faPencilAlt,
  faEye,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import SuccessNotification from "../../../components/SuccessNotification";
import { isArray } from "lodash";




function EmployeeInventoryNotification(props) {
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
  const [resMessage, setResMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  var inventory=localStorage.getItem("data");
  let data1=JSON.parse(inventory);
  console.log("-local inventory---",data1)
  const inventoryId=props?.location?.data?.data;
  console.log("--------------------------->props inventory--",inventoryId)

  const handleFetchData = async () => {
    setIsLoading(true);
    if(isArray(inventoryId)){
      console.log("--------------------------->isarray--")
      // var urlArray=inventoryId?.map((id,index)=>`ids[${index}]=${id}`).join("&")

    }
    let formData={
      ids:data1.data,
          }

//     let formData={
// ids:inventoryId,
//     }
    let res = await POST(
      ApiUrls.GET_EMPLOYEE_NEW_INVENTORIES_NOTIFICATION,formData
    );
    console.log("----------------response-------------",res,formData);
    if (res.success != false) {
      setData(res?.inventories);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, [inventoryId]);


 
 
  const Table = ({ item, index }) => {
    return (
      <tr>
        <td >{index + 1}</td>
        <td >{item?.serial_no}</td>
        <td>{item?.project?.name}</td>
        <td>{item?.inventory_category}</td>
        <td>{item?.inventory_name}</td>
        <td>{item?.block_name}</td>
        <td>{item?.property_status}</td>
    <td>
    {/* <Link to={{ pathname: "/employee/inventory-details", query: { item } }}>
      
        <button
              data-tip
              data-for="new"
              type="button"
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   setShowUnit(true);
              //   setSelectedID(index);
              // }}
            >
              
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
             
            </button>
            </Link>
            
            <ReactTooltip id="new" place="top" effect="solid">
            view inventory Details
            </ReactTooltip> */}
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      {/* {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null} */}

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={resMessage}
        closeSuccess={setShowSuccessAlert}
      />
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>
            Notification on Inventory
        </h3>
        
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
           
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                  <th scope="col">
                    <span id="spn" style={{ color: "#818181" }}>
                    ID
                      </span>
                    </th>
                    <th scope="col" className="text-nowrap">
                    <span id="spn" style={{ color: "#818181" }}>
                      Sr No
                      </span>
                    </th>
                    <th scope="col">
                    <span id="spn" style={{ color: "#818181" }}>
                    Project
                      </span>
                    </th>
                    <th scope="col">
                    <span id="spn" style={{ color: "#818181" }}>
                    Category
                      </span>
                    </th>
                    <th scope="col" className="text-nowrap">
                    <span id="spn" style={{ color: "#818181" }}>
                    Inventory Name
                      </span>
                    </th>
                    <th scope="col">
                    <span id="spn" style={{ color: "#818181" }}>
                    Block
                      </span>
                    </th>
                    <th scope="col">
                    <span id="spn" style={{ color: "#818181" }}>
                    Status
                      </span>
                    </th>
                    
                    
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Action
                    </th> */}
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Viewable To
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
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

// // export default Login;
export default connect(mapStateToProps)(EmployeeInventoryNotification);
