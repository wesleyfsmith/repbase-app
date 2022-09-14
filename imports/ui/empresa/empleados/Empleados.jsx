import React from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { LogrosTable } from '../LogrosTable';

export const Empleados = () => {
  return (
    <div className="container max-w-3x1 mx-auto">
      <article className="prose prose-xl font-bold">
        EMPLEADOS
      </article>
      <EmployeeTable />
    </div>
  )
}