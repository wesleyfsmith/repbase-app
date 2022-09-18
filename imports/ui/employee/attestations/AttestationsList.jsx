import React, {useEffect} from 'react';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';
import { Link } from 'react-router-dom';
import { Attestations } from '../../../api/attestations/attestations-module';
import { useApi } from '/imports/api/utils/client-utils';

export const AttestationMedal = ({textColor, badgeIcon, title, grayedOut, to, counter}) => {
  const grayscale = grayedOut ? ' grayscale(90%) ' : ' ';
  const destination = to ? to : '';
  return (
    <Link to={destination} className="flex flex-col w-1/4 justify-center">
      {
        counter &&
        <article className="prose absolute text-primary font-bold rounded-full mb-16 w-7 bg-white text-xl text-center border-primary border-2" >{counter}</article>
      }
      <div className={'flex justify-center'} style={{filter: grayscale}}>
        {badgeIcon}
      </div>
      <article className={`whitespace-pre prose prose-sm pt-1 text-center text-${textColor}`}>
        {title}
      </article>
      
    </Link>
  );
};

export const AttestationsList = () => {
  const getAttestationCountsForUser = useApi(Attestations.api.getAttestationCountsForUser);
  useEffect(() => {
    getAttestationCountsForUser.call(Meteor.userId());
  }, []);
  const isGrayedOut = (badgeName) => {
    if (!getAttestationCountsForUser.res) {
      return false;
    }
    let result = true;
    getAttestationCountsForUser.res.forEach((badge) => {
      if (badge.name === badgeName && badge.attestationCount > 0) {
        result = false;
      } 
    });
    return result;
  };
  return (
    <div>
      <div className="mx-auto">
        <div className="flex flex-row space-x-1 justify-evenly">
          <AttestationMedal badgeIcon={<KpiBronce />} textColor={'white'} title={'KPI Bronce'} grayedOut={isGrayedOut('Bronce')}/>
          <AttestationMedal badgeIcon={<KpiPlata/>} textColor={'white'} title={'KPI Plata'} grayedOut={isGrayedOut('Oro')}/>
          <AttestationMedal badgeIcon={<KpiOro/>} textColor={'white'} title={'KPI Oro'} grayedOut={isGrayedOut('Plata')}/>
          <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'white'} title={'KPI Platino'} grayedOut={isGrayedOut('Platino')}/>
        </div>
        <div className="flex flex-row space-x-1 justify-evenly pt-2">
          <AttestationMedal badgeIcon={<KpiBronce3x/>} textColor={'white'} title={'3X KPI\nBronce'} grayedOut={isGrayedOut('Bronce 3X')}/>
          <AttestationMedal badgeIcon={<KpiPlata3x/>} textColor={'white'} title={'3X KPI\nPlata'} grayedOut={isGrayedOut('Bronce 3X')}/>
          <AttestationMedal badgeIcon={<KpiOro3x/>} textColor={'white'} title={'3X KPI\nOro'} grayedOut={isGrayedOut('Bronce 3X')}/>
          <AttestationMedal badgeIcon={<KpiPlatino3x/>} textColor={'white'} title={'3X KPI\nPlatino'} grayedOut={isGrayedOut('Bronce 3X')}/>
        </div>
      </div>
    </div>
  );};
