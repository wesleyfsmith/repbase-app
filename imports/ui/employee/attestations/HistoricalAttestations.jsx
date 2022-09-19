import React, { useEffect } from 'react';
import { useApi } from '/imports/api/utils/client-utils';
import { Attestations } from '../../../api/attestations/attestations-module';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';

const AttestationEvent = ({badgeName, kpiPercentage, startDate, endDate}) => {
  let icon = null;
  if (badgeName === 'Bronce') {
    icon = <KpiBronce />;
  }
  if (badgeName === 'Plata') {
    icon = <KpiPlata />;
  }
  if (badgeName === 'Oro') {
    icon = <KpiOro />;
  }
  if (badgeName === 'Platino') {
    icon = <KpiPlatino />;
  }
  if (badgeName === 'Bronce 3X') {
    icon = <KpiBronce3x />;
  }
  if (badgeName === 'Plata 3X') {
    icon = <KpiPlata3x />;
  }
  if (badgeName === 'Oro 3X') {
    icon = <KpiOro3x />;
  }
  if (badgeName === 'Platino 3X') {
    icon = <KpiPlatino3x />;
  }
  return (
    <div className="flex my-2">
      {icon}
      <article className="prose pl-2 text-white my-auto">
        {`Cumplimiento de ${kpiPercentage}%, entre ${startDate.toDateString()} y ${endDate.toDateString()}`} 
      </article>
    </div>
  );
};

export const HistoricalAttestations = ({badgeName, medalIcon}) => { 
  const getAttestionHistoryForUserAndBadge = useApi(Attestations.api.getAttestionHistoryForUserAndBadge);
  useEffect(() => {
    getAttestionHistoryForUserAndBadge.call({userId: Meteor.userId(), badgeName});
  }, []);
  console.log({res: getAttestionHistoryForUserAndBadge.res});

  let rows = [];
  if (!getAttestionHistoryForUserAndBadge.res || getAttestionHistoryForUserAndBadge.res.length === 0) {
    return (
      <div className="bg-neutral p-4">
        <article className="prose prose-xl">
          <p className="font-bold text-white">Historial de logros</p>
        </article>
        <article className="prose text-white py-8">
          <p>Aún no has cumplido este logro.</p>
          <p>¡Ánimo que te esperan recompensas!</p>
        </article>
      </div>
    );
  } else {
    getAttestionHistoryForUserAndBadge.res.forEach((attestationEvent, i) => {
      rows.push(
        <AttestationEvent badgeName={badgeName} key={i} kpiPercentage={attestationEvent.kpiPercentage} startDate={attestationEvent.startDate} endDate={attestationEvent.endDate} />
      );
    });
  }
  return (
    <div className="bg-neutral p-4">
      <article className="prose prose-xl">
        <p className="font-bold text-white">Historial de logros</p>
      </article>
      {rows}
    </div>
  );
};