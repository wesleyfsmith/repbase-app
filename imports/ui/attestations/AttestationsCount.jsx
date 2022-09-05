import React from 'react';
import { KpiBronce } from '../assets/KpiBronce';
import { KpiOro } from '../assets/KpiOro';
import { KpiPlata } from '../assets/KpiPlata';
import { KpiPlatino } from '../assets/KpiPlatino';
import { KpiBronce3x } from '../assets/KpiBronce3x';
import { KpiOro3x } from '../assets/KpiOro3x';
import { KpiPlata3x } from '../assets/KpiPlata3x';
import { KpiPlatino3x } from '../assets/KpiPlatino3x';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar'


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

export const AttestationsCount = () => (
  <div className="h-full">
    <Titlebar />
    <Navbar showBackButton title="Mis Logros" />
    <article className="prose font-bold prose-xl m-4">
      Logros cumplidos
    </article>
    <div className="mx-auto">
      <div className="flex flex-row space-x-1 justify-evenly">
        <AttestationMedal badgeIcon={<KpiBronce />} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlata/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiOro/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'black'}/>
      </div>
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal badgeIcon={<KpiBronce3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlata3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiOro3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'black'}/>
      </div> 
    </div>
    <article className="prose font-bold prose-xl m-4">
      Logros por cumplir
    </article>
    <div className="mx-auto">
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal badgeIcon={<KpiBronce3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlata3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiOro3x/>} textColor={'black'}/>
        <AttestationMedal badgeIcon={<KpiPlatino/>} textColor={'black'}/>
      </div> 
    </div>
  </div>
);
