import React from 'react';
import { EyeIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';


export const PeriodTable = ({timeperiods}) => {
  const rows = [];
  for (let i = 0; i < timeperiods.length; i++) {
    const timeperiod = timeperiods[i];
    const endDateString = timeperiod.end_date === 'N/A' ? 'N/A' : timeperiod.end_date.toDateString();
    rows.push(<tr key={i}>
      <th>{`${i + 1}`}</th>
      <td>{`${timeperiod.start_date.toDateString()} - ${endDateString}`}</td>
      <td className="text-center">{timeperiod.attestationCount}</td>
      <td className="text-center">{100}</td>
      <td><div className="flex justify-center"><Link to={`/empresa/kpis/timeperiod/${timeperiod._id}`}><EyeIcon className="w-6 text-primary"/></Link></div></td>
    </tr>);
  }
  return (
    <div className="overflow-x-auto drop-shadow-lg">
      <table className="table w-full ">
        <thead>
          <tr>
            <th></th>
            <th>Periodo</th>
            <th># Logros</th>
            <th>Tokens causados</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};