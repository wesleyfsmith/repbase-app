import React from 'react';

export const LogrosTable = ({attestations}) => {
  console.log({attestations});
  const rows = [];
  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i];
    rows.push(<tr>
      <th>{`${i}`}</th>
      <td>{attestation.name}</td>
      <td>{attestation.attestationCount}</td>
      <td>{attestation.tokens}</td>
    </tr>);
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
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