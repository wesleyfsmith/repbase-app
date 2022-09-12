import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Titlebar } from '../employee/components/Titlebar';

export const Sidebar = () => {
  return (
    <div className="h-full">
      <Titlebar />
        <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content border border-l flex flex-col items-center justify-center">

    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side dropshadow-lg ">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
    <div>
      <div className="flex justify-center mt-8">
        <img className="object-none" src="TulLogo.png"></img>
      </div>
      <article className="prose prose-xl text-primary text-center">
        ¡Hola TUL!
      </article>
    </div>
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li className="bg-gray-400 rounded-lg"><a className="text-white">Inicio</a></li>
      <li><a>KPIs</a></li>
      <li><a>Empleados</a></li>
      <li><a>Logros</a></li>
      <li><a>Ajustes</a></li>
      <li><a>Salir</a></li>
    </ul>
  
  </div>
</div>
    </div>
    
  )
}