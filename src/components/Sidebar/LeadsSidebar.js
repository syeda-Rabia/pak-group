import React from 'react';
import { Container } from 'react-bootstrap';
import SearchLeads from './SearchLeads';

export default function LeadsSidebar() {
  return (
    <Container
      fluid
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      <SearchLeads name="Search Leads" />
      <SearchLeads name="Search Visit" />
    </Container>
  );
}
