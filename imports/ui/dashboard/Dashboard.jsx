import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { CogIcon } from '@heroicons/react/outline'
import { AttestationsList } from '../attestations/AttestationsList';
import { Link } from 'react-router-dom';

export const Dashboard = () => (
  <div className="h-max">
    <Titlebar />
    <div className="mx-auto px-3">
      <Navbar title="Hola Luis!" 
        iconRight={
          <Link to="/settings">
            <CogIcon className="h-7 w-7 text-blue-500 mt-1 ml-auto"/>
          </Link>
        } noCenterTitle={true} />
      
    </div>
    <div className="m-4">
      <TokenBalance />
    </div>
    
      
    <div className="p-4 mt-4 bg-neutral">
      <article className="prose prose-xl">
        <p className="font-bold text-white">Colección de logros</p>
      </article>
        <div className="mt-4">
          <AttestationsList />
        </div>
        
        <div className="form-control">
          <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ver Logros</button>
        </div>
    </div>
  </div>
);
