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
export default function DynamicTable({setTableData,tableData,item}) {


//adding new logic
const [inputList, setInputList] = useState([{ name: "", amount: "" ,description:"",COR:"PG-"+uuidv4().split("-")[0]}]);
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
  setInputList([...inputList, { name: "", amount: "" ,description:"",COR:"PG-"+uuidv4().split("-")[0] }]);
};
//ending new logic

const Table = ({ item, idx }) => {
    // console.log(item);
    const LeadArray = [
      {
        name: " Sr no",
        att: idx,
      },
      {
        name: "Name of invoice",
        att: <input
        type="text"
        name="name"
        placeholder="Enter Expense name"
        value={item.name}
        onChange={e => handleInputChange(e, idx)}
        className="form-control w-80"
      />,
      },
      {
        name: " Amount spent",
        att: <input
        type="text"
        name="amount"
        placeholder="Enter Amount spent"
        value={item.amount}
        onChange={e => handleInputChange(e, idx)}
        className="form-control w-80"
      />,
      },
      {
        name: " Description",
        att: <input
        type="text"
        name="description"
        placeholder="Enter description"
        value={item.description}
        onChange={e => handleInputChange(e, idx)}
        // style={{width:"400px"}}
        className="form-control w-80"
      />,
      },
      {
        name: " COR",
        att:  <input
        type="text"
        name="amount"
        placeholder="Enter Amount spent"
        value={item.COR}
        // onChange={e => handleInputChange(e, idx)}
        className="form-control w-80"
      />,
      },
      {
        name: " Action",
        att: inputList.length !== 1 && <button
            className="bg-transparent  button-focus ml-2"
    
     onClick={() => handleRemoveClick(idx)}> <FontAwesomeIcon style={{ fontSize: 15,backgroundColor:"white",color:"2258BF" }} icon={faTrash} /></button>
          ,
      },
      {
        name: " ",
                       att: inputList.length - 1 === idx && <button onClick={handleAddClick}  className="btn btn-primary mt-3 text-nowrap" style={{ color:"2258BF" }}> Add Row</button>
        
      }
    ];
    let country_city = "country/city";
    let created_date = item.created_at;
    return (
      <>
        {LeadArray.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.att}</td>
            </tr>
            
          );
        })}
      </>
    );
  };




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
                  <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Name
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    values
                  </span>
                </th>
                  </tr>
                </thead>

                <tbody>
                  {inputList.map((item, idx) => (
                         <Table item={item} idx={idx} />))}
                     
                </tbody>
               
              </table>
              <button
                onClick={()=>
                {  
                 
                  setTableData(state=>({...state,[item]:inputList}))}
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

