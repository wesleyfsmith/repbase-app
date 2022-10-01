import React, { useEffect } from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { CogIcon } from '@heroicons/react/outline';
import { AttestationsList } from '../attestations/AttestationsList';
import { Link } from 'react-router-dom';
import { FooterBlack } from '../footer/FooterBlack';
import { useApi } from '../../../api/utils/client-utils';
import { Crypto } from '../../../api/crypto/crypto-module';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const AlertIcon = () => (
  <div className="w-1/2 flex flex-col justify-center pl-4">
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9215 1.99982C16.6339 1.40086 16.1829 0.895353 15.6205 0.541538C15.0581 0.187723 14.4072 0 13.7427 0C13.0783 0 12.4274 0.187723 11.865 0.541538C11.3026 0.895353 10.8516 1.40086 10.564 1.99982L0.418979 21.9561C-0.794771 24.3386 0.738979 27.5023 3.59648 27.5023H23.8877C26.7465 27.5023 28.2777 24.3398 27.0665 21.9561L16.9215 1.99982ZM13.7427 8.75232C14.0743 8.75232 14.3922 8.88402 14.6266 9.11844C14.861 9.35286 14.9927 9.6708 14.9927 10.0023V16.2523C14.9927 16.5838 14.861 16.9018 14.6266 17.1362C14.3922 17.3706 14.0743 17.5023 13.7427 17.5023C13.4112 17.5023 13.0933 17.3706 12.8588 17.1362C12.6244 16.9018 12.4927 16.5838 12.4927 16.2523V10.0023C12.4927 9.6708 12.6244 9.35286 12.8588 9.11844C13.0933 8.88402 13.4112 8.75232 13.7427 8.75232ZM13.7427 19.3773C14.0743 19.3773 14.3922 19.509 14.6266 19.7434C14.861 19.9779 14.9927 20.2958 14.9927 20.6273V21.2523C14.9927 21.5838 14.861 21.9018 14.6266 22.1362C14.3922 22.3706 14.0743 22.5023 13.7427 22.5023C13.4112 22.5023 13.0933 22.3706 12.8588 22.1362C12.6244 21.9018 12.4927 21.5838 12.4927 21.2523V20.6273C12.4927 20.2958 12.6244 19.9779 12.8588 19.7434C13.0933 19.509 13.4112 19.3773 13.7427 19.3773Z" fill="#FFC700"/>
    </svg>
  </div>
);

export const Dashboard = () => {
  const hasReptokensToRedeem = useApi(Crypto.api.hasReptokensToRedeem);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    hasReptokensToRedeem.call();
  }, []);

  return (
    <div className="bg-neutral">

      <div className="bg-white pb-4">
        <Titlebar />
        <Navbar title="Hola Luis!" 
          iconRight={
            <Link to="/settings">
              <CogIcon className="h-7 w-7 text-blue-500 mt-1 ml-auto"/>
            </Link>
          } noCenterTitle={true} />
     
        <div className="m-4">
          <div className="alert alert-success shadow-lg mb-2">
            <div className="flex flex-col">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>You have 10 reptokens available for redemption.</span>
              </div>
              <div>
                {/* {
                  !isConnected ?
                    <article className="text-error">
                  You must connect a wallet to redeem
                    </article>
                    :
                    <div className="flex-none">
                      <button className="btn btn-sm btn-primary">Redimir</button>
                    </div>
                } */}
              </div>
              
            </div>
            
            
          </div>
          <TokenBalance />
        </div>
      </div>
    
    
      
      <div className="p-4 bg-neutral">
        <article className="prose prose-xl">
          <p className="font-bold text-white">Colección de logros</p>
        </article>
        <div className="mt-4">
          <AttestationsList />
        </div>
        
        <div className="form-control">
          <Link to="/attestationscount">
            <button className="btn btn-primary mt-4 w-full">Ver Logros</button>
          </Link>
          
        </div>
      </div>
      <FooterBlack />
    </div>
  );};
