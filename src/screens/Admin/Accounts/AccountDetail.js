import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AccountData } from "../../../assests/constants/AccountDetaildata";
import { DayPicking } from "../../../utils/YearPicker";
import DynamicTable from "../../../components/dynamicTable";
import ComplimentDynamicTable from "../../../components/ComplimentDynamicTable";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faRedo,
  faTimesCircle,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";

export default function AddAccount() {
  const [data, setData] = React.useState(AccountData);
  const [tableData, setTableData] = React.useState([]);
  const [ComplimentData, setComplimentData] = React.useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [accountName, setAccountName] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0);

  var today = new Date();
  const history = useHistory();
  // var datee = formatDate(today, "-");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();

  console.log("table data", tableData);
  console.log("data", ComplimentData);

  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.amount}</td>
        <td>{item.description}</td>
        <td>{item.COR}</td>
        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                // setShowEdit(true);
                // setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip>
            <button
              data-tip
              data-for="DeleteTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                // setShowDelete(true);
                // setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip>
          </div>
        </td>
      </tr>
    );
  };
  const Table1 = ({ item, index }) => {
    //  ;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.amount}</td>
        <td>{item.quantity}</td>
        <td>{item.distributed_to}</td>
        <td>{item.description}</td>
        <td>{item.COR}</td>
        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                // setShowEdit(true);
                // setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip>
            <button
              data-tip
              data-for="DeleteTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                // setShowDelete(true);
                // setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        <IconButton
          onClick={() => {
            history.push("/admin/account");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Account Detail</h3>
        </Col>
      </Row>

      <Row className="col-lg-12 shadow p-3  bg-white rounded ml-1 mr-1 ">
        <div className="w-100">
          {data?.map((item, index) => {
            return (
              <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                <h4 style={{ color: "#818181" }}>{item.title}</h4>
                <div
                  className="table-responsive "
                  // style={{height: "500px", overflow: "auto"}}
                >
                  {item.title !== "Compliment" ? (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              ID
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Name of Invoice
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Amount Spent
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Decription
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              COR
                            </span>
                          </th>

                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              {" "}
                              Action
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.data?.map((item, index) => (
                          //  <>
                          //   <h4 style={{ color: "#818181" }}>{item}</h4>

                          //   <DynamicTable {...{setData,data,item}} />
                          //   </>
                          <Table item={item} index={index} />
                        ))}
                      </tbody>
                      {item.data?.length > 0 && selectedID !== null ? (
                        <>
                          {/* <ModalPlay item={allLeads[selectedID]} />
         
            <ModalView item={allLeads[selectedID]} />
           
            <ModalClose item={allLeads[selectedID]} /> */}
                          {/* <ModalAddExpense item={item.data[selectedID]} /> */}
                          {/* <ModalEdit item={item.data[selectedID]} />
             <ModalDelete item={item.data[selectedID]} /> */}
                        </>
                      ) : null}
                    </table>
                  ) : (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              ID
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Name of Invoice
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Amount Spent
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Quantity
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Distributed To
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              Decription
                            </span>
                          </th>
                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              COR
                            </span>
                          </th>

                          <th scope="col" className="text-nowrap">
                            <span id="sn" style={{ color: "#818181" }}>
                              {" "}
                              Action
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.data?.map((item, index) => (
                          <Table1 item={item} index={index} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            );

            {
              /* {data?.map((item, index) => {
                  return   <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                  <h4 style={{ color: "#818181" }}>{item}</h4>
          <DynamicTable {...{setTableData,tableData,item}} />
          
              </div>;
                })}
          <DynamicTable {...{setTableData,tableData,item}} />
          
              </div>; */
            }
          })}

          {/* <div className="mt-5 shadow p-3  bg-white rounded ml-1 mr-1">
                  <h4 style={{ color: "#818181" }}>Compliment</h4>
          <ComplimentDynamicTable {...{setComplimentData,ComplimentData}}/>
          
              </div>  */}
        </div>
      </Row>
    </Container>
  );
}
