import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Titlebar } from '../employee/components/Titlebar';

export const Sidebar = ({children}) => {
  var x = 2;
  let location = useLocation();
  let navigate = useNavigate();
  const inicioSelected = location.pathname.includes('inicio') ? ' bg-primary text-white ' : ' ';
  const kpisSelected = location.pathname.includes('kpis') ? ' bg-primary text-white ' : ' ';
  const empleadosSelected = location.pathname.includes('empleados') ? ' bg-primary text-white ' : ' ';
  const logrosSelected = location.pathname.includes('logros') ? ' bg-primary text-white ' : ' ';
  const ajustesSelected = location.pathname.includes('ajustes') ? ' bg-primary text-white ' : ' ';
  const salir = () => {
    Meteor.logout();
    navigate('/empresa/login');
  };
  return (
    <div className="h-screen">
      <Titlebar />
      <div className="drawer drawer-mobile h-fit" style={{minHeight: '262px'}} >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border border-l p-16">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          
          {children}

        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <div className="h-1 mb-20">
              <div className="flex justify-center mt-8">
                <img className="object-none" src="/TulLogo.png"></img>
              </div>
              <article className="prose prose-xl text-primary font-bold text-center">
                ¡Hola TUL!
              </article>
            </div>
            <li className={`${inicioSelected} rounded-lg mt-20`}><Link to="/empresa/inicio">Inicio</Link></li>
            <li className={`${kpisSelected} rounded-lg`}><Link to="/empresa/kpis">KPIs</Link></li>
            <li className={`${empleadosSelected} rounded-lg`}><Link to="/empresa/empleados">Empleados</Link></li>
            <li className={`${logrosSelected} rounded-lg`}><Link to="/empresa/logros">Logros</Link></li>
            <li className={`${ajustesSelected} rounded-lg`}><Link to="/empresa/ajustes">Ajustes</Link></li>
            <li><a onClick={salir}>Salir</a></li>
          </ul>
  
        </div>
      </div>
    </div>
    
  );
};