import React from 'react';

export const EmployeeTable = ({employees}) => {
  
  const rows = [];
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    rows.push(<tr key={i}>
      <th>{`${i}`}</th>
      <td>{employee.employee_profile.names}</td>
      <td>{employee.employee_profile.company_email}</td>
      <td>{employee.employee_profile.company_sector}</td>
      <td>{employee.attestationCount}</td>
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
            <th># De Logros</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};