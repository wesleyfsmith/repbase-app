import React from 'react';
import { PeriodTable } from './PeriodTable';
import { Sidebar } from '../Sidebar';

export const Kpis = () => {
  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto">
      <article className="prose prose-xl font-bold">
        EDITAR KPIs
      </article>
      <article className="prose">
        Elige el periodo donde quieres editar los KPIs de tus empleados.
      </article>
      <div className="bg-primary rounded-lg my-2">
        <article className="prose text-white p-6">
          Periodo actual: Septiembre 1 - Septiembre 15, 2022 
        </article>
      </div>
      <article className="prose prose-xl font-bold">
      Periodos anteriores
      </article>
      <PeriodTable />
    </div>
    </Sidebar>
    
  )
}