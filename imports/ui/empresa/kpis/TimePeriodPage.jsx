import React, { useEffect, useState } from 'react';
import { EmployeeTable } from '../EmployeeTable';
import { Companies } from '../../../api/companies/companies-module';
import { useApi } from '/imports/api/utils/client-utils';
import { Sidebar } from '../Sidebar';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/outline';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Link, useParams } from 'react-router-dom';
import { TimePeriods } from '../../../api/timeperiods/timeperiods-module';
import { Attestations } from '../../../api/attestations/attestations-module';

const endDateString = (period) => {
  const value = period.end_date ? period.end_date.toDateString() : new Date().toDateString();
  return value;
};

const ConfirmationModal = ({finalizePeriod}) => {
  return (
    <div>
      {/* <label htmlFor="my-modal-3" className="btn modal-button">open modal</label> */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="m-4 mx-auto ">
            <article className="prose font-bold text-center text-2xl mb-2 ">
          ¡ADVERTENCIA!
            </article>
            <div className="flex flex-col w-full">
              <article className="prose w-full mb-2 text-center">
                Vas a finalizar el cumplimiento de KPIs para el periodo de Septiembre 1 - Septiembre 15, 2022.
              </article>
              <article className="prose mb-2 text-center">
                Este cambio afectará el historial de los empleados y les emitirá tokens de tu tesorerería según su desempeño. 
              </article>
              <article className="prose mb-2 text-center">
                Podrás cambiar el cumplimiento de estos KPIs posteriormente, pero los tokens emitidos no pueden ser reembolsados.
              </article>
              <article className="prose mb-2 text-center">
                Antes de continuar, asegúrate de que el cumplimiento de KPIs es verdadero y poco probable que cambie.
              </article>
              <article className="prose mb-2 text-center">
                Tomando lo anterior en cuenta, ¿quieres confirmar este periodo?
              </article>
            </div>
          </div>
            
          <div className="flex max-w-5xl">
            <button onClick={finalizePeriod} className="btn btn-primary w-full mr-2">Confirmar</button>
            {/* <div className="modal-action">
              <a href="#" className="btn btn-primary w-1/2 btn-outline">Cancelar</a>

            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiField = ({employeeId, kpiValue, canEdit}) => {
  const updateAttestationForUser = useApi(Attestations.api.updateAttestationForUser);
  const [showEditField, setShowEditField] = useState(false);
  const [kpiAmount, setKpiAmount] = useState(kpiValue !== '--' ? kpiValue : '');
  
  const submitUpdatedAttestations = async () => {
    //TODO check kpi amount is a number
    await updateAttestationForUser.call({userId: employeeId, kpiPercentage: kpiAmount});
    setShowEditField(false);
  };

  return (
    <div className="flex justify-between">
      {
        showEditField &&
        <div className="flex">
          <input onChange={(e) => setKpiAmount(e.target.value)} type="text" placeholder="Type here" value={kpiAmount} className="input input-bordered w-full max-w-xs" />
          <DocumentAddIcon onClick={submitUpdatedAttestations} className="h-8 text-primary ml-1 my-auto" />
        </div>
      }
      {
        !showEditField &&
        <article className="prose w-full text-center">{kpiAmount === '' ? kpiValue : kpiAmount}</article>
      }
      {canEdit && !showEditField && <PencilIcon onClick={() => setShowEditField(true)} className="h-8 text-primary"/>}
    </div>
  );
};

const EmployeeKpiTable = ({employees, isActivePeriod}) => {
  
  const rows = [];
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    rows.push(<tr key={i}>
      <th>{`${i + 1}`}</th>
      <td>{employee.employee_profile.names}</td>
      <td>{employee.employee_profile.company_email}</td>
      <td>{employee.employee_profile.company_sector}</td>
      <td>
        {/* <div className="flex justify-between">
          <article className="prose w-full text-center">{employee.registeredKpi}</article>
          {isActivePeriod && <PencilIcon className="h-7 text-primary"/>}
        </div> */}
        <KpiField employeeId={employee._id} kpiValue={employee.registeredKpi} canEdit={isActivePeriod} />
      </td>
    </tr>);
  }

  return (
    <div className="overflow-x-auto drop-shadow-md">
      <table className="table w-full ">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Area</th>
            <th>Cumplimiento de KPI </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export const TimePeriodPage = () => {
  let { id } = useParams();
  const getPeriod = useApi(TimePeriods.api.getPeriod);
  const endPeriod = useApi(TimePeriods.api.endPeriod);
  const getEmployeesForCurrentKpi = useApi(Companies.api.getEmployeesKpisForPeriod);
  useEffect(() => {
    getPeriod.call(id);
    getEmployeesForCurrentKpi.call(id);
  }, [endPeriod.callCount]);
  const finalizePeriod = () => {
    endPeriod.call();
  };
  return (
    <div>
      <ConfirmationModal finalizePeriod={finalizePeriod} />
      <Sidebar>
        <div className="container max-w-3x1 mx-auto h-full">
          <div className="flex w-full justify-between">
          
            <div className="flex">
              <div className="flex flex-col justify-center">
                <Link to="/empresa/kpis">
                  <ArrowLeftIcon className="w-8"/>
                </Link>
              </div>
              { getPeriod.res && getPeriod.res.isCurrentPeriod ? 
                <article className='prose font-bold prose-xl mx-4'>
                  EDITAR KPIs
                </article> :
                <article className='prose font-bold prose-xl mx-4'>
                  KPIs
                </article>
              }
              {
                getPeriod.res &&
                <article className="prose prose-xl">
                  {` > de periodo actual (${getPeriod.res.start_date.toDateString()} - ${endDateString(getPeriod.res)})`}
                </article>
              }
            </div>
              { getPeriod.res && getPeriod.res.isCurrentPeriod &&
                 <div className="flex justify-end">
                 <label htmlFor="my-modal-3" className="btn btn-primary w-full modal-button">Finalizar Periodo</label>        
               </div>
              }
           
          </div>
          {
            getPeriod.res && getPeriod.res.isCurrentPeriod &&
            <article className='prose mb-4'>
              Selecciona el KPI que deseas editar.
            </article> 
          }
          
          {
            getEmployeesForCurrentKpi.res &&
          <EmployeeKpiTable employees={getEmployeesForCurrentKpi.res} isActivePeriod={getPeriod.res.isCurrentPeriod} />
          }
        </div>  
      </Sidebar>
    
    </div>
    
  );
};  