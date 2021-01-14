import React, { useState } from "react";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "./../utils/KeyboardTimePickerExample";
export default function CTAButton() {
  const [value, setValue] = useState("");
  const [showModalCTA, setShowModalCTA] = React.useState(false);

  const ModalCTA = () => {
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
              <p>
                <textarea id="myTextArea" rows="3" cols="55">
                  Your text here
                </textarea>
              </p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
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
            <div className="container-fluid" style={{ marginLeft: "110px" }}>
              <div className="row mb-4">
                <KeyboardDatePickerExample />
              </div>
              <div className="row ">
                <KeyboardTimePickerExample />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
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
    else if (value === "shift-and-warn") {
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
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#2258BF" }}
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
  return (
    <>
      <DropdownButton
        id="CTA-button"
        variant="info"
        title="CTA"
        onSelect={(e) => {
          setValue(e);
          setShowModalCTA(true);
          console.log(e);
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
        {/* <Dropdown.Item
              as="button"
              eventKey="shift-and-Warn"
              style={{ color: "black", outline: "none" }}
            >
              Shift and Warn
            </Dropdown.Item> */}
        <DropdownButton
          id="shiftAndWarnButton"
          title="Shift and Warn"
          drop="left"
        >
          <Dropdown.Item
            as="button"
            eventKey="instruct"
            style={{ color: "black", outline: "none" }}
          >
            Atif
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="call-Explanation"
            style={{ color: "black", outline: "none" }}
          >
            Rabia
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="shift-and-Warn"
            style={{ color: "black", outline: "none" }}
          >
            Qasim
          </Dropdown.Item>
        </DropdownButton>
      </DropdownButton>
      <ModalCTA />
    </>
  );
}
