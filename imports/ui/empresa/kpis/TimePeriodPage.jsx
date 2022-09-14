import React from 'react';
import { EmployeeTable } from '../EmployeeTable';

export const TimePeriodPage = () => {
  return (
    <div className="container max-w-3x1 mx-auto">
      <article className="prose prose-xl font-bold">
       KPIs de periodo actual (Septiembre 1 - Septiembre 15, 2022)
      </article>
      <EmployeeTable />
    </div>
  )
}  