import React, { useEffect } from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { MedalOro } from '../assets/MedalOro';
import { MedalBronce } from '../assets/MedalBronce';
import { MedalPlata } from '../assets/MedalPlata';
import { MedalPlatino } from '../assets/MedalPlatino';
import { MedalBronce3x } from '../assets/MedalBronce3x';
import { MedalPlata3x } from '../assets/MedalPlata3x';
import { MedalPlatino3x } from '../assets/MedalPlatino3x';
import { MedalTrimestre }from '../assets/MedalTrimestre';
import { MedalOro3x } from '../assets/MedalOro3x';

import { MedalMes }from '../assets/MedalMes';
import { useApi } from '/imports/api/utils/client-utils';
import { Attestations } from '../../../api/attestations/attestations-module';
import { HistoricalAttestations } from './HistoricalAttestations';
import { useParams } from 'react-router-dom';


const BlueLineSeparator = () => (
  <div className="w-9/10 border-b border-primary mr-2 pt-1 pb-1"></div>
);

const VerticalAward = ({medal, statistics}) => (
  <div className="flex bg-neutral mx-5  rounded-lg">
    <div className="w-1/2 flex flex-col justify-center">
      {medal}
      {/* 
        <div style={{transform: 'scale(1.3) rotate(0.25turn)'}}>
        </div> */}
    </div>
    <div className="w-1/2 px-8">
      <article className="prose pt-1">
        <p className="text-white text-center whitespace-pre">{`${statistics.veces} veces\nlo lograste`}</p>
      </article>
      <BlueLineSeparator />
       
      <article className="prose pt-1">
        <p className="text-white text-center whitespace-pre">{`${statistics.enEmpresa} en Tul\nlo tienen`}</p>
      </article>
      <BlueLineSeparator />
      <article className="prose pt-1"> 
        <p className="text-white text-center whitespace-pre">{`${statistics.enArea} en tu\nárea lo tienen`}</p>
      </article>
      <BlueLineSeparator />
      <article className="prose pt-1">
        <p className="text-white text-center whitespace-pre">{`${statistics.enTotal} en total\nlo tienen`}</p>
      </article>
      <BlueLineSeparator />
    </div>
  </div>
);

const HorizontalAward = ({medal, statistics}) => (
  <div className="bg-neutral mx-5  rounded-lg">
    <div className="flex flex-row w-full justify-center">
      {medal}
      {/* 
        <div style={{transform: 'scale(1.3) rotate(0.25turn)'}}>
        </div> */}
    </div>
    <div className="px-1 grid grid-cols-4 divide-primary divide-x text-center pb-4">
      <div>
        <article className="font-bold text-center text-white">
        statistics.veces
        </article>
        <article className="prose prose-sm text-white text-center whitespace-pre">
          {'veces\nlo lograste'}
        </article>
      </div>
      <div>
        <article className="font-bold text-center text-white">
        statistics.enEmpresa
        </article>
        <article className="prose prose-sm text-white text-center whitespace-pre">
          {'en Tul\nlo tienen'}
        </article>
      </div>
      <div>
        <article className="font-bold text-center text-white">
        statistics.enArea
        </article>
        <article className="prose prose-sm text-white text-center whitespace-pre"> 
          {'del área\nlo tienen'}
        </article>
      </div>
      <div>
        <article className="font-bold text-center text-white">
        statistics.enTotal
        </article>
        <article className="prose prose-sm text-white text-center whitespace-pre">
          {'en total\nlo tienen'}
        </article>
      </div>
       
        
      {/* <BlueLineSeparator /> */}
        
      {/* <BlueLineSeparator /> */}
        
      {/* <BlueLineSeparator /> */}
    </div>
  </div>
);

const mapUrlToName = {
  'bronce': 'Bronce',
  'plata': 'Plata',
  'oro': 'Oro',
  'platino': 'Platino',
  '3xbronce': 'Bronce 3X',
  '3xplata': 'Plata 3X',
  '3xoro': 'Oro 3X',
  '3xplatino': 'Platino 3X'
};

export const KpiAttestation = () => {
  let { rewardType } = useParams();

  //you arent supposed to mutate probs technical but it's my app and i'll do what I want
  rewardType = rewardType.toLowerCase();

  const getBadgeStatisticsForUser = useApi(Attestations.api.getBadgeStatisticsForUser);

  useEffect(() => {
    getBadgeStatisticsForUser.call({userId: Meteor.userId(), badgeName: mapUrlToName[rewardType]});
  }, []);

  
  let title = '';
  let awardIcon = null;
  if (rewardType === '3xbronce') {
    title = '3X KPI Bronce';
    awardIcon = <MedalBronce3x/>;
  }
  if (rewardType === '3xplata') {
    title = '3X KPI Plata';
    awardIcon = <MedalPlata3x/>;
  }
  if (rewardType === '3xoro') {
    title = '3X KPI Oro';
    awardIcon = <MedalOro3x/>;
  }
  if (rewardType === '3xplatino') {
    title = '3X KPI Platino';
    awardIcon = <MedalPlatino3x/>;
  }

  if (rewardType === 'bronce') {
    title = 'KPI Bronce';
    awardIcon = <MedalBronce/>;
  }
  if (rewardType === 'plata') {
    title = 'KPI Plata';
    awardIcon = <MedalPlata/>;
  }
  if (rewardType === 'oro') {
    title = 'KPI Oro';
    awardIcon = <MedalOro/>;
  }
  if (rewardType === 'platino') {
    title = 'KPI Platino';
    awardIcon = <MedalPlatino/>;
  }

  if (rewardType === 'kpimes') {
    title = 'Mejor Kpi Mes';
    awardIcon = <MedalMes/>;
  }
  if (rewardType === 'kpitrimestre') {
    title = 'Mejor Kpi Trimestre';
    awardIcon = <MedalTrimestre/>;
  }
  return (
    <div className="h-max">
      <Titlebar />
      <div className="container mx-auto px-3">
        <Navbar showBackButton title={title.toUpperCase()} />
      </div>
      {getBadgeStatisticsForUser.res &&
        <div>
          {rewardType.includes('3x') ? 
            <HorizontalAward medal={awardIcon} statistics={getBadgeStatisticsForUser.res} />
            :
            <VerticalAward medal={awardIcon} statistics={getBadgeStatisticsForUser.res} />
          }
        </div>
      }
      
    
      <div className="bg-gray-100 mt-8 mx-5 rounded-lg p-4 flex divide-x divide-primary">
        <div className="w-4/5">
          <article className="prose pt-1">
            <p className="whitespace-pre text-black">{'RepTokens que recibes cada\nvez que cumples este logro'}</p>
          </article>
        </div>
        <article className="w-1/5 prose pt-1 prose-xl pl-1 align-middle">
          {
            getBadgeStatisticsForUser.res &&
            <p className="text-black text-center text-bold pt-2">{getBadgeStatisticsForUser.res.reward}</p>
          }
          
        </article>
      </div>

      <div className="p-4">
        <article className="prose prose-xl">
          <p className="font-bold">Descripción:</p>
        </article>
        <article className="prose"> 
          <p>Este logro es otorgado a quienes logren cumplir su KPI por encima del 100%.</p> 
          <p>Es una muestra de compromiso, dedicación y profesionalismo.</p>
          <p>Haces más de lo que te piden, es decir que literalmente no te pueden pedir mejores resultados.</p>
        </article>
      </div>

      <HistoricalAttestations medalIcon={awardIcon} badgeName={mapUrlToName[rewardType]} />

    </div>
  ); 
}; 
