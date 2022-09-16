import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { render } from 'react-dom';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {chains, wagmiClient} from '/imports/utils/wallet-client-utils';
// import your route components too

import { Signup } from './employee/account/Signup';
import { Login } from './employee/account/Login';
import { SettingsPage } from './employee/settings/Settings';
import { Dashboard } from './employee/dashboard/Dashboard';
import { KpiAttestation } from './employee/attestations/KpiAttestation';
import { ExchangeStart } from './employee/exchange/ExchangeStart';
import { TokenSelect } from './employee/exchange/TokenSelect';
import { ConfirmTransaction } from './employee/exchange/ConfirmTransaction';
import { TransactionReceipt } from './employee/exchange/TransactionReceipt';
import { PasswordReset } from './employee/account/PasswordReset';
import { AttestationsCount } from './employee/attestations/AttestationsCount';
import { Sidebar } from './empresa/Sidebar';
import { LandingPage } from './LandingPage';
import { Inicio } from './empresa/inicio/Inicio';
import { Kpis } from './empresa/kpis/Kpis';
import { TimePeriodPage } from './empresa/kpis/TimePeriodPage';
import { Empleados } from './empresa/empleados/Empleados';
import { Logros } from './empresa/logros/Logros';

// max-w-3xl drop-shadow-lg 

Meteor.startup(() => {
  render(
    <div className="">
      <div className="mx-auto bg-white">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/attestation/:rewardType" element={<KpiAttestation />} />
                <Route path="/exchange" element={<ExchangeStart/>} />
                <Route path="/exchange/tokenselect" element={<TokenSelect/>} />
                <Route path="/exchange/txreceipt" element={<TransactionReceipt/>} />
                <Route path="/exchange/confirmtx" element={<ConfirmTransaction/>} />
                <Route path="/attestationscount" element={<AttestationsCount/>} />
                <Route path="/passwordreset" element={<PasswordReset/>} />
                <Route path="/sidebar" element={<Sidebar/>} />
                <Route path="/empresa/signup" element={<Signup/>} />
                <Route path="/empresa/inicio" element={<Inicio />} />
                <Route path="/empresa/kpis" element={<Kpis />} />
                <Route path="/empresa/timeperiod" element={<TimePeriodPage />} />
                <Route path="/empresa/empleados" element={<Empleados />} />
                <Route path="/empresa/logros" element={<Logros />} />
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
    
    , document.getElementById('react-target'));  
});


// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-target'));
// });

