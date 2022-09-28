import React, { useEffect } from 'react';
import { PeriodTable } from './PeriodTable';
import { Sidebar } from '../Sidebar';
import { useApi } from '/imports/api/utils/client-utils';
import { TimePeriods } from '/imports/api/timeperiods/timeperiods-module';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const getMostRecentTimePeriod = (timeperiods) => {
  let maxTimePeriod = {instance: -1};
  for (let i = 0; i < timeperiods.length; i++) {
    if (timeperiods[i].instance > maxTimePeriod.instance) {
      maxTimePeriod = timeperiods[i];
    }
  }
  return maxTimePeriod;
};

export const Kpis = () => {
  const getTimePeriods = useApi(TimePeriods.api.getAllPeriods);
  useEffect(() => {
    getTimePeriods.call();
  }, []);
  
  if (getTimePeriods.res) {
    console.log({res: getMostRecentTimePeriod(getTimePeriods.res)});
  }
  

  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto h-full">
        <article className="prose prose-xl font-bold">
        EDITAR KPIs
        </article>
        <article className="prose">
        Elige el periodo donde quieres editar los KPIs de tus empleados.
        </article>
        {
          getTimePeriods.res &&
          <div className="from-primary to-neutral bg-gradient-to-r rounded-lg my-2 flex justify-between">
            <article className="prose text-white p-6">
              {`Periodo actual: ${getMostRecentTimePeriod(getTimePeriods.res).start_date.toDateString()} - ${new Date().toDateString()}`} 
            </article>
            <div className="flex flex-col justify-center pr-4">
              <Link to={`/empresa/kpis/timeperiod/${getMostRecentTimePeriod(getTimePeriods.res)._id}`}>
                <div className="w-12"><ArrowCircleRightIcon style={{strokeWidth: 1}} className="text-white" /></div>
              </Link>
              
            </div>
            
          </div>
        }
        
        <article className="prose prose-xl font-bold">
          Periodos anteriores
        </article>
        {
          getTimePeriods.res &&
          <PeriodTable timeperiods={getTimePeriods.res.slice(1, getTimePeriods.res.length)}/>
        }
        
      </div>
    </Sidebar>
  );
};