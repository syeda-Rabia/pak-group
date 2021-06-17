import { IconButton, Tooltip } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import nodata from "./../assests/nodata.png";
import ApiUrls from "./../utils/ApiUrls";
import { GET } from "./../utils/Functions";

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

console.log(
  window.location.href.split("/")[window.location.href.split("/").length - 1],
  "location**********************"
);
let endpoint = window.location.href
  .split("/")
  [window.location.href.split("/").length - 1].toLocaleLowerCase();

function StepperUI({ label, content, length, index, data }) {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return data.action_type;
      case 1:
        return data.select_option;
      case 2:
        return data.what_next;
      default:
        if (data.comments == null || data.comments == "") {
          return (
            <div>
              <Typography>Date {data.date}</Typography>
              <Typography>Time {data.time}</Typography>
              {/* <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"20px",justifyContent:"center",backgroundColor:"green",height}}> */}

            
              {/* </div> */}
            </div>
          );
        } else {
          return (
            <div>
              {data.comments}
             
            </div>
          );
        }
    }
  }
  return (
    <>
      <Stepper style={{ padding: 0 }} activeStep={index} orientation="vertical">
        {Array.from({ length: length }, (v, i) => {
          if (i == index) {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(i)}</Typography>
                </StepContent>
              </Step>
            );
          } else return <div style={{ display: "none" }} />;
        })}
      </Stepper>
    </>
  );
}
export default function VerticalLinearStepper(props) {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

//   const leadID = props.location.query;
//   const back = props.location.goback;

//   console.log(
//     "--------------------------",
//     props,
//     "back",
//     back,
//     "-------------------------"
//   );
  console.log(
    window.location.href.split("/")[window.location.href.split("/").length - 1],
    "location**********************"
  );
  let endpoint = window.location.href
    .split("/")
    [window.location.href.split("/").length - 1].toLocaleLowerCase();
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   if (leadID.item.id != undefined) handleFetchData();
  // }, []);

  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  const history = useHistory();
  // const handleFetchData = async () => {

  //   let res = await GET(
  //     ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + leadID.item.id
  //   );
  //   // console.log("--",res,ApiUrls.GET_EMPLOYEE_LEAD_ACTION + "/" + leadID.item.id);
  //   // console.log("--",JSON.stringify(res));
  //   if (res.success != false) {
  //     setData(res.data.EmpAction);
  //   }

  //   setIsLoading(false);
  // };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
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
  console.log("empty", data);

 
    return (
      <Container fluid>
        <div className={classes.root}>
          
        
              <div style={{ marginBottom: "2px", backgroundColor: "gray" }}>
                {label.map((item, index) => {
                  return (
                    <StepperUI
                      label={item}
                      content={getStepContent(index)}
                      data={props.data}
                      length={label.length}
                      index={index}
                    />
                  );
                })}
              </div>
          {/* <div style={{ height:'5px',width:'100%',backgroundColor:'grey'}}/> */}
        </div>
      </Container>
    );
}
