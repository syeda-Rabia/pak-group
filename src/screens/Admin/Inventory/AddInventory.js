import React from 'react';
import { Form, Button } from 'react-bootstrap';
export default function AddInventory() {
  const submit = (e) => {
    e.preventDefault();
    console.log('Submit');
  };
  return (
    <React.Fragment>
      <Form onSubmit={submit}>
        <Form.Group controlId="inventoryName">
          <Form.Label>Name</Form.Label>
          <Form.Control required={true} className="w-100" type="text" />
        </Form.Group>

        <Form.Group controlId="projectCategory">
          <Form.Label>Project Category</Form.Label>
          <Form.Control as="select">
            <option>Sale</option>
            <option>Rent</option>
            <option>Both</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="units">
          <Form.Label>Units</Form.Label>
          <Form.Control
            className="w-50"
            type="number"
            placeholder="Number of Properties"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            submit(e);
          }}
        >
          Next
        </Button>
      </Form>
    </React.Fragment>
  );
}
