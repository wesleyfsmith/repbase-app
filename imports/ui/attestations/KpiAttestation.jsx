import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { AttestationMedalLarge } from '../assets/AttestationMedal';

const BlueLineSeparator = () => (
  <div className="w-9/10 border-b border-primary mr-2 pt-1 pb-1"></div>
)

export const KpiAttestation = () => (
  <div className="h-max">
    <Titlebar />
    <div className="container mx-auto px-3">
      <Navbar showBackButton title="KPI ORO" />
    </div>
    <div className="flex bg-neutral mx-5  rounded-lg">
      <div className="w-1/2">
        <AttestationMedalLarge />
      </div>
      <div className="w-1/2 px-8">
        <article className="prose pt-1">
          <p className="text-white text-center whitespace-pre">{`15 veces\nlo lograste`}</p>
        </article>
        <BlueLineSeparator />
       
        <article className="prose pt-1">
          <p className="text-white text-center whitespace-pre">{`5% en Tul\nlo tienen`}</p>
        </article>
        <BlueLineSeparator />
        <article className="prose pt-1"> 
          <p className="text-white text-center whitespace-pre">{`0,1% en tu\nárea lo tienen`}</p>
        </article>
        <BlueLineSeparator />
        <article className="prose pt-1">
          <p className="text-white text-center whitespace-pre">{`5% en total\nlo tienen`}</p>
        </article>
        <BlueLineSeparator />
      </div>
    </div>

    <div className="bg-gray-100 mt-8 mx-5 rounded-lg p-4 flex divide-x divide-primary">
      <div className="w-4/5">
        <article className="prose pt-1">
            <p className="whitespace-pre text-black">{`RepTokens que recibes cada\nvez que cumples este logro`}</p>
        </article>
      </div>
      <article className="w-1/5 prose pt-1 prose-xl pl-1 align-middle">
        <p className="text-black text-center text-bold pt-2">{`100`}</p>
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

    <div className="bg-neutral p-4">
      <article className="prose prose-xl">
        <p className="font-bold text-white">Historial de logros</p>
      </article>
      <article className="prose text-white py-8">
        <p>Aún no has cumplido este logro.</p>
        <p>¡Ánimo que te esperan recompensas!</p>
      </article>
    </div>

  </div>
); 
