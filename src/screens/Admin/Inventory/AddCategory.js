import "./InventoryAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlineIcon } from "@material-ui/icons/DeleteOutline";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { AddCategory } from "./../../../assests/constants/addcategory";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { server_url, token } from "../../../utils/Config";
import Pagination from "../../../components/Pagination/Pagination";
export default function AddCategory() {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState(AddCategory);
  const [selectedID, setSelectedID] = useState(0);
  const [value, setValue] = useState();

  const Table = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.category}</td>

        <td>
          <div className="d-flex d-inline">
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
    <Container
      fluid
      className="Laa"
      style={{
        margin: "auto",
        width: "100%",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      {/* Success Alert */}
      {showAlert == true ? (
        <Slide in={showAlert} direction="up">
          <Snackbar
            open={showAlert}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="success">
              <AlertTitle>Success</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Record Submitted
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}

      {/* Error Alert */}
      {errorAlert == true ? (
        <Slide in={errorAlert} direction="up">
          <Snackbar
            open={errorAlert}
            autoHideDuration={3000}
            onClose={handleErrorClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              <span className="mr-5" style={{ textAlign: "center" }}>
                Record not Submitted
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}

      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Categories</h3>
      </div>
      <div class="col-lg-12 shadow p-3  bg-white rounded ">
        <button
          data-tip
          data-for="AddTip"
          type="button"
          className="btn btn-primary my-4"
          style={{
            backgroundColor: "#2258BF",
          }}
          onClick={() => {
            setShowAdd(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare} /> Add Category
        </button>
        <ReactTooltip id="AddTip" place="top" effect="solid">
          Add new category
        </ReactTooltip>
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
                    <th scope="col" style={{ color: "#818181" }}>
                      ID
                    </th>

                    <th scope="col" style={{ color: "#818181" }}>
                      Category_Name
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userRecord != ""
                      ? userRecord.map((user, index) => (
                          <>
                            <Table item={user} index={index} />
                          </>
                        ))
                      : // <h1>No Data</h1>
                        null

                    // <Skeleton variant="rect" width={"100%"} height={"100%"} />
                  }
                  {/* {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
                </tbody>
                {data.length > 0 ? (
                  <>
                    <ModalDelete item={data[selectedID]} />
                    <ModalEdit item={data[selectedID]} />
                  </>
                ) : null}
              </table>
              <ModalAdd />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
