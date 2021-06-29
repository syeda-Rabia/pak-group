import "./../Leads/LeadsAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LoanData } from "./../../../assests/constants/loan";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";
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
export default function LoanDetails() {
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

  /*  Pagination data  */

  const [pageSize, setPageSize] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(0);

  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;

  // const [page, setPage] = React.useState(2);
  const handlePageChange = async (page) => {
    setIsLoading(true);
    let resp = await GET(ApiUrls.GET_LOAN_LIST + page);

    if (resp?.data != null) {
      setCurrentPage(resp?.data?.current_page);
      setData(resp?.data?.data);
    }
    setIsLoading(false);
  };

  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };

  /*  Pagination data  */
  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_LOAN_LIST);
    // console.log("ress0", res);
    if (res?.success != false) {
      setData(res?.data?.data);
      setPageSize(res?.data?.per_page);
      setTotalRecord(res?.data?.total);
      setCurrentPage(res?.data?.current_page);
    }
    setIsLoading(false);
  };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    const [name, SetName] = useState("");
    const [amount, SetAmount] = useState(0);
    const [returned, SetReturned] = useState(0);

    const addData = async (event) => {
      event.preventDefault();
      let postData = {
        name: name,
        amount_of_loan: amount,
        returend_amount: returned,
      };
      // let arr = data;
      // arr.push(postData);
      // setData(arr);
      // setShowAdd(false);
      //api
      let res = await POST(ApiUrls.POST_ADD_LOAN_DETAILS, postData);
      // console.log("post request", res);
      if (res.error === false) {
        setMessage(" Loan Added Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      setRefresh(!refresh);

      setShowAdd(false);
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
            Add Loan Details
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
                <h6>Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter name of employee"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Amount of Loan</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter amount of loan"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    SetAmount(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Returned Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Returned amount"
                  type="number"
                  value={returned}
                  onChange={(e) => {
                    SetReturned(e.target.value);
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
    const [name, SetName] = useState(item?.name);
    const [amount, SetAmount] = useState(item?.amount_of_loan);
    const [returned, SetReturned] = useState(item.returend_amount);
    const [remaining, SetRemaining] = useState(item.remaining);

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let postData = {
        id: item.id,
        name: name,
        amount_of_loan: amount,
        returend_amount: returned,
      };
      let res = await POST(ApiUrls.POST_EDIT_LOAN, postData);
      if (res.error === false) {
        setMessage("Loan Detail Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Loan Detail Not Edited");
        setShowErrorAlert(true);
      }
      // console.log(res);
      setRefresh(!refresh);

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
          <Modal.Title style={{ color: "#818181" }}>
            Edit Loan Detail
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              <div className="pb-3">
                <h6>Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter name of employee"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Amount of Loan</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter amount of loan"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    SetAmount(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Returned Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Returned amount"
                  type="number"
                  value={returned}
                  onChange={(e) => {
                    SetReturned(e.target.value);
                  }}
                />
              </div>
              {/* <div className="pb-3">
                <h6>Remaining Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Remaining Amount"
                  type="text"
                 
                  value={remaining}
                  onChange={(e) => {
                    SetRemaining(e.target.value);
                  }}
                />
              </div> */}
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
        let res = await GET(ApiUrls.DELETE_LOAN + item.id);
        setShowDelete(false);

        if (res.error === false) {
          setMessage("Loan Deleted Successfully");
          setShowSuccessAlert(true);
          // setRefresh(!refresh);
          setSelectedID(0);
        } else {
          setMessage("Loan Not Deleted");
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
          <Modal.Body>Do you really want to delete this Loan Record</Modal.Body>
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
        <td>{item.name}</td>
        <td>{item.amount_of_loan}</td>
        <td>{item.returend_amount}</td>
        <td>{item.remaining_ammount}</td>
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

      <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
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
          <h3 style={{ color: "#818181" }}>Loan Details</h3>
        </Col>
      </Row>

      <Row className=" shadow p-3  bg-white rounded ml-2 mr-1">
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
          <FontAwesomeIcon icon={faPlusSquare} /> Add Loan
        </button>
        <ReactTooltip id="AddTip" place="top" effect="solid">
          Add new Loan
        </ReactTooltip>
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
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Id
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Name
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Loan Amount
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Returned Amount
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Remaining Amount
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    Actions
                  </span>
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
              {data?.map((item, index) => {
                return <Table item={item} index={index} />;
              })}
            </tbody>
            {data?.length > 0 ? (
              <>
                <ModalDelete item={data[selectedID]} />
                <ModalEdit item={data[selectedID]} />
              </>
            ) : null}
          </table>
          <ModalAdd />
        </div>
      </Row>
      <Row>
        <Col>
          {pageCount > 1 ? (
            <p className="page-info">
              Showing {currentPage} from {pageCount}
            </p>
          ) : null}
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
      </Row>
    </Container>
  );
}
