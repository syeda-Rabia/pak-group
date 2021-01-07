import React, { useState } from "react";
import "./InventoryAdmin.css";
import { Container, Row, Col } from "react-bootstrap";
import { ProjectListData } from "./../../../assests/constants/ProjectListDemoData";

export default function InventoryAdmin({ listData }) {
  const [data, setData] = useState(ProjectListData);
  console.log("data props list render ", listData);
  const TableRow = ({ index, Name, inventories }) => {
    return (
      <>
        {inventories.map((i, index) => (
          <tr>
            <td>{index + 1} </td>
            <td>{Name}</td>
            <td>{i.category}</td>
            <td>{i.blockName}</td>
            <td>{i.name}</td>
            <td>{i.status}</td>
          </tr>
        ))}
      </>
    );
  };
  return (
    <Container fluid className="Laa">
      <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>
          Inventory <sub>(Admin)</sub>
        </h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ID
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ProjectName
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Category
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        BlockName
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        InventoryName
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data[0].map((item, index) => { */}

                  <TableRow
                    Name={listData.item.Name}
                    inventories={listData.item.inventory}
                  />
                  {/* })} */}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
