import './App.css';
import React from 'react';
import HeaderNavBar from './components/HeaderNavBar';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import LeadsAllocatonAndAddition from './screens/LeadsAllocatonAndAddition';
import IndividualDashboard from './screens/IndividualDashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignIn from './screens/SignIn';
import ClosedLeads from './screens/ClosedLeads';
import LeadsAdmin from './screens/LeadsAdmin';
import InventoryAdmin from './screens/InventoryAdmin';
import SearchLeads from './components/SearchLeads';
import Demo from './screens/Demo';

function App() {
  const viewHeight = window.outerHeight;
  console.log(viewHeight);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>

        <Route exact path="/dashboard">
          {/* <demo /> */}
          <Demo />
        </Route>
        <Route exact path="/leadsallocation">
          <LeadsAllocatonAndAddition />
        </Route>
        <Route exact path="/closedleads">
          <ClosedLeads />
        </Route>
        <Route exact path="/leads">
          <LeadsAdmin />
        </Route>
        <Route exact path="/inventory">
          <InventoryAdmin />
        </Route>
        {/* <IndividualDashboard /> */}
      </Switch>
    </Router>
  );
}

export default App;
