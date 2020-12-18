import React from 'react';
import './ToDoListAdmin.css';
import { dummyData } from '../../../assests/constants/todoList';
import { Container, Row, Col } from 'react-bootstrap';

export default function LeadsAllocatonAndAddition() {
  const [data, setData] = React.useState(dummyData);
  console.log(data);
  const TableRow = ({ index, item }) => {
    console.log('item', item);
    return (
      <tr>
        <th scope="row">{index}</th>
        <td>
          <input placeholder={item.Clients} className="form-control" />
        </td>
        <td>
          <input placeholder={item.Contacts} className="form-control" />
        </td>
        <td>
          <select className="form-control form-control-sm">
            {item.Project.map((project) => (
              <option>{project}</option>
            ))}
          </select>
        </td>
        <td>{item.Budget}</td>
        <td>{item.TOC}</td>
        <td>{item.Country}</td>

        <td>
          <select className="form-control form-control-sm">
            {item.Status.map((status) => {
              return <option>{status}</option>;
            })}
          </select>
        </td>

        <td>
          <select className="form-control form-control-sm">
            {item.Interest.map((interest) => {
              return <option>{interest}</option>;
            })}
          </select>
        </td>
        <td>
          <input placeholder={item.Email} className="form-control" />
        </td>
        <td>
          <select className="form-control form-control-sm">
            {item.Task.map((task) => {
              return <option>{task}</option>;
            })}
          </select>
        </td>
        <td>{item.Deadline}</td>
        <td>
          <select className="form-control form-control-sm">
            {item.Returned.map((returned) => {
              return <option>{returned}</option>;
            })}
          </select>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <h1>To DO List Admin</h1>
      <Row>
        <Col lg="12" style={{ backgroundColor: 'white', borderRadius: '5px' }}>
          <div className="table-responsive">
            <table className="table table-hover" style={{ display: 'block' }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Clients</th>
                  <th scope="col">Contacts</th>
                  <th scope="col">Project</th>
                  <th scope="col">Budget</th>
                  <th scope="col">Time to Call</th>
                  <th scope="col">Country/City</th>
                  <th scope="col">Status</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Email</th>
                  <th scope="col">Task</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Returned From</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return <TableRow index={index} item={item} />;
                })}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
