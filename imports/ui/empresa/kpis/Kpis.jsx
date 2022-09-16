import React, { useEffect } from 'react';
import { PeriodTable } from './PeriodTable';
import { Sidebar } from '../Sidebar';
import { useApi } from '/imports/api/utils/client-utils';
import { TimePeriods } from '/imports/api/timeperiods/timeperiods-module';

const getMostRecentTimePeriod = (timeperiods) => {
  let maxTimePeriod = {instance: -1};
  console.log({timeperiods});
  for (let i = 0; i < timeperiods.length; i++) {
    if (timeperiods[i].instance > maxTimePeriod.instance) {
      maxTimePeriod = timeperiods[i];
    }
  }
  console.log({maxTimePeriod});
  return maxTimePeriod;
};

export const Kpis = () => {
  const getTimePeriods = useApi(TimePeriods.api.getAllPeriods);
  useEffect(() => {
    getTimePeriods.call();
  }, []);
  
  

  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto h-screen">
        <article className="prose prose-xl font-bold">
        EDITAR KPIs
        </article>
        <article className="prose">
        Elige el periodo donde quieres editar los KPIs de tus empleados.
        </article>
        {
          getTimePeriods.res &&
          <div className="from-primary to-neutral bg-gradient-to-r rounded-lg my-2">
            <article className="prose text-white p-6">
              {`Periodo actual: ${getMostRecentTimePeriod(getTimePeriods.res).start_date.toDateString()} - ${new Date().toDateString()}`} 
            </article>
          </div>
        }
        
        <article className="prose prose-xl font-bold">
          Periodos anteriores
        </article>
        {
          getTimePeriods.res &&
          <PeriodTable timeperiods={getTimePeriods.res}/>
        }
        
      </div>
    </Sidebar>
  );
};