import React, { useEffect } from 'react';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';
import { BestKpiMonth } from '../assets/BestKpiMonth';
import { BestKpiTrimestre } from '../assets/BestKpiTrimestre';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { AttestationMedal } from './AttestationsList';
import { FooterWhite } from '../footer/FooterWhite';
import { Link } from 'react-router-dom';
import { Attestations } from '../../../api/attestations/attestations-module';
import { useApi } from '/imports/api/utils/client-utils';

const MedalWithCounter = ({shouldRender, isGrayedOut, count}) => {
  return (
    null
  );
};

const CompletedAttestationsWithCounters = () => {
  const getAttestationCountsForUser = useApi(Attestations.api.getAttestationCountsForUser);
  useEffect(() => {
    getAttestationCountsForUser.call(Meteor.userId());
  }, []);
  

  const hasMedal = (badgeName) => {
    let result = false;
    getAttestationCountsForUser.res.forEach((badge) => {
      if (badge.name === badgeName && badge.attestationCount > 0) {
        result = true;
      } 
    });
    return result;
  };

  const medalCount = (badgeName) => {
    let result = 0;
    getAttestationCountsForUser.res.forEach((badge) => {
      if (badge.name === badgeName && badge.attestationCount > 0) {
        result = badge.attestationCount;
      } 
    });
    return result;
  };

  //TODO calculate if they've recieved any attestations
  if (!getAttestationCountsForUser.res) {
    return (
      <article className="prose pl-4">
        No has completado ningún logro
      </article>);
  }

  return (
    <div>
      {
        getAttestationCountsForUser.res &&
      <div className="mx-2">
        <div className="flex flex-row space-x-1 justify-evenly pt-2">
          { hasMedal('Bronce') &&
            <AttestationMedal counter={medalCount('Bronce')} width={70} height={70} to="/attestation/bronce" badgeIcon={<KpiBronce />} textColor={'black'} title={'KPI Bronce'} grayedOut={false}/>
          }
          { hasMedal('Plata') &&
            <AttestationMedal counter={medalCount('Plata')} to="/attestation/plata" badgeIcon={<KpiPlata/>} textColor={'black'} title={'KPI Plata'} grayedOut={false}/>
          }
          { hasMedal('Oro') &&

          <AttestationMedal counter={medalCount('Oro')} to="/attestation/oro" badgeIcon={<KpiOro/>} textColor={'black'} title={'KPI Oro'} grayedOut={false}/>
          }
          { hasMedal('Platino') &&

          <AttestationMedal counter={medalCount('Platino')} counter={5} to="/attestation/platino" badgeIcon={<KpiPlatino/>} textColor={'black'} title={'KPI Platino'} grayedOut={false}/>
          }
        </div>
        <div className="flex flex-row space-x-1 justify-evenly pt-2">
          { hasMedal('Bronce 3X') &&

          <AttestationMedal counter={medalCount('Bronce 3X')} to="/attestation/3xbronce" badgeIcon={<KpiBronce3x/>} textColor={'black'} title={'3X KPI\nBronce'} grayedOut={false}/>
          }
          { hasMedal('Plata 3X') &&

          <AttestationMedal counter={medalCount('Plata 3X')} to="/attestation/3xplata" badgeIcon={<KpiPlata3x/>} textColor={'black'} title={'3X KPI\nPlata'} grayedOut={false}/>
          }
          { hasMedal('Oro 3X') &&

          <AttestationMedal counter={medalCount('Oro 3X')} to="/attestation/3xoro" badgeIcon={<KpiOro3x/>} textColor={'black'} title={'3X KPI\nOro'} grayedOut={false}/>
          }
          { hasMedal('Platino 3X') &&

          <AttestationMedal counter={medalCount('Platino 3X')} to="/attestation/3xplatino"badgeIcon={<KpiPlatino3x/>} textColor={'black'} title={'3X KPI\nPlatino'} grayedOut={false}/>
          }
        </div>
        {/* <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal to="/attestation/kpimes" badgeIcon={<BestKpiMonth/>} textColor={'black'} title={`Mejor KPI\nMes`} grayedOut={true}/>
        <AttestationMedal to="/attestation/kpitrimestre" badgeIcon={<BestKpiTrimestre/>} textColor={'black'} title={`Mejor KPI\nTrimestre`} grayedOut={true}/>
      </div> */}
      </div>
      }
    </div>
  );
};

