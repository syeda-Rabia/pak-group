import React,{ useState} from "react";
import { render } from "react-dom";
import { GET, POST, formatDate } from "../utils/Functions";
import {
    KeyboardDatePickerExample,
    KeyboardTimePickerExample,
  } from "../utils/KeyboardTimePickerExample";
  import {
   
    TextField,
  
  } from "@material-ui/core";
  import Checkbox from "@material-ui/core/Checkbox";
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
 faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
export default function DynamicTable(props) {
    const [date, setDate] = useState();
    const [state, setState] = useState({
        rows: [{}]
      });
      var today = new Date();
      var datee = formatDate(today, "-");
      const handleDateValue = (value) => {
        setDate(formatDate(value, "-"));
        // console.log(formatDate(value, "-"));
      };
  const handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...state.rows];
    rows[idx] = {
      [name]: value
    };
    setState({
      rows
    });
  };
  const handleAddRow = () => {
    const item = {
      name: "",
      mobile: ""
    };
    setState({
      rows: [...state.rows, item]
    });
  };
  const handleRemoveRow = () => {
    setState({
      rows: state.rows.slice(0, -1)
    });
  };
  const handleRemoveSpecificRow = (idx) => () => {
    const rows = [...state.rows]
    rows.splice(idx, 1)
    setState({ rows })
  }
 
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table  table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center" style={{ color: "#818181" }}> Sr no </th>
                    <th className="text-center" style={{ color: "#818181" }}> Date </th>
                    <th className="text-center" style={{ color: "#818181" }}> Name of invoice </th>
                    <th className="text-center" style={{ color: "#818181" }}> Amount </th>
                    <th className="text-center" style={{ color: "#818181" }}> Description </th>
                    <th className="text-center" style={{ color: "#818181" }}> Action </th>

                    <th />
                  </tr>
                </thead>
                <tbody>
                  {state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td><KeyboardDatePickerExample
                      value={date}
                      showDate={handleDateValue}/> </td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={state.rows[idx].name}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="amount"
                          value={state.rows[idx].mobile}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                      {/* <TextField
                // variant="outlined"
                autoFocus
                margin="dense"
                multiline
                fullWidth
                required={true}
                label="Instruction"
                // value={message}
                onChange={(e) => {
                //   handleChange(e.target.value);
                }}
              /> */}
                        <input
                          type="text"
                          name="Description"
                          value={state.rows[idx].mobile}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="bg-transparent  button-focus ml-2"
                          onClick={handleRemoveSpecificRow(idx)}
                        >
                          <FontAwesomeIcon style={{ fontSize: 15,backgroundColor:"white",color:"blue" }} icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                // onClick={handleRemoveRow}
                className="btn btn-primary float-right"
              >
            Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  
}

