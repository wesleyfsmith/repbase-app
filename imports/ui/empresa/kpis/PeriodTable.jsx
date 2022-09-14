import React from 'react';

export const PeriodTable = () => {
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
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td>Red</td>
      </tr>
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
        <td>Red</td>
      </tr>
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}