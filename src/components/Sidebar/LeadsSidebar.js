import React from "react";
import { Container } from "react-bootstrap";
import FormPopover from "./FormPopover";
import SearchLeads from "./SearchLeads";

export default function LeadsSidebar() {
  return (
    <Container
      fluid
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <FormPopover name="Search Leads" />
      <FormPopover name="Search Visit" />
      {/* <SearchLeads name="Search Leads" />
      <SearchLeads name="Search Visit" /> */}
    </Container>
  );
}
