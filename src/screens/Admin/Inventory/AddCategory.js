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
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
export default function AddCategories() {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState(AddCategory);
  const [selectedID, setSelectedID] = useState(0);
  const [value, setValue] = useState();
  const handleFetchData = async () => {
    let res = await GET(ApiUrls.GET_ALL_PROJECT_CATEGORIES);
    console.log(res);
    if (res.success != false) {
      setData(res.data.ProjectCategory);
    }
  };
  React.useEffect(() => {
    // console.log(data, "KYA MASIBAT HAI");
    handleFetchData();
  }, []);

  const ModalAdd = ({ item }) => {
    const [category, setCategory] = useState("");

    // const SendRecordToServer = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);

    let user = {
      id: data.length + 1,
      name: category,
    };
    //    const formData = {
    //      first_name: f_name,
    //      last_name: l_name,
    //      email: email,
    //      gender: gender,
    //      phone: phone_no,
    //      password: password,
    //      user_type: user_type,
    //    };

    //    try {
    //      let resp = await fetch(server_url + "admin/employee/add", {
    //        method: "post",
    //        // mode: "no-cors",
    //        crossDomain: true,
    //        headers: {
    //          Accept: "application/json",
    //          "Content-Type": "application/json",
    //          Authorization: `Bearer ${token}`,
    //        },
    //        body: JSON.stringify({
    //          first_name: f_name,
    //          last_name: l_name,
    //          email: email,
    //          gender: gender == "male" ? "Male" : "Female",
    //          phone: phone_no,
    //          password: password,
    //          user_type: user_type == "Admin" ? "Admin" : "Employee",
    //        }),
    //      })
    //        .then((response) => response.json())
    //        .then((json) => {
    //          console.log("response from server  -------- ,", json);
    //          if (json.success != false) {
    //            setShowAlert(true);
    //            console.log("DATA SET SUCCESSFULLY");

    //            setUserRecord((state) => [formData].concat(state));
    //          }
    //          if (json.success == false) {
    //            setErrorAlert(true);
    //          }
    //        });
    //    } catch (e) {
    //      console.log(e);
    //    }

    //    setIsLoading(false);
    const addData = async (event) => {
      event.preventDefault();
      let postData = {
        name: category,
      };
      let res = await POST(ApiUrls.CREATE_PROJECT_CATEGORY, postData);
      console.log(res);
      let arr = data;

      setData([user].concat(arr));
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
          <Modal.Title style={{ color: "#818181" }}>Add Category</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>Category Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Category"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
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
    const [category, setCategory] = useState(item.name);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      console.log("SendRecordToServer", event);
      // add validations
      // push

      let user = {
        id: "1",
        name: category,
      };

      //   let arr = data;
      //   arr.push(user);
      //   setData(arr);
      //   setShowAdd(false);
    };
    const EditRecordToServer = async (event) => {
      event.preventDefault();

      console.log("EditRecordToServer", event);
      // add validations
      // push

      let user = {
        id: item.id,
        name: category,
      };
      let res = await POST(ApiUrls.POST_All_EDITED_CATEGORIES, user);
      console.log(res);
      console.log(user, item);
      let arr = data.map((val) => {
        if (val.id == user.id) val = user;
        return val;
      });

      // arr.push(user);
      setData(arr);
      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Category</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow  bg-white rounded ">
            <Modal.Body>
              {/*             
            <h6>ID</h6>
            <input className="form-control w-100"    placeholder="Enter id" /> */}
              <form>
                <div className="pb-3">
                  <h6>Category Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter category"
                    type="text"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
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
      let res = await GET(ApiUrls.GET_DELETED_PROJECT_CATEGORIES + item.id);
      console.log(res, "deleted");
      if (res.success != false) {
        // setData(res.data.ProjectCategory);
      }
      console.log("item is ", item);
      let { id } = item;
      console.log("ID is ", id);
      let arr = data;
      arr = arr.filter((user) => user.id != id.toString());
      console.log("arr length ", arr.length, arr, selectedID);
      setSelectedID((state) => {
        if (state == arr.length) return state - 1;
        return state;
      });
      setData(arr);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Delete Record</Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <Modal.Body>Do you really want to delete this Record!</Modal.Body>
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
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
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
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Categories</h3>
        </Col>
        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <InventoryMobileViewSidebar />
          </div>
        </Col>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                      .filter((item) => item.is_deleted == 0)
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
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}
