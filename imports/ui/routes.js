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
import { SettingsPage } from './settings/Settings'
import { Dashboard } from './dashboard/Dashboard'
import { KpiAttestation } from './attestations/KpiAttestation'
import { ExchangeStart } from './exchange/ExchangeStart'
import { TokenSelect } from './exchange/TokenSelect'
import { ConfirmTransaction } from './exchange/ConfirmTransaction'
import { TransactionReceipt } from './exchange/TransactionReceipt'
import { PasswordReset } from './account/PasswordReset'
import { AttestationsCount } from './attestations/AttestationsCount';
import { Titlebar } from './components/Titlebar';

Meteor.startup(() => {
  render(
    <div className="">
      <div className="mx-auto max-w-3xl drop-shadow-lg bg-white h-full">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/attestation" element={<KpiAttestation />} />
                <Route path="/exchange" element={<ExchangeStart/>} />
                <Route path="/exchange/tokenselect" element={<TokenSelect/>} />
                <Route path="/exchange/txreceipt" element={<TransactionReceipt/>} />
                <Route path="/exchange/confirmtx" element={<ConfirmTransaction/>} />
                <Route path="/attestationscount" element={<AttestationsCount/>} />
                <Route path="/passwordreset" element={<PasswordReset/>} />
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

