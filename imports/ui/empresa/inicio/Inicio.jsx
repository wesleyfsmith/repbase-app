import React, { useEffect } from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { LogrosTable } from '../LogrosTable';
import { Sidebar } from '../Sidebar';
import { Companies } from '../../../api/companies/companies-module';
import { useApi } from '/imports/api/utils/client-utils';
import { Attestations } from '../../../api/attestations/attestations-module';
import { Link } from 'react-router-dom';

export const Inicio = () => {
  const getEmployees = useApi(Companies.api.getTop10Employees);
  const getTopAttestations = useApi(Attestations.api.getAttestationCountsForCurrentMonth); 
  useEffect(() => {
    getEmployees.call();
    getTopAttestations.call();
  }, []);

  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto h-full">
        <article className="prose prose-xl font-bold">
        TOP 10 EMPLEADOS DEL MES
        </article>
        {
          getEmployees.res &&
          <EmployeeTable employees={getEmployees.res} />
        }
        <div className="flex justify-end">
          <div className="form-control w-1/4">
            <Link to="/empresa/empleados">
              <button className="btn btn-primary mt-4 w-full">Ver más</button>
            </Link>
          </div>
        </div>
        <article className="prose prose-xl font-bold">
        TOP 10 LOGROS DEL MES
        </article>
        {
          getTopAttestations.res &&
          <LogrosTable attestations={getTopAttestations.res}/>
        }
        
        <div className="flex justify-end">
          <div className="form-control w-1/4">
            <Link to="/empresa/logros">
              <button className="btn btn-primary mt-4 w-full">Ver más</button>
            </Link>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};