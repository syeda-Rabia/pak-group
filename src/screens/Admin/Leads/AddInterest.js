import "./LeadsAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { AddCategory } from "./../../../assests/constants/addcategory";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";

import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import PreLoading from "../../../components/PreLoading";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function AddInterest() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_INTEREST);
    if (res.success != false) {
      setData(res.data.Interest);
    }
    setIsLoading(false);
  };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  useEffect(() => {
    handleFetchData();
  }, [refresh]);

  const ModalAdd = ({ item }) => {
    const [interest, SetInterest] = useState("");

    const addData = async (event) => {
      event.preventDefault();
      let postData = {
        interest: interest,
      };
      let res = await POST(ApiUrls.ADD_INTEREST, postData);
      console.log("post request",res);
      setRefresh(!refresh);
      // let arr = data;

      // setData([user].concat(arr));
      setShowAdd(false);
    };
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
          <Modal.Title style={{ color: "#818181" }}>Add Interest</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>Interest</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Category"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={interest}
                  onChange={(e) => {
                    SetInterest(e.target.value);
                  }}
                />
              </div>
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
                onClick={addData}
              >
                Add
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalEdit = ({ item }) => {
    //  ;
    const [interest, SetInterest] = useState(item.interest);

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let user = {
        id: item.id,
        interest: interest,
      };
      let res = await POST(ApiUrls.EDIT_INTEREST, user);
      if (res.error === false) {
        setMessage("Interest Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Interest Not Edited");
        setShowErrorAlert(true);
      }
      console.log(res);
      setRefresh(!refresh);

      //  ;
      // let arr = data.map((val) => {
      //   if (val.id == user.id) val = user;
      //   return val;
      // });

      // arr.push(user);
      // setData(arr);
      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Edit Interest</Modal.Title>
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
                  <h6>Interest </h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter interest"
                    type="text"
                    value={interest}
                    onChange={(e) => {
                      SetInterest(e.target.value);
                    }}
                  />
                </div>
              </form>
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
                Edit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
      // console.log(item);
      let res = await GET(ApiUrls.DELETE_INTEREST + item.id);
      if (res.error === false) {
        setMessage("Interest Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Interest Not Deleted");
        setShowErrorAlert(true);
      }
      console.log(res);
      setRefresh(!refresh);

      // if (res.success != false) {
      //   // setData(res.data.ProjectCategory);
      // }
      //  ;
      // let { id } = item;
      //  ;
      // let arr = data;
      // arr = arr.filter((user) => user.id != id.toString());
      //  ;
      // setSelectedID((state) => {
      //   if (state == arr.length) return state - 1;
      //   return state;
      // });
      // setData(arr);
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
          <Modal.Body>Do you really want to delete this Interest</Modal.Body>
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
                setShowDelete(false);
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
        <td>{item.interest}</td>
        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
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
    <Container fluid className="Laa">
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
      <Row>
        <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4 ml-4">
          <h3 style={{ color: "#818181" }}>Interest </h3>
        </div>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ml-4">
          <button
            data-tip
            data-for="AddTip"
            type="button"
            className="btn btn-primary "
            style={{
              backgroundColor: "#2258BF",
            }}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} /> Add interest
          </button>
          <ReactTooltip id="AddTip" place="top" effect="solid">
            Add new interest
          </ReactTooltip>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "#818181" }}>
                    ID
                  </th>

                  <th scope="col" style={{ color: "#818181" }}>
                    Interest
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  // userRecord != ""
                  //   ? userRecord.map((user, index) => (
                  //       <>
                  //         <Table item={user} index={index} />
                  //       </>
                  //     ))
                  //   : // <h1>No Data</h1>
                  //     null
                  // <Skeleton variant="rect" width={"100%"} height={"100%"} />
                }
                {data
                  // .filter((item) => item.is_deleted == 0)
                  .map((item, index) => {
                    return <Table item={item} index={index} />;
                  })}
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
        </div>
      </Row>
    </Container>
  );
}
