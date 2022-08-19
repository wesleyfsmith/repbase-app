import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { CogIcon } from '@heroicons/react/outline'

export const Dashboard = () => (
  <div>
    <Titlebar />
    <div className="container mx-auto px-3">
      <Navbar title="Hola Luis!" 
        iconRight={<CogIcon className="h-7 w-7 text-blue-500 mt-1 ml-auto"/>
        } />
      <TokenBalance />
    </div>
  </div>
);
