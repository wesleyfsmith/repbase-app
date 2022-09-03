import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { CogIcon } from '@heroicons/react/outline'
import { AttestationsList } from '../attestations/AttestationsList';

export const Dashboard = () => (
  <div className="h-max">
    <Titlebar />
    <div className="mx-auto px-3">
      <Navbar title="Hola Luis!" 
        iconRight={<CogIcon className="h-7 w-7 text-blue-500 mt-1 ml-auto"/>
        } />
      
    </div>
    <TokenBalance />
      <div className="form-control">
       <button className="btn btn-primary mt-4">Usar Tokens</button>
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