const LogrosIncompleted = () => {
  const getAttestationCountsForUser = useApi(Attestations.api.getAttestationCountsForUser);
  useEffect(() => {
    getAttestationCountsForUser.call(Meteor.userId());
  }, []);

  const hasMedal = (badgeName) => {
    let result = false;
    getAttestationCountsForUser.res.forEach((badge) => {
      if (badge.name === badgeName && badge.attestationCount > 0) {
        result = true;
      } 
    });
    return result;
  };

  console.log({res: getAttestationCountsForUser.res});

  return (
    <div>
      {
        getAttestationCountsForUser.res &&
      <div className="mx-2">
        <div className="flex flex-row space-x-1 justify-evenly pt-2">
          { !hasMedal('Bronce') &&
            <AttestationMedal to="/attestation/bronce" badgeIcon={<KpiBronce />} textColor={'black'} title={'KPI Bronce'} grayedOut={true}/>
          }
          { !hasMedal('Plata') &&
            <AttestationMedal to="/attestation/plata" badgeIcon={<KpiPlata/>} textColor={'black'} title={'KPI Plata'} grayedOut={true}/>
          }
          { !hasMedal('Oro') &&

          <AttestationMedal to="/attestation/oro" badgeIcon={<KpiOro/>} textColor={'black'} title={'KPI Oro'} grayedOut={true}/>
          }
          { !hasMedal('Platino') &&

          <AttestationMedal to="/attestation/platino" badgeIcon={<KpiPlatino/>} textColor={'black'} title={'KPI Platino'} grayedOut={true}/>
          }
        </div>
        <div className="flex flex-row space-x-1 justify-evenly pt-2">
          { !hasMedal('Bronce 3X') &&

          <AttestationMedal to="/attestation/3xbronce" badgeIcon={<KpiBronce3x/>} textColor={'black'} title={'3X KPI\nBronce'} grayedOut={true}/>
          }
          { !hasMedal('Plata 3X') &&

          <AttestationMedal to="/attestation/3xplata" badgeIcon={<KpiPlata3x/>} textColor={'black'} title={'3X KPI\nPlata'} grayedOut={true}/>
          }
          { !hasMedal('Oro 3X') &&

          <AttestationMedal to="/attestation/3xoro" badgeIcon={<KpiOro3x/>} textColor={'black'} title={'3X KPI\nOro'} grayedOut={true}/>
          }
          { !hasMedal('Platino 3X') &&

          <AttestationMedal to="/attestation/3xplatino"badgeIcon={<KpiPlatino3x/>} textColor={'black'} title={'3X KPI\nPlatino'} grayedOut={true}/>
          }
        </div>
        {/* <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal to="/attestation/kpimes" badgeIcon={<BestKpiMonth/>} textColor={'black'} title={`Mejor KPI\nMes`} grayedOut={true}/>
        <AttestationMedal to="/attestation/kpitrimestre" badgeIcon={<BestKpiTrimestre/>} textColor={'black'} title={`Mejor KPI\nTrimestre`} grayedOut={true}/>
      </div> */}
      </div>
      }
    </div>
  );
};

export const AttestationsCount = () => (
  <div className="h-screen">
    <Titlebar />
    <Navbar showBackButton title="MIS LOGROS" />
    <article className="prose font-bold prose-xl m-4">
      Logros cumplidos
    </article>
    <CompletedAttestationsWithCounters />
    <article className="prose font-bold prose-xl m-4">
      Logros por cumplir
    </article>
    <LogrosIncompleted />

    <FooterWhite />
  </div>
);
