import React from "react";
import "./ViewableTo.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Select from "react-select";
import { toDate } from "date-fns";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
export default function ViewableTo() {
  const [select, setSelect] = React.useState([]);
  const [viewable, setViewable] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [data, setData] = React.useState([]);
  let i = 0;
  const [Employees, setEmployees] = React.useState([
    { label: "Sana", value: "Sana" },
    { label: "Atif", value: "Atif" },
    { label: "Ali", value: "Ali" },
    { label: "Imtesal", value: "Imtesal" },
    { label: "Rabia", value: "Rabia" },
    { label: "Qasim", value: "Qasim" },
  ]);
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };
  // console.log(select);
  // console.log(viewable);
  // console.log(name);
  const handleInventoryData = async () => {
    let res = await GET(ApiUrls.GET_ALL_VIEWABLE_INVENTORIES);
    console.log(res, "sana");
    if (res.success != false) {
      setData(res.data.projects.data);
    }
  };
  const handleEmployeeName = async () => {
    let res = await GET(ApiUrls.GET_ALL_EMPLOYEES);
    console.log(res, "rabia");
    if (res.success != false) {
      // setViewable(res.data.users.data);
      let arr = [];
      res.data.users.map((item) => {
        arr.push({ label: item.first_name, value: item.first_name });
      });
      setEmployees(arr);
    }
  };

  React.useEffect(() => {
    handleInventoryData();
    handleEmployeeName();
  }, []);

  const Table = ({ item, inventories, index }) => {
    return (
      <tr>
        <td>
          <input
            type="checkBox"
            onClick={(e) => {
              HandleName(index);
            }}
          />
        </td>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{inventories.inventory_name}</td>
        <td>{inventories.block_name}</td>
        <td>{inventories.inventory_category}</td>
        <td>{inventories.property_status}</td>
        <td>
          {viewable != null
            ? viewable.map((task) => {
                return `${task.value} `;
              })
            : null}
        </td>
      </tr>
    );
  };
  const SelectData = async (event) => {
    event.preventDefault();
    let postData = {
      // inventory_ids: id,
      // user_ids: id,
    };
    let res = await POST(
      ApiUrls.POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY,
      postData
    );
    console.log(res);
    let arr = data;
  };
  return (
    <Container fluid>
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-4">
        <h3 style={{ color: "#818181" }}>ViewAble To </h3>
      </div>
      <div className="Laa shadow p-3 mb-3 bg-white rounded mt-2">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <Row>
              <div className="col-lg-11">
                {select.length > 0 ? (
                  <Select
                    // disabled={!select.every((v) => v === true)}
                    options={Employees}
                    isMulti
                    onChange={(opt) => setViewable(opt)}
                    onClick={(e) => {
                      HandleName(0);
                    }}
                  />
                ) : null}
              </div>
              <div>
                {viewable != null ? (
                  viewable.length > 0 ? (
                    <button
                      className="col-lg-12 btn btn-primary"
                      type="submit"
                      style={{ backgroundColor: "#2258BF" }}
                      // disabled={!select.every((v) => v === true)}

                      onClick={SelectData}
                    >
                      save
                    </button>
                  ) : null
                ) : null}
              </div>
            </Row>

            <div className="table-responsive">
              <table className="table table-hover " style={{}}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Select
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Serial_No
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project_Category
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Inventory_Name
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Block_Name
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Inventory_Category
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ViewAble_To
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return item.inventories.map((inventories, id) => {
                      i++;
                      return (
                        <Table
                          item={item}
                          inventories={inventories}
                          index={i}
                        />
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
