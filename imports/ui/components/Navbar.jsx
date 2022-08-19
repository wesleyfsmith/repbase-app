import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { CogIcon } from '@heroicons/react/outline'

export const Navbar = ({title, showBackButton, iconRight}) => (
  <div className="flex h-full flex-row py-2">
    {showBackButton &&
      <ArrowLeftIcon className="h-7 w-7 text-blue-500 mt-1"/>
    }
    
    <article className="prose prose-xl pl-2 ">
      <p className="font-bold text-primary">{title}</p>
    </article>
    {
      iconRight
    }
  </div>
);
