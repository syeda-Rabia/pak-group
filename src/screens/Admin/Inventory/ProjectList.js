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
  const [allProjects, setAAllProjects] = useState([]);

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
      setAAllProjects(resp.data.projects.data);
    }
    setIsLoading(false);
  };

  const ModalEdit = ({ item }) => {
    const [ProjectName, setProjectName] = useState(item.Name);
    const [Units, setUnits] = useState(item.Units);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      console.log("SendRecordToServer", event);
      // add validations
      // push

      let projects = {
        id: "1",
        Name: ProjectName,
        Units: Units,
      };

      let arr = data;
      arr.push(projects);
      setData(arr);
      setShowAdd(false);
    };
    const EditRecordToServer = (event) => {
      event.preventDefault();

      console.log("EditRecordToServer", event);
      // add validations
      // push

      let projects = {
        id: item.id,
        Name: ProjectName,
        Units: Units,
      };

      let arr = data.map((val) => {
        if (val.id == projects.id) val = projects;
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
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <Modal.Body>
            <h6>Enter Project Name</h6>
            <input
              className="form-control input-width"
              placeholder="Enter First Name"
              type="text"
              value={ProjectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258bf" }}
              onClick={() => {
                setShowEdit(false);
              }}
            >
              Close
            </Button>
            <Button style={{ backgroundColor: "#2258bf" }} onClick={() => {}}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = (item) => {
      console.log("item is ", item);

      let { id } = item;
      console.log("ID is ", id);

      let arr = data;

      arr = arr.filter((projects) => projects.id != id.toString());

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
        <td>{item.id}</td>
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
            {/* 
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
            </ReactTooltip> */}
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
              {data.length > 0 ? (
                <>
                  <ModalDelete item={data[selectedID]} />

                  {/* <ModalEdit item={data[selectedID]} /> */}
                </>
              ) : null}
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
