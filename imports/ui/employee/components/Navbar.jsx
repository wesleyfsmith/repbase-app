import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { CogIcon } from '@heroicons/react/outline'
import { useNavigate} from "react-router-dom";

export const Navbar = ({title, showBackButton, iconRight, noCenterTitle}) => {
  
  const shouldCenterTitle = noCenterTitle ? ' ' : 'justify-center';
  const navigate = useNavigate();
  return (
  <div className="flex flex-row py-2 mx-4">
    {showBackButton &&
      <ArrowLeftIcon onClick={() => navigate(-1)} className="h-7 w-7 text-blue-500 mt-1"/>
    }
    <div className={`flex ${shouldCenterTitle} w-full pr-7`}>
      <article className="prose prose-xl">
        <p className="font-bold text-primary">{title}</p>
      </article>
    </div>
    {
      iconRight
    }
  </div>
)};
