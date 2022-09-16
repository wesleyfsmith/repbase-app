import React, { useEffect } from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { LogrosTable } from '../LogrosTable';
import { Sidebar } from '../Sidebar';
import { Companies } from '../../../api/companies/companies-module';
import { useApi } from '/imports/api/utils/client-utils';


export const Inicio = () => {
  const getEmployees = useApi(Companies.api.getTop10Employees);
  useEffect(() => {
    getEmployees.call();
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
            <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ver más</button>
          </div>
        </div>
        <article className="prose prose-xl font-bold">
        TOP 10 LOGROS DEL MES
        </article>
        {/* <LogrosTable /> */}
        <div className="flex justify-end">
          <div className="form-control w-1/4">
            <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ver más</button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};