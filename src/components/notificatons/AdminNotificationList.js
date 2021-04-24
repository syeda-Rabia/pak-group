import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { GET, POST } from "../../utils/Functions";
import ApiUrls from "../../utils/ApiUrls";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "500px",
      paddingRight:"50px",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export default function AlignItemsList() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    handleFetchData();
  }, []);

 
  const history = useHistory();
  const handleFetchData = async () => {
    let res = await GET(ApiUrls.GET_ADMIN_NITIFICATIONS);
    
    if (res.success != false) {
      setData(res?.data?.Notifications);
    }
    console.log("res__________________>for notification", res);

    setIsLoading(false);
  };
  const Notifications = ({ item, index }) => {
    let data=JSON.parse([item.notification_body]);
    return (
      <ListItem alignItems="center">
        <Link to={{pathname:item.screen ,data:data}}>
          {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}
          <ListItemText
            primary={item?.notification_title}
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
      </ListItem>
    );
  };

  return (
    <div style={{ right: "100px" }}>
      <List className={classes.root}>
        {data?.length > 0
          ? data?.slice(0,3).map((item, index) => (
              <Notifications item={item} index={index} />
            ))
          : null}
        <Divider variant="inset" component="li" />
      </List>
      <Link to="/admin/notification">See All Notifications</Link>
    </div>
  );
}
