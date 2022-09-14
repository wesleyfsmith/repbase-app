import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { FooterBlack } from './employee/footer/FooterBlack';


const Titlebar = () => (
  <div className="bg-neutral">
    <div className="flex mx-auto justify-between">
      <article className="prose text-4xl font-bold p-2 text-primary pl-8">
        Repbase
      </article>
      <div className="flex pr-8">
        <a className="w-full mx-2 my-auto" href={`${Meteor.absoluteUrl()}repbase_whitepaper_v1.pdf`} download>
          <article className="prose text-white ">
            Whitepaper
          </article>
        </a>
        <a className="w-full mx-2 my-auto" href="mailto: contact@repbase.xyz" >
          <article className="prose text-white mx-2 my-auto">
            Contact
          </article>
        </a>
      </div>
     
    </div>
    
  </div>
)

const FooterWhite = () => (
  <div className="my-16 flex flex-col">
    <article className="prose text-center text-white mx-auto ">
      {`Copyright © 2022\n`}
    </article>
    <article className="prose text-center text-white mx-auto ">
      {`All right reserved by Repbase`}
    </article>
  </div>
)

export const LandingPage = () => {
  const navigate = useNavigate();


  return (
  <div className="h-screen from-primary to-neutral bg-gradient-to-br">
    <Titlebar />
    <div className="max-w-4xl md:flex mx-auto p-8 ">
      <div className="md:w-1/2 sm:w-full my-auto">
        <article className="prose text-2xl font-bold text-white text-center mb-4">
          {`The Decentralized Professional Reputation Network`}
        </article>
        <article className="prose text-center text-white">
          {`We bring together employers and employees to create unique, non-transferable, reliable, user-owned professional reputation profiles that are stored on the blockchain.`}
        </article>
        <div className="form-control">
          <a className="w-full" href={`${Meteor.absoluteUrl()}repbase_whitepaper_v1.pdf`} download>
            <button className="btn btn-primary mt-4 w-full">Read Whitepaper</button>
          </a>
        </div>
      </div>
      <div className="md:w-1/2 sm:w-full mt-8">
        <img className="w-64 mx-auto" src="phone.png"></img>
      </div>
      
    </div>
    <FooterWhite/>
  </div>
)};
