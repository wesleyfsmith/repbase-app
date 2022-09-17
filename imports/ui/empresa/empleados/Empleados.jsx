import React, { useEffect } from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { Sidebar } from '../Sidebar';
import { useApi } from '/imports/api/utils/client-utils';
import { Companies } from '../../../api/companies/companies-module';

export const Empleados = () => {
  const getEmployees = useApi(Companies.api.getAllEmployees);
  useEffect(() => {
    getEmployees.call();
  }, []);
  return (
    <Sidebar>
      {/* <Titlebar /> */}
      <div className="container max-w-3x1 mx-auto h-full">
        <article className="prose prose-xl font-bold">
        EMPLEADOS
        </article>
        {
          getEmployees.res &&
          <EmployeeTable employees={getEmployees.res} />
        }
      </div>
    </Sidebar>
  );
};