import React,{ useState} from "react";
import { render } from "react-dom";
// import { GET, POST, formatDate } from "../../../utils/Functions";
// import {
//     KeyboardDatePickerExample,
//     KeyboardTimePickerExample,
//   } from "../../../utils/KeyboardTimePickerExample";
  import {
   
    TextField,
  
  } from "@material-ui/core";
  import "./../../src/screens/Admin/Leads/LeadsAdmin.css";
  import Checkbox from "@material-ui/core/Checkbox";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { v4 as uuidv4 } from 'uuid';
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
 faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
export default function ComplimentDynamicTable({setComplimentData,ComplimentData}) {


//adding new logic
const [inputList, setInputList] = useState([{ name_of_invoice: "", amount_spent: "", quantity: "" , distributed_to: "",description:"",cor:"PG-"+uuidv4().split("-")[0]}]);
const [Listdata, setListData] = useState(inputList)
// handle input change
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

// handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { name_of_invoice: "", amount_spent: "", quantity: "" , distributed_to: "",description:"",cor:"PG-"+uuidv4().split("-")[0] }]);
};
//ending new logic






    return (
    
        <div className="w-100 ">
          <div className="row clearfix">
            <div className="col-md-12 column table-responsive">
              <table
                className="table  table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                  <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Sr no
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Name of invoice
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Amount spent
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                  Quantity
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                   Distributed To
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Description
                  </span>
                </th>
                <th scope="col" className="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
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
                  {inputList.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      {/* <td><KeyboardDatePickerExample
                      value={date}
                      showDate={handleDateValue}/> </td> */}
                      <td>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Expense name"
                          value={item.name}
                          onChange={e => handleInputChange(e, idx)}
                          className="form-control w-100"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="amount"
                          placeholder="Enter Amount spent"
                          value={item.amount}
                          onChange={e => handleInputChange(e, idx)}
                          className="form-control w-100"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="quantity"
                          placeholder="Enter Quantity "
                          value={item.quantity}
                          onChange={e => handleInputChange(e, idx)}
                          className="form-control w-100"
                        />
                      </td>
                      <td>
                      <input
                          type="text"
                          name="distributed_to"
                          placeholder="Enter name"
                          value={item.distributed_to}
                          onChange={e => handleInputChange(e, idx)}
                          style={{width:"400px"}}
                          className="form-control "
                        />
                        {/* <input
                          type="text"
                          name="distributedto"
                          placeholder="Enter name"
                          value={item.distributed_to}
                          onChange={e => handleInputChange(e, idx)}
                          className="form-control w-100"
                        /> */}
                      </td>
                      <td>
                     
                      <input
                          type="text"
                          name="description"
                          placeholder="Enter description"
                          value={item.description}
                          onChange={e => handleInputChange(e, idx)}
                          style={{width:"400px"}}
                          className="form-control "
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="amount"
                          placeholder=""
                          value={item.cor}
                          // onChange={e => handleInputChange(e, idx)}
                          className="form-control w-100"
                        />
                      </td>
                      <td>
                      {inputList.length !== 1 && <button
                       className="bg-transparent  button-focus ml-2"
               
                onClick={() => handleRemoveClick(idx)}> <FontAwesomeIcon style={{ fontSize: 15,backgroundColor:"white",color:"2258BF" }} icon={faTrash} /></button>}
                     
                      </td>
                        {inputList.length - 1 === idx && <button onClick={handleAddClick}  className="btn btn-primary mt-3 text-nowrap" style={{ color:"2258BF" }}> Add Row</button>}
                      
                    </tr>
                  ))}
                  
              
                </tbody>
               
              </table>
              <button
                onClick={()=>
                {  
                 
                  setComplimentData(state=>({...state,["Compliment"]:inputList}))}
                }
                
                className="btn btn-primary "
                style={{ color:"2258BF" }}
              >
                
            Save
              </button>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
             
             
            </div>
          </div>
        </div>
   
    );
  
}

