import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  LinearProgress,
  Grow,
} from "@material-ui/core";
import { Link, useHistory, Redirect, Route } from "react-router-dom";

export default function AddInventory() {
  const [form, setForm] = React.useState(true); //
  const [dummy, setDummy] = React.useState([]);
  const [projectDetails, setProjectDetails] = React.useState({});
  const [nameParent, setNameParent] = React.useState("");
  const [unitsParent, setUnitsParent] = React.useState(1);
  const [categoryParent, setCategoryParent] = React.useState("Both");
  const [showAlert, setShowAlert] = React.useState(false);
  const [redirectPage, setRedirectPage] = React.useState(false);

  const [showProgress, setShowProgress] = React.useState(false);

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
          category: category === "Both" ? "" : category,
          block_name: "",
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
        <div
          style={{
            // backgroundColor: 'red',
            margin: "auto",
            width: "100%",
            // border: '3px solid green',
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
            <h3 style={{ color: "#818181" }}>Add Project</h3>
          </div>
          <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
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
                <Form.Control
                  value={category}
                  as="select"
                  className="w-100"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={"Both"}>Sale & Rent</option>
                  <option value={"Sale"}>Sale</option>
                  <option value={"Rent"}>Rent</option>
                </Form.Control>
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
        </div>
      </React.Fragment>
    );
  };
  const InventoryDetails = () => {
    const [InventoryData, setInventoryData] = React.useState(dummy);

    const viewData = (data, id, index) => {
      // console.log('index', id);
      // console.log('data', data);
      let key = Object.keys(data)[0];
      // let inData = InventoryData.map((item) => {
      //   if (item.id == id) {
      //     item[key] = data[key];
      //   }
      //   return item;
      // });
      // console.log(inData);
      // let inData = InventoryData;
      // inData[index][key] = data[key];
      // console.log(inData[index]);
      setInventoryData((state) => {
        const temp = [...state];
        const objectChange = temp[index];
        objectChange[key] = data[key];
        temp[index] = { ...objectChange };
        // state[index] = { ...temp };
        console.log(state);
        return temp;
      });
      // setInventoryData(inData);
    };
    const handlePostRequest = async () => {
      console.log("state");
      setShowProgress(true);

      setProjectDetails((state) => {
        state.inventory = InventoryData;
        return state;
      });
      var postData = projectDetails;
      postData.inventory = InventoryData;
      // setProjectDetails((state) => {
      //   console.log("Before Updation", state);
      //   return {
      //     //return the new data layer
      //     ...state,
      //     inventory: [InventoryData],
      //   };
      //   console.log("After Updation", state);
      // });
      console.log(projectDetails, "STATE UPDATE");
      console.log(postData, "POST DATA");
      console.log("LEVEL", InventoryData);

      await fetch(
        // "https://pak-group.herokuapp.com/admin/createProject",
        "https://webhook.site/3abd16e7-5188-4930-9571-c2997d67d6aa",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectDetails),
        }
      )
        .then((response) => {
          console.log("response", response);
          console.log("response Data", response.data);

          if (response.status === 200) {
            // alert("skjdhfkjd");
            setTimeout(() => {
              setShowProgress(false);
              setShowAlert(true);
            }, 2000);
          }
        })
        // .then((response) => response.json())
        // .then((json) => {
        //   console.log(json);
        // })

        .catch((error) => {
          console.error(error);
        });
    };
    const history = useHistory();

    React.useEffect(() => {
      if (InventoryData.length === 0) setForm((state) => !state);
    }, [InventoryData]);
    return (
      <React.Fragment>
        {/* <LinearProgress /> */}
        {showProgress == true ? (
          <Snackbar open={showProgress}>
            <CircularProgress disableShrink />
          </Snackbar>
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
        {/* <Route
          render={() =>
            redirectPage ? (
              <Redirect
                to={{
                  pathname: "/admin/inventory",
                }}
              />
            ) : null
          }
        /> */}

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
                      style={{ height: "calc(1.5em + 1.6rem + 2px)" }}
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
                      style={{ height: "calc(1.5em + 1.6rem + 2px)" }}
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
                    <Form.Group controlId="projectCategory">
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
                        className="w-100"
                        style={{ height: "calc(1.5em + 0.75rem + -4px)" }}
                      >
                        <InputLabel>Select Category</InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
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
                          <MenuItem value={"Sale"}>Sale</MenuItem>
                          <MenuItem value={"Rent"}>Rent</MenuItem>
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
                    <FormControl
                      className="w-100"
                      style={{ height: "calc(1.5em + 0.75rem + -4px)" }}
                    >
                      <InputLabel>Select Status</InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.status}
                        onChange={(e) => {
                          // setInventoryData()
                          viewData({ status: e.target.value }, item.id, index);
                        }}
                      >
                        {/* <MenuItem value={"null"}>Select Category</MenuItem> */}
                        <MenuItem value={"Hold"}>Hold</MenuItem>
                        <MenuItem value={"Sale"}>Sale</MenuItem>
                        <MenuItem value={"Rent"}>Rent</MenuItem>
                      </Select>
                    </FormControl>
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
      </React.Fragment>
    );
  };
  if (form) {
    return <Inventory />;
  } else {
    return <InventoryDetails />;
  }
}
