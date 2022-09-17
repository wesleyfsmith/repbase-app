import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { CogIcon } from '@heroicons/react/outline';
import { AttestationsList } from '../attestations/AttestationsList';
import { Link } from 'react-router-dom';
import { FooterBlack } from '../footer/FooterBlack';

export const Dashboard = () => (
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
);
