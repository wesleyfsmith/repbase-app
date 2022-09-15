import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Titlebar } from '../employee/components/Titlebar';

export const Sidebar = ({children}) => {
  var x = 2;
  console.log(children);
  let location = useLocation();
  console.log(location.pathname);
  const inicioSelected = location.pathname.includes('inicio') ? ' bg-primary text-white ' : ' ';
  const kpisSelected = location.pathname.includes('kpis') ? ' bg-primary text-white ' : ' ';
  const empleadosSelected = location.pathname.includes('empleados') ? ' bg-primary text-white ' : ' ';
  const logrosSelected = location.pathname.includes('logros') ? ' bg-primary text-white ' : ' ';
  const ajustesSelected = location.pathname.includes('ajustes') ? ' bg-primary text-white ' : ' ';
  return (
    <div className="h-full">
      <Titlebar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border border-l flex flex-col items-center justify-center px-4">
          {children}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
        </div> 
        <div></div>
        <div className="drawer-side dropshadow-lg ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="h-1">
            <div className="flex justify-center mt-8">
              <img className="object-none" src="/TulLogo.png"></img>
            </div>
            <article className="prose prose-xl text-primary text-center">
                ¡Hola TUL!
            </article>
          </div>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li className={`${inicioSelected} rounded-lg`}><Link to="/empresa/inicio">Inicio</Link></li>
            <li className={`${kpisSelected} rounded-lg`}><Link to="/empresa/kpis">KPIs</Link></li>
            <li className={`${empleadosSelected} rounded-lg`}><Link to="/empresa/empleados">Empleados</Link></li>
            <li className={`${logrosSelected} rounded-lg`}><Link to="/empresa/logros">Logros</Link></li>
            <li><a>Ajustes</a></li>
            <li><a>Salir</a></li>
          </ul>
  
        </div>
      </div>
    </div>
    
  );
};