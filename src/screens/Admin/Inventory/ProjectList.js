import "../AddUser/AddEmployee.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import img2 from "./../../../assests/tiwtr-2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTrash,
  faPencilAlt,
  faEye,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ProjectListData } from "./../../../assests/constants/ProjectListDemoData";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import AddIcon from "@material-ui/icons/Add";
import { Link, Route } from "react-router-dom";
import InventoryAdmin from "./InventoryAdmin";

import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";

export default function ProjectList() {
  const [allProjects, setAllProjects] = useState([]);

  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [data, setData] = useState(ProjectListData);
  const [selectedID, setSelectedID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

    if (resp.data != null) {
      setAllProjects(resp.data.projects.data);
    }
    setIsLoading(false);
  };

  const ModalEdit = ({ item }) => {
    const [ProjectName, setProjectName] = useState(item.name);

    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let projects = {
        id: item.id,
        name: ProjectName,
      };
      let res = await POST(ApiUrls.EDIT_PROJECT, projects); // Api to be implemented
      // if (res.success != false) {
      //   let arr = allProjects.map((val) => {
      //     if (val.id == projects.id) val = projects;
      //     return val;
      //   });

      //   // arr.push(projects);
      //   setData(arr);
        // setAllProjects(arr);
      
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
          <Modal.Title style={{ color: "#818181" }}>
            Edit Project Name
          </Modal.Title>
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
                  <h6>Project Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter project name"
                    type="text"
                    value={ProjectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
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
      let res = await GET(ApiUrls.DELETE_PROJECT + item.id);
      let { id } = item;
      let arr = allProjects;
      arr = arr.filter((user, index) => user.id != id.toString());
      setSelectedID((state) => {
        if (state == arr.length) return state - 1;
        return state;
      });
      // setData(arr);
      setAllProjects(arr);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete this Project and It's Inventories!
        </Modal.Body>
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
      </Modal>
    );
  };

  const TableEmployee = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{item.unit}</td>
        {/* <td>{item.Units}</td> */}

        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
            <button
              data-tip
              data-for="ViewTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   // setShowView(true);
              //   setSelectedID(index);
              // }}
            >
              <Link to={{ pathname: "/admin/projects", query: { item } }}>
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
              </Link>
            </button>
            <ReactTooltip id="ViewTip" place="top" effect="solid">
              View or Edit Details
            </ReactTooltip>

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
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h2
            style={{
              color: "#818181",
              textAlign: "left",
            }}
          >
            Project List
          </h2>
        </Col>
        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <InventoryMobileViewSidebar />
          </div>
        </Col>
      </Row>
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded mt-4">
          <Link to="/admin/add-project">
            <button
              type="button"
              className="btn btn-primary my-4"
              style={{
                backgroundColor: "#2258BF",
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} /> Add Project
            </button>
          </Link>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "#818181" }}>
                    ID
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Project Name
                  </th>

                  <th scope="col" style={{ color: "#818181" }}>
                    Project Category
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Units
                  </th>

                  <th scope="col" style={{ color: "#818181" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProjects.length > 0
                  ? allProjects.map((item, index) => (
                      <TableEmployee item={item} index={index} />
                    ))
                  : null}
                {/* {data.map((item, index) => {
                  return <TableEmployee item={item} index={index} />;
                })} */}
              </tbody>
              {allProjects.length > 0 ? (
                <>
                  <ModalDelete item={allProjects[selectedID]} />

                  <ModalEdit item={allProjects[selectedID]} />
                </>
              ) : null}
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
