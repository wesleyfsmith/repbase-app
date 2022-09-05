import React from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { TokenBalance } from '../reptokens/TokenBalance';
import { Link } from 'react-router-dom';

const ExchangeRate = () => (
  <div className="bg-neutral rounded-lg mx-4 p-1.5">
    <div className="bg-accent rounded-lg p-3 flex">
      <div className='w-1/3'>
        <article className="prose prose-xl text-white text-center">
          <p className="font-bold">1</p>
        </article>
        <article className="prose text-white text-center">
          <p>RepToken</p>
        </article>
      </div>
      <div className='w-1/3 text-white flex justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-14">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>

      </div>
      <div className='w-1/3'>
        <article className="prose prose-xl text-white text-center">
          <p className="font-bold">0,10</p>
        </article>
        <article className="prose text-white text-center">
          <p>USD$</p>
        </article>
      </div>
    </div>
  </div>
);

const TokenPriceSection = ({tokenName, rateCop, rateUsd}) => {
  let tokenElement = null;

  
  if (tokenName === 'none' && !window.criptoSelected) {
    tokenElement = (
      <Link to="/exchange/tokenselect">
        <span className="badge badge-neutral p-4">
            <article className="prose prose-xl text-white flex justify-end w-full">
            Seleccionar cripto
              </article>
            </span>
      </Link>
    )
  } 

  if (window.criptoSelected) {
    tokenElement = (
      <Link to="/exchange/tokenselect">
        <span className="badge badge-neutral p-4">
            <article className="prose prose-xl text-white flex justify-end w-full">
              {window.criptoSelected.toUpperCase()}
              </article>
            </span>
      </Link>
    )
  }
  
  if (tokenName === 'RepTokens') {
    tokenElement = (
      <span className="badge badge-primary p-4">
            <article className="prose prose-xl text-white flex justify-end w-full">
              <p>
                {tokenName}
              </p>
              </article>
            </span>
    )
  };


  return (
    <div className="bg-accent rounded-lg p-1 flex">
        <div className='w-1/2 flex flex-col justify-center pl-1'>
          {tokenElement}
        </div>
        <div className='w-1/2 text-white pr-2'>
          <article className="prose prose-xl text-white flex justify-end w-full">
            <p className="font-bold">{rateCop}</p>
          </article>
          <article className="prose text-white flex justify-end">
            <p>{`USD$ ${rateUsd}`}</p>
          </article> 
        </div>
      </div>
  )
}

const DownArrow = () => (
  <div className="w-1/6" style={{marginTop: '-24px', marginBottom: '-24px'}}>
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="13.5" fill="#545454" stroke="#333333" strokeWidth="3"/>
    <path d="M20 15.8333L15 20.8333L10 15.8333M15 20.1389V9.99998" stroke="#EDF5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  </div>
)

const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34783 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34783 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34783 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34783 0 10 0V0ZM11.4999 6.13956C12.2427 6.13956 12.8455 5.62388 12.8455 4.85965C12.8455 4.09542 12.2413 3.57974 11.4999 3.57974C10.7571 3.57974 10.1571 4.09542 10.1571 4.85965C10.1571 5.62388 10.7571 6.13956 11.4999 6.13956ZM11.7613 14.1776C11.7613 14.0247 11.8142 13.6276 11.7842 13.4019L10.61 14.7532C10.3671 15.0089 10.0629 15.1861 9.92001 15.1389C9.8552 15.1151 9.80104 15.0689 9.76726 15.0086C9.73348 14.9484 9.7223 14.8781 9.73573 14.8104L11.6927 8.62795C11.8527 7.84372 11.4128 7.12806 10.48 7.03664C9.49575 7.03664 8.04728 8.03514 7.16592 9.30219C7.16592 9.45361 7.13735 9.83073 7.16735 10.0564L8.34012 8.70366C8.58296 8.45082 8.8658 8.27227 9.00864 8.32083C9.07902 8.34609 9.13669 8.39794 9.16927 8.46524C9.20185 8.53254 9.20675 8.60994 9.18292 8.68081L7.24305 14.8332C7.01878 15.5532 7.44304 16.2588 8.47154 16.4188C9.98571 16.4188 10.8799 15.4446 11.7627 14.1776H11.7613Z" fill="#18A0FB"/>
  </svg>
);

const ExchangeSelector = () => {
  return (
    <div className="bg-neutral rounded-lg mx-4 p-1.5">
      <TokenPriceSection tokenName="RepTokens" rateCop={'1,14'} rateUsd={'0,15'} />
      <div className="flex justify-center">
        <DownArrow />
      </div>
      <TokenPriceSection tokenName="none" rateCop={'1,14'} rateUsd={'0,15'} />
      <div className="flex">
        <div className="w-24 p-3">
          <InfoIcon />
        </div>
        <div>
          <article className="prose text-white mt-2 leading-6">
            <p>{`Repbase toma una comisión de 5% en cada transacción`}</p>
          </article>
        </div>
      </div>
      <div className="form-control">
        <button className="btn btn-primary btn-disabled bg-gray-100" >Redimir</button>
      </div>
    </div>
  )
}

export const ExchangeStart = () => (
  <div className="h-max">
    <Titlebar />
    <div className="container mx-auto px-3">
      <Navbar showBackButton title="Usar Tokens" />
    </div>
    <div className="px-4">
      <TokenBalance hideButton={true}  />
    </div>
    <div className="px-4">
      <article className="prose prose-xl my-4">
        <p className="font-bold">Tasa de cambio para hoy:</p>
      </article>
    </div>
    <ExchangeRate/>
    <div className="px-4">
      <article className="prose prose-xl my-4">
        <p className="font-bold">Cambia RepTokens por cripto:</p>
      </article>
    </div>
    <ExchangeSelector/>
    
  </div>    
); 
