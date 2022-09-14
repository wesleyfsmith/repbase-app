import React from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { LogrosTable } from '../LogrosTable';

export const Inicio = () => {
  return (
    <div className="container max-w-3x1 mx-auto">
      <article className="prose prose-xl font-bold">
        TOP 10 EMPLEADOS DEL MES
      </article>
      <EmployeeTable />
      <div className="flex justify-end">
        <div className="form-control w-1/4">
          <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ver más</button>
        </div>
      </div>
      <article className="prose prose-xl font-bold">
        TOP 10 LOGROS DEL MES
      </article>
      <LogrosTable />
      <div className="flex justify-end">
        <div className="form-control w-1/4">
          <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ver más</button>
        </div>
      </div>
    </div>
  )
}