import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Form, Button, Col, Container, Jumbotron } from 'react-bootstrap';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
export default function AddInventory() {
  const [form, setForm] = React.useState(true); //
  const [dummy, setDummy] = React.useState([]);
  const submit = (e) => {
    e.preventDefault();
    console.log('Submit');
  };

  const Inventory = () => {
    const [name, setName] = React.useState('');
    const [units, setUnits] = React.useState(1);
    const [category, setCategory] = React.useState('Both');

    const handleForm = () => {
      setForm(false);
      let arr = [];
      for (let i = 0; i < units; i++) {
        arr.push({
          id: i + 1,
          name: '',
          category: '',
          block_name: '',
          status: '',
        });
      }
      setDummy(arr); //[]
    };

    return (
      <React.Fragment>
        <div
          style={{
            // backgroundColor: 'red',
            margin: 'auto',
            width: '70%',
            // border: '3px solid green',
            padding: '10px',
            marginTop: '10px',
          }}
        >
          <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
            <h3 style={{ color: '#818181' }}>Add Project</h3>
          </div>
          <div class="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
            <Form onSubmit={submit}>
              <Form.Group controlId="inventoryName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required={true}
                  className="w-100"
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="projectCategory">
                <Form.Label>Project Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={'Both'}>Sale & Rent</option>
                  <option value={'Sale'}>Sale</option>
                  <option value={'Rent'}>Rent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="units">
                <Form.Label>Units</Form.Label>
                <Form.Control
                  defaultValue={units}
                  onChange={(e) => {
                    setUnits(e.target.value);
                  }}
                  className="w-100"
                  type="number"
                  placeholder="Number of Properties"
                />
              </Form.Group>
              {name != '' ? (
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

    const viewData = (data, id) => {
      // console.log('index', id);
      // console.log('data', data);
      let key = Object.keys(data)[0];
      let inData = InventoryData.map((item) => {
        if (item.id == id) {
          item[key] = data[key];
        }
        return item;
      });
      console.log(inData);
      setInventoryData(inData);
    };
    React.useEffect(() => {
      if (InventoryData.length === 0) setForm((state) => !state);
    }, [InventoryData]);
    return (
      <React.Fragment>
        <br />

        <Button onClick={() => setForm((state) => !state)}>Go Back</Button>
        <Container>
          <Form>
            {InventoryData.map((item, index) => {
              return (
                <Form.Row>
                  <Col>
                    <Form.Control
                      placeholder="Inventory name"
                      value={item.name}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ name: e.target.value }, item.id);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Group controlId="projectCategory">
                      <Form.Control
                        style={{ height: 'calc(1.5em + 0.75rem + -4px)' }}
                        as="select"
                        placeholder="Project Category"
                        value={item.category}
                        onChange={(e) => {
                          // setInventoryData()
                          viewData({ category: e.target.value }, item.id);
                        }}
                      >
                        <option value={'Sale'}>Sale</option>
                        <option value={'Rent'}>Rent</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Block name"
                      value={item.block_name}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ block_name: e.target.value }, item.id);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Status"
                      value={item.status}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ status: e.target.value }, item.id);
                      }}
                    />
                  </Col>
                  <Col>
                    <RemoveOutlinedIcon
                      onClick={() => {
                        console.log('clicked');
                        const tempData = InventoryData.filter(
                          (del) => del.id !== item.id
                        );
                        setInventoryData(tempData);
                      }}
                    />
                  </Col>
                </Form.Row>
              );
            })}

            <Button>Save</Button>
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
