import React from 'react';
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
import { Navbar } from '../components/Navbar'
import { AttestationMedal } from './AttestationsList';
import { FooterWhite } from '../footer/FooterWhite';
import { Link } from 'react-router-dom';

export const AttestationsCount = () => (
  <div className="h-screen">
    <Titlebar />
    <Navbar showBackButton title="MIS LOGROS" />
    <article className="prose font-bold prose-xl m-4">
      Logros cumplidos
    </article>
    <article className="prose pl-4">
      No has completado ningún logro
    </article>
    <article className="prose font-bold prose-xl m-4">
      Logros por cumplir
    </article>
    <div className="mx-2">
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal to="/attestation/bronce" badgeIcon={<KpiBronce />} textColor={'black'} title={`KPI Bronce`} grayedOut={true}/>
        <AttestationMedal to="/attestation/plata" badgeIcon={<KpiPlata/>} textColor={'black'} title={`KPI Plata`} grayedOut={true}/>
        <AttestationMedal to="/attestation/oro" badgeIcon={<KpiOro/>} textColor={'black'} title={`KPI Oro`} grayedOut={true}/>
        <AttestationMedal to="/attestation/platino" badgeIcon={<KpiPlatino/>} textColor={'black'} title={`KPI Platino`} grayedOut={true}/>
      </div>
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal to="/attestation/3xbronce" badgeIcon={<KpiBronce3x/>} textColor={'black'} title={`3X KPI\nBronce`} grayedOut={true}/>
        <AttestationMedal to="/attestation/3xplata" badgeIcon={<KpiPlata3x/>} textColor={'black'} title={`3X KPI\nPlata`} grayedOut={true}/>
        <AttestationMedal to="/attestation/3xoro" badgeIcon={<KpiOro3x/>} textColor={'black'} title={`3X KPI\nOro`} grayedOut={true}/>
        <AttestationMedal to="/attestation/3xplatino"badgeIcon={<KpiPlatino3x/>} textColor={'black'} title={`3X KPI\nPlatino`} grayedOut={true}/>
      </div> 
      <div className="flex flex-row space-x-1 justify-evenly pt-2">
        <AttestationMedal to="/attestation/kpimes" badgeIcon={<BestKpiMonth/>} textColor={'black'} title={`Mejor KPI\nMes`} grayedOut={true}/>
        <AttestationMedal to="/attestation/kpitrimestre" badgeIcon={<BestKpiTrimestre/>} textColor={'black'} title={`Mejor KPI\nTrimestre`} grayedOut={true}/>
      </div>
    </div>

    <FooterWhite />
  </div>
);
