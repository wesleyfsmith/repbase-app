import React from 'react';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';


const AttestationMedal = ({textColor, badgeIcon}) => {
  return (
    <div className="flex flex-col w-1/4 justify-center">
      <div className="flex justify-center">
        {badgeIcon}
      </div>
      <article className="prose prose-sm pt-1">
        <p className={`text-center text-${textColor}`}>
          KPI Bronce
        </p>
      </article>
      
    </div>
  )
}

export const AttestationsList = () => (
  <div>
    <div className="mx-auto">
      <div className="flex flex-row space-x-1 justify-evenly">
        <AttestationMedal badgeIcon={<KpiBronce />} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiPlata/>} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiOro/>} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'white'}/>
      </div>
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal badgeIcon={<KpiBronce3x/>} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiPlata3x/>} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiOro3x/>} textColor={'white'}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'white'}/>
      </div>
    </div>
  </div>
);
