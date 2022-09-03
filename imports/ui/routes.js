import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { render } from 'react-dom';
// import your route components too

import { Signup } from './account/Signup'
import { Login } from './account/Login'
import { Settings } from './settings/Settings'
import { Dashboard } from './dashboard/Dashboard'
import { KpiAttestation } from './attestations/KpiAttestation'
import { ExchangeStart } from './exchange/ExchangeStart'

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/attestation" element={<KpiAttestation />} />
        <Route path="/exchange" element={<ExchangeStart/>} />
      </Routes>
    </BrowserRouter>
  , document.getElementById('react-target'));  
});


// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-target'));
// });

