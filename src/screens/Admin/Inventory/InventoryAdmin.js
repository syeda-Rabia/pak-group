import React, { useState, useEffect } from "react";
import "./InventoryAdmin.css";
import { Container, Row, Col } from "react-bootstrap";
import { ProjectListData } from "./../../../assests/constants/ProjectListDemoData";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";

export default function InventoryAdmin(props) {
  const [data, setData] = useState(ProjectListData);
  const [allInventories, setAllInventories] = useState([]);

  useEffect(() => {
    getALlInv();
  }, []);

  const getALlInv = async () => {
    let project_id = props.listData.item.id;

    let resp = await GET(
      ApiUrls.GET_SINGLE_PROECT_INVENTORIES + "/" + project_id
    );

    if (resp.data != null) {
      console.log("----------------data -------------");
      console.log(JSON.stringify(resp.data));
      setAllInventories(resp.data.inventories);

      console.log("----------------data -------------");
    }
  };

  let listData = [];
  console.log("coming Props are ------------ ", JSON.stringify(props));

  const TableRow = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1} </td>
        <td>{item.serial_no}-</td>
        <td>{props.listData.item.name}</td>
        <td>{item.inventory_category}</td>
        <td>{item.inventory_name}</td>
        <td>{item.block_name}</td>
        <td>{item.property_status}</td>
      </tr>
    );
  };

  return (
    <Container fluid className="Laa">
      <Row>
        <div class="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
          <h3 style={{ color: "#818181" }}>
            Inventory Details <sub>(Admin)</sub>
          </h3>
        </div>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
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
                      Serial_No
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
                      InventoryName
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      BlockName
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

                {allInventories.length > 0
                  ? allInventories.map((item, index) => (
                      <TableRow item={item} key={index} index={index} />
                    ))
                  : null}
                {/* <TableRow
                  Name={listData.item.Name}
                  inventories={listData.item.inventory}
                /> */}
                {/* })} */}
              </tbody>
            </table>
          </div>
        </div>
      </Row>
    </Container>
  );
}
