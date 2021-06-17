import React from "react";
import { Container } from "react-bootstrap";
import EmployeeFormPopover from "./EmployeeFormPopover";
import SearchLeads from "./SearchLeads";
import { Link } from "react-router-dom";

export default function EmployeeLeadsSidebar(props) {
  console.log(props,"SideBar Screen")
  return (
    <Container
      fluid
      style={{
        height: "86vh", 
      }}
    >
      <EmployeeFormPopover name="Search Leads" update={props.update} />
      {/* <FormPopover name="Search Visit" update={props.update}/> */}
      {/* <SearchLeads name="Search Leads" />
      <SearchLeads name="Search Visit" /> */}
      {props.screen=="leads"?
      (
<ul className="list-group">
         
         <li id="list-item" className="list-group-item">
           <Link
             className="navLink"
             id="list-item"
             to={{
               pathname: "/employee/shifted-leads",
             }}
           >
             Shifted Leads
           </Link>
         </li>
       </ul>
      ): null}
       
    </Container>
  );
}
