import React from 'react';
import { KpiBronce } from '../employee/assets/KpiBronce';
import { KpiOro } from '../employee/assets/KpiOro';
import { KpiPlata } from '../employee/assets/KpiPlata';
import { KpiPlatino } from '../employee/assets/KpiPlatino';
import { KpiBronce3x } from '../employee/assets/KpiBronce3x';
import { KpiOro3x } from '../employee/assets/KpiOro3x';
import { KpiPlata3x } from '../employee/assets/KpiPlata3x';
import { KpiPlatino3x } from '../employee/assets/KpiPlatino3x';

const getBadgeIcon = (badge) => {
  let icon = null;
  if (badge.name === 'Bronce') {
    icon = <KpiBronce width={30} height={30} />;
  }
  if (badge.name === 'Oro') {
    icon = <KpiOro width={30} height={30} />;
  }
  if (badge.name === 'Plata') {
    icon = <KpiPlata width={30} height={30} />;
  }
  if (badge.name === 'Bronce 3X') {
    icon = <KpiBronce3x width={30} height={30} />;
  }
  if (badge.name === 'Oro 3X') {
    icon = <KpiOro3x width={30} height={30} />;
  }
  if (badge.name === 'Plata 3X') {
    icon = <KpiPlata3x width={30} height={30} />;
  }
  if (badge.name === 'Platino 3X') {
    icon = <KpiPlatino3x width={30} height={30} />;
  }
  if (badge.name === 'Platino') {
    icon = <KpiPlatino width={30} height={30} />;
  }
  return icon;
};

export const LogrosTable = ({attestations}) => {
  const rows = [];
  
  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i];
    const icon = getBadgeIcon(attestation);
    rows.push(<tr key={i}>
      <th>{`${i + 1}`}</th>
      <td>{icon}</td>
      <td>{attestation.name}</td>
      <td>{attestation.attestationCount}</td>
      <td>{attestation.tokens}</td>
    </tr>);
  }
  return (
    <div className="overflow-x-auto shadow-md">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Nombre</th>
            <th># De Logros</th>
            <th>TOKENS CAUSADOS</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};