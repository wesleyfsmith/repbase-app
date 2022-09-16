import React from 'react';

export const PeriodTable = ({timeperiods}) => {
  const rows = [];
  for (let i = 0; i < timeperiods.length; i++) {
    const timeperiod = timeperiods[i];
    const endDateString = timeperiod.end_date === 'N/A' ? 'N/A' : timeperiod.end_date.toDateString();
    rows.push(<tr>
      <th>{`${i}`}</th>
      <td>{`${timeperiod.start_date.toDateString()} - ${endDateString}`}</td>
      <td>{timeperiod.attestationCount}</td>
      <td>{100}</td>
      <td>{'Details'}</td>
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