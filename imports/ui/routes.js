import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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

import { Signup } from './account/Signup'
import { Login } from './account/Login'
import { Settings } from './settings/Settings'
import { Dashboard } from './dashboard/Dashboard'
import { KpiAttestation } from './attestations/KpiAttestation'
import { ExchangeStart } from './exchange/ExchangeStart'
import { TokenSelect } from './exchange/TokenSelect'
import { ConfirmTransaction } from './exchange/ConfirmTransaction'
import { TransactionReceipt } from './exchange/TransactionReceipt'
import { PasswordReset } from './account/PasswordReset'
import { Titlebar } from './components/Titlebar';

Meteor.startup(() => {
  render(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="max-w-2xl mx-auto drop-shadow-lg bg-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/attestation" element={<KpiAttestation />} />
            <Route path="/exchange" element={<ExchangeStart/>} />
            <Route path="/exchange/tokenselect" element={<TokenSelect/>} />
            <Route path="/exchange/txreceipt" element={<TransactionReceipt/>} />
            <Route path="/exchange/confirmtx" element={<ConfirmTransaction/>} />
            <Route path="/passwordreset" element={<PasswordReset/>} />
          </Routes>
        </BrowserRouter>
        </div>
        </RainbowKitProvider>
    </WagmiConfig>
    
  , document.getElementById('react-target'));  
});


// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-target'));
// });

