import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";

import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  LinearProgress,
  Grow,
  FormGroup,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory, Redirect, Route } from "react-router-dom";

export default function AddInventory() {
  const [allProjectCategories, setAllProjectCategories] = React.useState([]);

  const [form, setForm] = React.useState(true); //
  const [dummy, setDummy] = React.useState([]);
  const [projectDetails, setProjectDetails] = React.useState({});
  const [nameParent, setNameParent] = React.useState("");
  const [unitsParent, setUnitsParent] = React.useState(1);
  const [categoryParent, setCategoryParent] = React.useState("Both");
  const [showAlert, setShowAlert] = React.useState(false);
  const [redirectPage, setRedirectPage] = React.useState(false);

  const [showProgress, setShowProgress] = React.useState(false);

  useEffect(() => {
    getAllProjectCategories();
  }, []);

  const getAllProjectCategories = async () => {
    console.log("gett all cate-----------");
    let resp = await GET(ApiUrls.GET_ALL_PROJECT_CATEGORIES);

    if (resp.data != null) {
      setAllProjectCategories(resp.data.ProjectCategory);
    }
    console.log(JSON.stringify(resp.data.ProjectCategory));
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const submit = (e) => {
    e.preventDefault();
    console.log("Submit");
  };
  const handleClose = () => {
    setShowAlert(false);
    setRedirectPage(true);
  };

  // console.log(projectDetails);
  const Inventory = () => {
    const [name, setName] = React.useState(nameParent);
    const [units, setUnits] = React.useState(unitsParent);
    const [category, setCategory] = React.useState(categoryParent);

    const handleForm = () => {
      setForm(false);
      setNameParent(name);
      setUnitsParent(units);
      setCategoryParent(category);
      let arr = [];
      for (let i = 0; i < units; i++) {
        arr.push({
          id: i + 1,
          name: "",
          block_name: "",

          // category: category === "Both" ? "" : category,
          category: category,

          status: "",
        });
      }
      setDummy(arr); //[]
      setProjectDetails({
        name: name,
        category: category,
        units: units,
        status: "open",
        inventory: [],
      });
    };

    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
              <h3 style={{ color: "#818181" }}>Add Project</h3>
            </div>
          </Row>
          <Row>
            <div class="col-lg-12 shadow p-3  bg-white rounded ">
              <Form onSubmit={submit}>
                <Form.Group controlId="inventoryName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => {
                      // console.log(name);
                      setName(e.target.value);
                      console.log(name);
                    }}
                    required={true}
                    className="w-100"
                    type="text"
                  />
                </Form.Group>

                <Form.Group controlId="projectCategory">
                  <Form.Label>Project Category</Form.Label>
                  {/* <Form.Control
                    value={category}
                    as="select"
                    className="w-100"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value={"Both"}>Sale & Rent1</option>
                    <option value={"Sale"}>Sale</option>
                    <option value={"Rent"}>Rent</option>
                  </Form.Control> */}

                  <select
                    value={category}
                    onChange={(e) => {
                      console.log(
                        "select category ID is -----",
                        e.target.value
                      );
                      setCategory(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    {allProjectCategories.length > 0
                      ? allProjectCategories.map((proCat, index) => (
                          <option key={index} value={proCat.id}>
                            {proCat.name}
                          </option>
                        ))
                      : null}
                  </select>
                </Form.Group>

                <Form.Group controlId="units">
                  <Form.Label>Units</Form.Label>
                  <Form.Control
                    value={units}
                    onChange={(e) => {
                      setUnits(e.target.value);
                    }}
                    className="w-100"
                    type="number"
                    placeholder="Number of Properties"
                  />
                </Form.Group>
                {name != "" ? (
                  <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    disabled={!name}
                    onClick={handleForm}
                  >
                    Add Inventory
                  </Button>
                ) : null}
              </Form>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  };
  const InventoryDetails = () => {
    const [InventoryData, setInventoryData] = React.useState(dummy);

    const viewData = (data, id, index) => {
      let key = Object.keys(data)[0];

      setInventoryData((state) => {
        const temp = [...state];
        const objectChange = temp[index];
        objectChange[key] = data[key];
        temp[index] = { ...objectChange };

        console.log(state);
        return temp;
      });
    };

    const handlePostRequest = async () => {
      setShowProgress(true);
      setProjectDetails((state) => {
        state.inventory = InventoryData;
        return state;
      });
      var postData = projectDetails;
      postData.inventory = InventoryData;

      // console.log(projectDetails, "STATE UPDATE");
      // console.log(postData, "POST DATA");
      // console.log("LEVEL", InventoryData);

      // console.log("------------------------------");
      // console.log(JSON.stringify(projectDetails));

      let inventoriesArray = [];

      if (projectDetails.inventory.length > 0) {
        for (let index = 0; index < projectDetails.inventory.length; index++) {
          let obj = {
            inventory_name: projectDetails.inventory[index].name,
            block_name: projectDetails.inventory[index].block_name,
            inventory_category: projectDetails.inventory[index].category,
            property_status: projectDetails.inventory[index].status,
          };
          inventoriesArray.push(obj);
        }
      }
      let formData = {
        name: projectDetails.name,
        unit: projectDetails.units,
        category_id: projectDetails.category,
        inventories: inventoriesArray,
      };
      console.log("form to submit on server is --------------");
      console.log(JSON.stringify(formData));
      console.log("-------------------------------------------------");
      let resp = await POST(ApiUrls.CREATE_PROJECT, formData);

      setShowProgress(false);

      // await fetch("https://webhook.site/ed44da3f-bdcd-4b1a-9122-a85ebebaf9d1", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(projectDetails),
      // })
      //   .then((response) => {
      //     console.log("response", response);
      //     console.log("response Data", response.data);

      //     if (response.status === 200) {
      //       // alert("skjdhfkjd");
      //       setTimeout(() => {
      //         setShowAlert(true);
      //       }, 2000);
      //     }
      //   })

      //   .catch((error) => {
      //     console.error(error);
      //   });
      // setShowProgress(false);
    };

    const history = useHistory();
    const classes = useStyles();

    React.useEffect(() => {
      if (InventoryData.length === 0) setForm((state) => !state);
    }, [InventoryData]);
    return (
      <div className="col-lg-12 shadow p-3  bg-white rounded mt-4">
        {/* <LinearProgress /> */}
        {showProgress == true ? (
          <Backdrop className={classes.backdrop} open={showProgress}>
            <CircularProgress disableShrink />
          </Backdrop>
        ) : null}

        {showAlert == true ? (
          <Grow in={showAlert}>
            <Snackbar
              open={showAlert}
              autoHideDuration={1000}
              onClose={handleClose}
            >
              <Alert variant="filled" severity="success">
                <AlertTitle>Success</AlertTitle>
                <span className="mr-5" style={{ textAlign: "center" }}>
                  Project Added
                </span>
              </Alert>
            </Snackbar>
          </Grow>
        ) : null}
        <br />
        <Route
          render={() =>
            redirectPage ? (
              <Redirect
                to={{
                  pathname: "/admin/inventory",
                }}
              />
            ) : null
          }
        />

        {/* <Button onClick={() => setForm((state) => !state)}>Go Back</Button> */}
        <IconButton
          onClick={() => setForm((state) => !state)}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <Container>
          <Form>
            {InventoryData.map((item, index) => {
              return (
                <Form.Row style={{ marginBottom: "8px" }}>
                  <Col>
                    <Form.Control
                      className="w-100"
                      placeholder="Inventory name"
                      value={item.name}
                      style={{ height: "calc(1.5em + 1.99rem + 2px)" }}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ name: e.target.value }, item.id, index);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Block name"
                      className="w-100"
                      style={{ height: "calc(1.5em + 1.99rem + 2px)" }}
                      value={item.block_name}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData(
                          { block_name: e.target.value },
                          item.id,
                          index
                        );
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Group
                      // style={{ backgroundColor: "#F2F4F5" }}
                      controlId="projectCategory"
                    >
                      {/* <Form.Control
                        style={{ height: "calc(1.5em + 0.75rem + -4px)" }}
                        as="select"
                        className="w-100"
                        placeholder="Project Category"
                        value={item.category}
                        onChange={(e) => {
                          // setInventoryData()
                          viewData({ category: e.target.value }, item.id,index);
                        }}
                      >
                        <option value={"null"}>Select Category</option>
                        <option value={"Sale"}>Sale</option>
                        <option value={"Rent"}>Rent</option>
                      </Form.Control> */}
                      <FormControl
                        variant="filled"
                        className="w-100 bg-blue"
                        style={{ height: "calc(1.5em + 0.75rem + -4px)" }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Category
                        </InputLabel>

                        <Select
                          // style={{ backgroundColor: "#F2F4F5" }}
                          // labelId="demo-simple-select-label"
                          // id="demo-simple-select"
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={item.category}
                          onChange={(e) => {
                            // setInventoryData()
                            viewData(
                              { category: e.target.value },
                              item.id,
                              index
                            );
                          }}
                        >
                          {/* <MenuItem value={"null"}>Select Category</MenuItem> */}
                          <MenuItem value={"Sales"}>Sales</MenuItem>
                          <MenuItem value={"Rent"}>Rent</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </Col>

                  <Col>
                    {/* <Form.Control
                      style={{
                        height: "calc(1.5em + 0.75rem + -4px)",
                      }}
                      as="select"
                      className="w-100"
                      placeholder="Status"
                      value={item.status}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ status: e.target.value }, item.id,index);
                      }}
                    >
                      <option value={"null"}>Select Status</option>
                      <option value={"Hold"}>Hold</option>
                      <option value={"Open"}>Open</option>
                      <option value={"Sold"}>Sold</option>
                    </Form.Control> */}
                    <FormGroup
                    // style={{ backgroundColor: "#F2F4F5" }}
                    >
                      <FormControl
                        variant="filled"
                        className="w-100"
                        style={{
                          height: "calc(1.5em + 0.75rem + -4px)",
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Status
                        </InputLabel>

                        <Select
                          // style={{
                          //   backgroundColor: "#F2F4F5",

                          // }}
                          // labelId="demo-simple-select-label"
                          // id="demo-simple-select"
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={item.status}
                          onChange={(e) => {
                            // setInventoryData()
                            viewData(
                              { status: e.target.value },
                              item.id,
                              index
                            );
                          }}
                        >
                          {/* <MenuItem value={"null"}>Select Category</MenuItem> */}
                          <MenuItem value={"Open"}>Open</MenuItem>
                          <MenuItem value={"Sold"}>Sold</MenuItem>
                          {/* <MenuItem value={"Rent"}>Rent</MenuItem> */}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col>
                    <IconButton aria-label="delete" color="primary">
                      <Tooltip title="Delete" placement="right" arrow>
                        <RemoveOutlinedIcon
                          onClick={() => {
                            console.log("clicked");
                            const tempData = InventoryData.filter(
                              (del) => del.id !== item.id
                            );
                            setInventoryData(tempData);
                          }}
                        />
                      </Tooltip>
                    </IconButton>
                  </Col>
                </Form.Row>
              );
            })}
            <Link>
              <Button
                onClick={() => {
                  handlePostRequest();
                  // setProjectDetails((state) => {
                  //   state.inventory = InventoryData;
                  //   return state;
                  // });
                  // setTimeout(() => {}, 3000);
                }}
              >
                Save
              </Button>
            </Link>
          </Form>
        </Container>
      </div>
    );
  };
  if (form) {
    return <Inventory />;
  } else {
    return <InventoryDetails />;
  }
}
