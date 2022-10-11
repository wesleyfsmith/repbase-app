import React, { useEffect, useState } from 'react';
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
import PuffLoader from 'react-spinners/PuffLoader';

const AlertIcon = () => (
  <div className="w-1/2 flex flex-col justify-center pl-4">
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9215 1.99982C16.6339 1.40086 16.1829 0.895353 15.6205 0.541538C15.0581 0.187723 14.4072 0 13.7427 0C13.0783 0 12.4274 0.187723 11.865 0.541538C11.3026 0.895353 10.8516 1.40086 10.564 1.99982L0.418979 21.9561C-0.794771 24.3386 0.738979 27.5023 3.59648 27.5023H23.8877C26.7465 27.5023 28.2777 24.3398 27.0665 21.9561L16.9215 1.99982ZM13.7427 8.75232C14.0743 8.75232 14.3922 8.88402 14.6266 9.11844C14.861 9.35286 14.9927 9.6708 14.9927 10.0023V16.2523C14.9927 16.5838 14.861 16.9018 14.6266 17.1362C14.3922 17.3706 14.0743 17.5023 13.7427 17.5023C13.4112 17.5023 13.0933 17.3706 12.8588 17.1362C12.6244 16.9018 12.4927 16.5838 12.4927 16.2523V10.0023C12.4927 9.6708 12.6244 9.35286 12.8588 9.11844C13.0933 8.88402 13.4112 8.75232 13.7427 8.75232ZM13.7427 19.3773C14.0743 19.3773 14.3922 19.509 14.6266 19.7434C14.861 19.9779 14.9927 20.2958 14.9927 20.6273V21.2523C14.9927 21.5838 14.861 21.9018 14.6266 22.1362C14.3922 22.3706 14.0743 22.5023 13.7427 22.5023C13.4112 22.5023 13.0933 22.3706 12.8588 22.1362C12.6244 21.9018 12.4927 21.5838 12.4927 21.2523V20.6273C12.4927 20.2958 12.6244 19.9779 12.8588 19.7434C13.0933 19.509 13.4112 19.3773 13.7427 19.3773Z" fill="#FFC700"/>
    </svg>
  </div>
);

const ReptokenRedemptionAlert = () => {
  const hasReptokensToRedeem = useApi(Crypto.api.hasReptokensToRedeem);
  const redeemReptokens = useApi(Crypto.api.redeemReptokens);
  const { address, isConnected } = useAccount();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    hasReptokensToRedeem.call();
  }, [redeemReptokens.res]);

  const redeemTokens = async () => {
    setButtonClicked(true);
    await redeemReptokens.call(address);
    hasReptokensToRedeem.call();
  };

  console.log({res: hasReptokensToRedeem.res > 0});

  let btnEnabled = isConnected ? ' ' : ' btn-disabled';
  const buttonText = buttonClicked ? 'Procesando' : 'Redimir';
  btnEnabled = buttonClicked ? ' btn-disabled' : ' '; 

  if (hasReptokensToRedeem.res && hasReptokensToRedeem.res > 0 ) {
    return (
      <div>
                <div className="alert alert-warning shadow-lg mb-8">
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <div className="flex flex-col">
          <span>You have {hasReptokensToRedeem.res} reptokens available for redemption.</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <button onClick={() => redeemTokens()} className={`btn btn-sm btn-primary w-full ${btnEnabled}`}>
          {buttonClicked && <PuffLoader size={30} color="#ffffff" />}
          {buttonText}
        </button>
        {
          !isConnected &&
                <article className="text-error text-center">
                You must connect a wallet to redeem
                </article>
        }
              
      </div>
    
    </div>
                
                
                <TokenBalance />

      </div>
      
    )
  } else {
    return <TokenBalance />;
  }
  
}

export const Dashboard = () => {


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
          
        <ReptokenRedemptionAlert />
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
