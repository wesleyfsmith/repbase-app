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
  lightTheme
} from '@rainbow-me/rainbowkit';
import {chains, wagmiClient} from '/imports/utils/wallet-client-utils';
import { alchemyProvider } from 'wagmi/providers/alchemy';
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
import { LandingPage } from './LandingPage';
import { Inicio } from './empresa/inicio/Inicio';
import { Kpis } from './empresa/kpis/Kpis';
import { TimePeriodPage } from './empresa/kpis/TimePeriodPage';
import { Empleados } from './empresa/empleados/Empleados';
import { Logros } from './empresa/logros/Logros';
import { Ajustes } from './empresa/ajustes/Ajustes';
import { EmpresaLogin } from './empresa/account/Login';

const PageContainer = ({children}) => (
  <div className="container max-w-2xl mx-auto bg-white drop-shadow-lg">
    {children}
  </div>
);

// max-w-3xl drop-shadow-lg 

Meteor.startup(() => {
  render(
    <div className="">
      <div className="mx-auto bg-white">
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider theme={lightTheme({
            accentColor: '#18A0FB',
            borderRadius: 'medium',
            overlayBlur: 'small',
            fontStack: 'rounded'
          })} chains={chains} initialChain={chain.polygonMumbai}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/signup" element={<PageContainer><Signup /></PageContainer>}/>
                <Route path="/login" element={<PageContainer><Login /></PageContainer>}/>
                <Route path="/dashboard" element={<PageContainer><Dashboard /></PageContainer>} />
                <Route path="/settings" element={<PageContainer><SettingsPage /></PageContainer>} />
                <Route path="/attestation/:rewardType" element={<PageContainer><KpiAttestation /></PageContainer>} />
                <Route path="/exchange" element={<PageContainer><ExchangeStart/></PageContainer>} />
                <Route path="/exchange/tokenselect" element={<PageContainer><TokenSelect/></PageContainer>} />
                <Route path="/exchange/txreceipt/:coinType/:repTokens" element={<PageContainer><TransactionReceipt/></PageContainer>} />
                <Route path="/exchange/confirmtx/:coinType/:repTokens" element={<PageContainer><ConfirmTransaction/></PageContainer>} />
                <Route path="/attestationscount" element={<PageContainer><AttestationsCount/></PageContainer>} />
                <Route path="/passwordreset" element={<PageContainer><PasswordReset/></PageContainer>} />
                <Route path="/empresa/inicio" element={<Inicio />} />
                <Route path="/empresa/kpis" element={<Kpis />} />
                <Route path="/empresa/kpis/timeperiod/:id" element={<TimePeriodPage />} />
                <Route path="/empresa/empleados" element={<Empleados />} />
                <Route path="/empresa/logros" element={<Logros />} />
                <Route path="/empresa/ajustes" element={<Ajustes />} />
                <Route path="/empresa/login" element={<EmpresaLogin />} />
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

