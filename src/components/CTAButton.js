import React, { useState } from "react";
import "./CTAButton.css";
import { Col, Dropdown, DropdownButton, Modal, Row } from "react-bootstrap";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "./../utils/KeyboardTimePickerExample";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { GET } from "./../utils/Functions";
import ApiUrls from "./../utils/ApiUrls";

export default function CTAButton() {
  const [value, setValue] = useState("");
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  var today = new Date();
  const useStyles = makeStyles((theme) => ({
    dialogColor: {
      "& .MuiTypography-root": {
        color: "#818181",
      },
    },
  }));

  const classes = useStyles();
  const EmployeeList = () => {
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          maxWidth="xs"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            classes={{ root: classes.dialogColor }}
            id="scroll-dialog-title"
          >
            Shift And Warn
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {loading ? (
                [1, 1, 1, 1, 1, 1, 1, 1].map(() => (
                  <div className="d-flex flex-row m-2 p-2">
                    <Skeleton className="mr-3" variant="text" width="50%" />
                    <Skeleton variant="text" width="100%" />
                  </div>
                ))
              ) : (
                <List>
                  {employees.map((e) => (
                    <ListItem
                      button
                      onClick={(e) => {
                        setValue("shift-and-Warn");
                        handleClose();
                      }}
                    >
                      <ListItemText
                        primary={e.first_name + " " + e.last_name}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Shift And Warn
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   handleFetchRequest();
  // }, []);
  const handleFetchRequest = async () => {
    setOpen(true);

    setLoading(true);
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    // ;
    try {
      if (res.success !== false) {
        setEmployees(res.data.users);
      }
    } catch {}

    setLoading(false);
  };
  const ModalCTA = () => {
    const [message, setMessage] = useState("");
    const handleChange = (value) => {
      setMessage(value);
    };
    const handleDateTime = (value) => {};
    // if (options.title === optionsArray[0].title)
    //
    if (value === "instruct") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter your Instruction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                multiline
                required
                fullWidth
                label="Instruction"
                value={message}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    // if (options.title === optionsArray[1].title)
    else if (value === "call-Explanation") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select date and time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box>
                <KeyboardDatePickerExample
                  value={today}
                  showDate={handleDateTime}
                />
              </Box>
              <br />
              <Box>
                <KeyboardTimePickerExample
                  value={today}
                  showTime={handleDateTime}
                />
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Set
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // if (options.title === optionsArray[2].title)
    else if (value === "shift-and-Warn") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Shift and Warn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <p>Do you really want to shift this person.</p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  };
  //  ;
  return (
    <>
      <DropdownButton
        id="CTA-button"
        // id="dropdown-variants-primary"
        key={"primary"}
        variant={"primary"}
        // style={{ backgroundColor: "red" }}
        title="CTA"
        onSelect={(e) => {
          // ;
          setValue(e);
          setShowModalCTA(true);
        }}
      >
        <Dropdown.Item
          as="button"
          eventKey="instruct"
          style={{ color: "black", outline: "none" }}
        >
          Instruct
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          eventKey="call-Explanation"
          style={{ color: "black", outline: "none" }}
        >
          Call Explanation
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            handleFetchRequest();
          }}
          style={{ color: "black", outline: "none" }}
        >
          Shift and Warn
        </Dropdown.Item>
        {/* <DropdownButton
          id="shiftAndWarnButton"
          title="Shift and Warn"
          drop="left"
        >
          {employees.map((e) => (
            <Dropdown.Item
              as="button"
              style={{ color: "black", outline: "none" }}
            >
              <span>{e.first_name}</span>
            </Dropdown.Item>
          ))}
        </DropdownButton> */}
      </DropdownButton>
      {open ? <EmployeeList /> : null}
      {showModalCTA ? <ModalCTA /> : null}
    </>
  );
}
