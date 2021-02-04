import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
import LeadsAdmin from "../../Admin/Leads/LeadsAdmin";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(0),
  },
  resetContainer: {
    padding: theme.spacing(0),
  },
}));

function getSteps() {
  return ["Action Type", "Select Option", "What Next", "Action"];
}



function StepperUI({ label, content,length,index, data }) {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return data.action_type;
      case 1:
        return data.select_option;
      case 2:
        return data.what_next;
      default:
        if(data.comments==null ||data.comments=="" ){
          return <div>
             <Typography>Date {data.date}</Typography>
             <Typography>Time {data.time}</Typography>
          </div>
        }
        else{
          return data.comments;
        }
       
    }
  }
  return (
    <>
    <Stepper style={{padding:0}} activeStep={index} orientation="vertical">
      {
        Array.from({length:length},(v,i)=>{
          if(i==index) {
            return  ( 
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(i)}</Typography>
                </StepContent>
              </Step>
            )
          }
          else 
          return  (<div style={{display:'none'}}/>)
        })
      }
    </Stepper>
    </>
  );
}
export default function VerticalLinearStepper(props) {
  const [data, setData] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(false);
console.log(props)
const handleFetchData = async () => {
  // setIsLoading(true);
  // if (props.leads !== undefined) {
  //   let lead_id = props.leads.item.id;
 
  // let res = await GET(
  //   ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + lead_id
  // );
  // console.log("--",res);
  // if (res.success != false) {
  //   // setData(res.data.EmpAction);
  // }
  setData( [
            {
                "id": 3,
                "lead_id": 3,
                "action_type": "VISIT",
                "select_option": "WHATSAPP SENT",
                "what_next": "REQUEST TO CLOSE",
                "date": null,
                "time": null,
                "comments": "comments AFTER SELECT WHATSAPP SENT",
                "created_by": 4,
                "is_deleted": 0,
                "created_at": "2021-02-02T13:22:37.000000Z",
                "updated_at": "2021-02-02T13:22:37.000000Z",
                "users": {
                    "id": 4,
                    "first_name": "4 imtesal",
                    "last_name": "shafique",
                    "phone": "2357654365",
                    "email": "emp2@gmail.com",
                    "gender": "Female",
                    "user_type": 2,
                    "email_verified_at": null,
                    "is_blocked": 0,
                    "is_deleted": 0,
                    "blocked_by": null,
                    "created_at": "2021-01-08T07:27:36.000000Z",
                    "updated_at": "2021-01-28T07:11:49.000000Z"
                },
                "lead": {
                    "id": 3,
                    "action": null,
                    "client_name": "3 Lead Client",
                    "contact": "0323456789",
                    "email": "voromiv@mailinator.com",
                    "project_id": 1,
                    "created_by": 7,
                    "inventory_id": 4,
                    "budget": "1000000",
                    "source": "TV",
                    "country_city": "Laborum",
                    "task": null,
                    "time_to_call": null,
                    "dead_line": null,
                    "status": "Allocated",
                    "is_allocated": 1,
                    "is_deleted": 0,
                    "created_at": "2021-01-06T12:51:50.000000Z",
                    "updated_at": "2021-02-01T09:40:14.000000Z",
                    "interest_id": null
                }
            },
            {
                "id": 2,
                "lead_id": 3,
                "action_type": "CODING",
                "select_option": "WHATSAPP SENT",
                "what_next": "REQUEST TO CLOSE",
              "date": "2010-01-03",
                "time": "04:30:29",
                "comments":null,
                "created_by": 4,
                "is_deleted": 0,
                "created_at": "2021-02-02T13:22:37.000000Z",
                "updated_at": "2021-02-02T13:22:37.000000Z",
                "users": {
                    "id": 4,
                    "first_name": "4 imtesal",
                    "last_name": "shafique",
                    "phone": "2357654365",
                    "email": "emp2@gmail.com",
                    "gender": "Female",
                    "user_type": 2,
                    "email_verified_at": null,
                    "is_blocked": 0,
                    "is_deleted": 0,
                    "blocked_by": null,
                    "created_at": "2021-01-08T07:27:36.000000Z",
                    "updated_at": "2021-01-28T07:11:49.000000Z"
                },
                "lead": {
                    "id": 3,
                    "action": null,
                    "client_name": "3 Lead Client",
                    "contact": "0323456789",
                    "email": "voromiv@mailinator.com",
                    "project_id": 1,
                    "created_by": 7,
                    "inventory_id": 4,
                    "budget": "1000000",
                    "source": "TV",
                    "country_city": "Laborum",
                    "task": null,
                    "time_to_call": null,
                    "dead_line": null,
                    "status": "Allocated",
                    "is_allocated": 1,
                    "is_deleted": 0,
                    "created_at": "2021-01-06T12:51:50.000000Z",
                    "updated_at": "2021-02-01T09:40:14.000000Z",
                    "interest_id": null
                }
            }
        ])
  setIsLoading(false);
};
React.useEffect(() => {
  handleFetchData();
}, []);
function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}
  const classes = useStyles();
  const label = ["Action Type", "Select Option", "What Next", "Action"];
 
  return (
    <div className={classes.root}>
      {
        data.map((val)=>{
          return (<>
          
          {label.map((item, index) => {
            return <StepperUI label={item} content={getStepContent(index)} data={val} length={label.length} index={index} />;
            
          })}
          </>)
        })
      }
   
    </div>
  );
}
