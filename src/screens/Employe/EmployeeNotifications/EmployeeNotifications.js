// import { makeStyles } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import PreLoading from "../../../components/PreLoading";
import ApiUrls from "./../../../utils/ApiUrls";
import { GET } from "./../../../utils/Functions";
import "./../../Admin/Leads/LeadsAdmin.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      // maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);
export default function EmployeeNotification() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

 
  const [data, setData] = useState([]);

 
  const handleFetchData = async () => {
    let res = await GET(ApiUrls.GET_EMPLOYEE_NOTIFICATIONS);
   
    if (res?.success != false) {
      setData(res?.data?.Notifications);
    }
    console.log("res__________________>for notification", res);

    setIsLoading(false);
  };
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();

  
  
  const Notifications = ({ item, index }) => {
    let data=JSON.parse([item?.notification_body]);
    return (
      <ListItem alignItems="center" style={{borderRadius:"10px",backgroundColor:"#F2F4F5",marginBottom:"5px"}}>
        <Link to={{pathname:item.screen ,data:data}}>
          {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}
          <ListItemText
            primary={item?.notification_type}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {data?.message}
                </Typography>
              </React.Fragment>
            }
          />
        </Link>
      <Divider variant="inset" component="li" />

      </ListItem>
    );
  };
  return (
    <Container fluid className="Laa">
      <PreLoading startLoading={isLoading} />

     
        <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
       
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Notifications</h3>
        </Col>

      
           
        </Row>
     
      <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
      <Col lg={10} sm={10} xs={10} xl={11}>
      <div style={{ right: "100px" }}>
      <List className={classes.root}>
        {data?.length > 0
          ? data?.map((item, index) => (
              <Notifications item={item} index={index} />
            ))
          : null}
        
      </List>
     
    </div>
        </Col>
        
        </Row>
         
         
    </Container>
  );
}
