import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SearchLeads from "./SearchLeads";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import FormPopover from "./FormPopover";
import LAASidebar from "./LAASidebar";
import buttonImg from "./../../assests/resource.svg";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <button
            // className="toggle-button"
            style={{
              width: "63px !important",
              backgroundColor: "#e5eeff",
              color: "#2258bf",
              padding: "10px",
              // marginTop: "20px",
              borderRadius: "41px",
              border: "none",
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            <img src={buttonImg} />
          </button> */}
          <Fab onClick={toggleDrawer(anchor, true)} aria-label="add">
            <img src={buttonImg} />
          </Fab>

          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* <LAASidebar /> */}
            <FormPopover name="Search Leads" />
            <ul className="list-group">
              <li id="list-item" className="list-group-item">
                Add News Leads
              </li>
              <li id="list-item" className="list-group-item">
                <Link
                  className="navLink"
                  id="list-item"
                  to={{
                    pathname: "/admin/todolist",
                  }}
                >
                  To Do List
                </Link>
              </li>
              <li id="list-item" className="list-group-item">
                <Link
                  className="navLink"
                  id="list-item"
                  to={{
                    pathname: "/admin/closedleads",
                  }}
                >
                  Closed Leads
                </Link>
              </li>
            </ul>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
