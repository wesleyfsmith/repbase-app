import React from 'react';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';
import { Link } from 'react-router-dom';

export const AttestationMedal = ({textColor, badgeIcon, title, grayedOut, to}) => {
  const grayscale = grayedOut ? ' grayscale(90%) ' : ' ';
  const destination = to ? to : '';
  return (
    <Link to={destination} className="flex flex-col w-1/4 justify-center">
      <div className={`flex justify-center`} style={{filter: grayscale}}>
        {badgeIcon}
      </div>
      <article className={`whitespace-pre prose prose-sm pt-1 text-center text-${textColor}`}>
        {title}
      </article>
      
    </Link>
  )
}

export const AttestationsList = () => (
  <div>
    <div className="mx-auto">
      <div className="flex flex-row space-x-1 justify-evenly">
        <AttestationMedal badgeIcon={<KpiBronce />} textColor={'white'} title={`KPI Bronce`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiPlata/>} textColor={'white'} title={`KPI Plata`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiOro/>} textColor={'white'} title={`KPI Oro`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'white'} title={`KPI Platino`} grayedOut={true}/>
      </div>
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal badgeIcon={<KpiBronce3x/>} textColor={'white'} title={`3X KPI\nBronce`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiPlata3x/>} textColor={'white'} title={`3X KPI\nPlata`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiOro3x/>} textColor={'white'} title={`3X KPI\nOro`} grayedOut={true}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'white'} title={`3X KPI\nPlatino`} grayedOut={true}/>
      </div>
    </div>
  </div>
);
