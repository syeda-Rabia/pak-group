import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeToDo from "../EmployeeToDo/EmployeeToDo";
import EmployeeLeadsSidebar from "../../../components/Sidebar/EmployeeLeadsSidebar";
export default function EmployeeToDoScreen(props) {
  const [search, setSearch] = React.useState(false);
  const [url, setUrl] = React.useState(false);
  const [goback, setGoBack] = React.useState("leads");

 const handleSearch = (url,search) => {
  setUrl(url);
  setSearch(search);
  console.log("url and search", url,search);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col
            id="sidebar-component"
            className="shadow"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <EmployeeLeadsSidebar update={handleSearch} screen={"todo"}/>
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeToDo   searchData={{url:url,search:search }}  update={handleSearch}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
