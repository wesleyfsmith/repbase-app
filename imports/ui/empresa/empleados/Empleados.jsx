import React from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { Sidebar } from '../Sidebar';

export const Empleados = () => {
  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto">
      <article className="prose prose-xl font-bold">
        EMPLEADOS
      </article>
      <EmployeeTable />
    </div>
    </Sidebar>
  )
}