import React, { useEffect, useState } from 'react';
import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useApi } from '../../../api/utils/client-utils';
import { Crypto } from '../../../api/crypto/crypto-module';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Meteor } from 'meteor/meteor';
import PuffLoader from "react-spinners/PuffLoader";
import { TransactionReceipt } from './TransactionReceipt';
import { useNavigate } from "react-router-dom";
import { contractAbi } from './ReptokenAbi';
import { Alchemy, Network } from 'alchemy-sdk';

// const alchemy = new Alchemy({apiKey: Meteor.settings.public.alchemy_key, network: Network.MATIC_MUMBAI});

// [
//   {
//     name: 'transfer',
//     type: 'function',
//     stateMutability: 'nonpayable',
//     inputs: [
//       {internalType: 'address', name: 'to', type: 'address'}, 
//       {internalType: 'uint256', name: 'amount', type: 'uint256'}
//     ]
//   }
// ],

const SuccessFullyConverted = () => {

}

const SendTransactionButton = ({coinType, repTokens, setShowReceipt}) => {
  const navigate = useNavigate();
  const [hasClicked, setHasClicked] = useState(false);
  const {
    config
  } = usePrepareContractWrite({
    addressOrName: Meteor.settings.public.reptoken_address,
    contractInterface: contractAbi,
    args: [Meteor.settings.public.company_wallet, parseInt(repTokens) * 10], //times 10 cuz decimals, gotta fix this
    functionName: 'transfer',
    enabled: true
  })

  if (config && config.request) {
    config.request.gasPrice = "50";
  }

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isSuccess) {
    navigate(`/exchange/txreceipt/${coinType}/${repTokens}`)
  }

  // console.log({ data, error, isError, write });

  if (isError && hasClicked) {
    setHasClicked(false);
  }

  // console.log({isLoading, isSuccess});

  let buttonText = hasClicked ? 'Confirm in wallet' : 'Confirmar';
  buttonText = isLoading ? 'Processing...' : buttonText;
  const buttonEnabled = hasClicked ? ' btn-disabled text-white ' : ' ';

  const sendTx = () => {
    setHasClicked(true);
    write();
  }

  return (
    <div className="form-control mt-4">
      <button onClick={() => sendTx()} className={`btn btn-primary text-white ${buttonEnabled}`}>
        {hasClicked && <PuffLoader size={30} color="#ffffff" />}
        <p className="text-white">{buttonText}</p>
      </button>
    </div>
  );
};

const BitcoinIcon = () => (
  <div className="w-10">
    <div className="flex justify-center">
      <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.2692 19.7669C34.2697 28.0529 27.5482 34.7658 19.2733 34.7634C10.987 34.7639 4.2742 28.0427 4.27668 19.7679C4.27623 11.4819 10.9862 4.77189 19.2725 4.77151C27.5446 4.76247 34.2688 11.4807 34.2692 19.7669Z" fill="#D9D9D9"/>
        <path d="M25.8035 15.8582C25.6058 13.8543 23.8782 13.1739 21.6813 12.9849L21.6859 10.1939L19.9948 10.1928L19.9959 12.91C19.5497 12.9125 19.0921 12.9179 18.6373 12.9347L18.6333 10.2062L16.9422 10.2051L16.9462 12.9819C16.5738 12.9902 16.2129 12.9957 15.8633 12.9983L15.8604 12.9869L13.5184 12.9911L13.523 14.8016C13.523 14.8016 14.7736 14.7797 14.7537 14.7967C15.4415 14.7943 15.6629 15.1981 15.7252 15.5449L15.7204 18.7224C15.7687 18.7225 15.8284 18.7197 15.9051 18.7368C15.8454 18.7396 15.7857 18.7424 15.7232 18.7338L15.7204 23.179C15.689 23.3922 15.558 23.7389 15.0862 23.7357C15.1033 23.7556 13.8556 23.7406 13.8556 23.7406L13.516 25.7697L15.7273 25.774C16.1394 25.7799 16.5373 25.7773 16.9381 25.7861L16.9391 28.5999L18.6302 28.601L18.6348 25.8099C19.0953 25.8159 19.5557 25.8219 19.9906 25.8222L19.9945 28.599L21.6856 28.6001L21.6846 25.7863C24.5411 25.6176 26.5368 24.9026 26.7744 22.2225C26.9747 20.0711 25.9606 19.1041 24.3408 18.7108C25.3388 18.2084 25.9504 17.3192 25.8035 15.8582ZM23.4293 21.885C23.4337 23.9854 19.8242 23.7501 18.6759 23.7465L18.6755 20.0147C19.8237 20.0182 23.4364 19.6852 23.4293 21.885ZM22.6453 16.6094C22.6413 18.5307 19.6372 18.3014 18.6822 18.298L18.6844 14.9158C19.6394 14.9192 22.6438 14.617 22.6453 16.6094Z" fill="#F89E31"/>
        <path d="M19.6308 4.00353C11.0725 3.92885 4.07225 10.808 3.99756 19.3663C3.92286 27.926 10.7992 34.9262 19.3589 35.0023C21.3947 35.0205 23.4143 34.6373 25.302 33.8748C27.1898 33.1123 28.9089 31.9854 30.3611 30.5583C31.8132 29.1313 32.97 27.4322 33.7653 25.558C34.5607 23.6838 34.979 21.6713 34.9964 19.6354C35.0697 11.0757 28.1905 4.07823 19.6308 4.00353ZM19.6188 5.21215C21.4959 5.22704 23.3515 5.61177 25.0798 6.34435C26.808 7.07692 28.3749 8.14297 29.6908 9.48154C31.0067 10.8201 32.0459 12.4049 32.7489 14.1454C33.4519 15.8859 33.8049 17.7478 33.7878 19.6248C33.7161 27.5107 27.2654 33.8456 19.3809 33.7768C11.495 33.708 5.15725 27.2615 5.22323 19.3756C5.28921 11.4896 11.7329 5.14901 19.6188 5.21215ZM27.5476 28.4882C25.3089 30.4998 22.3984 31.6008 19.3888 31.5746C16.3792 31.5483 13.4883 30.3967 11.285 28.3463L10.4265 29.19L10.7389 29.4737C13.1858 31.6272 16.3398 32.8045 19.5992 32.7812C22.8587 32.7578 25.9955 31.5354 28.4112 29.347L27.5476 28.4882ZM9.80412 10.4409C7.52407 12.8711 6.24207 16.0704 6.21299 19.4026C6.18391 22.7349 7.40988 25.956 9.64717 28.4257L10.506 27.5536L10.2391 27.2476C8.35134 24.9965 7.35103 22.1332 7.4263 19.1962C7.50157 16.2593 8.64723 13.451 10.6478 11.2995L9.80412 10.4409ZM29.3525 10.5746L29.3523 10.5945L28.4937 11.4382L28.7606 11.7441C30.6507 13.9959 31.6524 16.8609 31.5771 19.7999C31.5018 22.7388 30.3547 25.5488 28.3518 27.7008L29.1955 28.5594L29.4792 28.2469C31.6327 25.8001 32.81 22.6461 32.7867 19.3866C32.7633 16.1271 31.5408 12.9903 29.3525 10.5746ZM28.2607 9.52661C25.8139 7.37311 22.6599 6.19575 19.4004 6.21911C16.141 6.24247 13.0042 7.46494 10.5884 9.65329L11.452 10.512L11.7579 10.2452C14.0097 8.35504 16.8748 7.35333 19.8137 7.42862C22.7526 7.50391 25.5626 8.65102 27.7146 10.654L28.5732 9.81024L28.2607 9.52661Z" fill="#333333"/>
      </svg>
    </div>

  </div>
);

const EthereumIcon = () => (
  <div className="w-24 px-8 pt-2">
    <svg viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.20596 0L9.00488 0.683453V20.5157L9.20596 20.7164L18.4119 15.2748L9.20596 0Z" fill="#797E9F"/>
      <path d="M9.2059 0L0 15.2748L9.2059 20.7165V11.0905V0Z" fill="#8C92AC"/>
      <path d="M9.20511 22.4594L9.0918 22.5975V29.6622L9.20511 29.9932L18.4165 17.0205L9.20511 22.4594Z" fill="#6B7090"/>
      <path d="M9.2059 29.9932V22.4594L0 17.0205L9.2059 29.9932Z" fill="#8B92AB"/>
      <path d="M9.20508 20.7166L18.4108 15.2751L9.20508 11.0908V20.7166Z" fill="#5C628A"/>
      <path d="M0 15.2751L9.20576 20.7166V11.0908L0 15.2751Z" fill="#787E9D"/>
    </svg>
  </div>
);

const USDCIcon = () => (
  <div className="w-24 px-5">
    <div className="flex flex-col pt-1 justify-center">
      <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C23.2847 0 30 6.71531 30 15C30 23.2847 23.2847 30 15 30C6.71531 30 0 23.2847 0 15C0 6.71531 6.71531 0 15 0ZM18.1425 5.2125C17.9137 5.1 17.685 5.2125 17.6287 5.44031C17.5716 5.4975 17.5716 5.55469 17.5716 5.66813V6.465L17.5809 6.5625C17.6299 6.75537 17.7484 6.92333 17.9137 7.03406C22.3706 8.62781 24.6562 13.5778 22.9987 17.9587C22.1419 20.3494 20.2566 22.1691 17.9137 23.0231C17.685 23.1366 17.5716 23.3072 17.5716 23.5922V24.3891L17.5763 24.4716C17.5852 24.5616 17.6228 24.6464 17.6836 24.7134C17.7443 24.7804 17.825 24.8261 17.9137 24.8438C17.9709 24.8438 18.0853 24.8438 18.1425 24.7875C19.4283 24.3859 20.6221 23.734 21.6549 22.8692C22.6878 22.0044 23.5394 20.9439 24.1606 19.7486C24.7819 18.5533 25.1607 17.247 25.275 15.9048C25.3893 14.5625 25.237 13.2109 24.8269 11.9278C23.7994 8.68406 21.285 6.23719 18.1425 5.21344V5.2125ZM12.0863 5.15625C12.0291 5.15625 11.9147 5.15625 11.8575 5.2125C10.5717 5.61405 9.37794 6.266 8.34508 7.13079C7.31223 7.99558 6.46064 9.05614 5.83935 10.2514C5.21807 11.4467 4.83935 12.753 4.72501 14.0952C4.61067 15.4375 4.76296 16.7891 5.17313 18.0722C6.20062 21.2597 8.65781 23.7066 11.8575 24.7303C12.0862 24.8438 12.315 24.7303 12.3713 24.5025C12.4284 24.4462 12.4284 24.3881 12.4284 24.2747V23.4778L12.4191 23.4028C12.3797 23.2444 12.2325 23.0634 12.0863 22.9659C7.62937 21.3722 5.34375 16.4222 7.00125 12.0413C7.85812 9.65063 9.74344 7.83094 12.0863 6.97687C12.315 6.86344 12.4284 6.69281 12.4284 6.40781V5.61094L12.4237 5.52844C12.4148 5.43841 12.3772 5.35364 12.3164 5.28662C12.2557 5.21961 12.175 5.1739 12.0863 5.15625ZM15.4003 8.115H14.5425L14.46 8.1225C14.2725 8.16 14.1356 8.32125 14.085 8.57063V9.87938L13.8909 9.90937C12.2897 10.1944 11.2866 11.2997 11.2866 12.6675C11.2866 14.5444 12.4284 15.2841 14.8284 15.5691C16.4288 15.8531 16.9425 16.1953 16.9425 17.1056C16.9425 18.015 16.1428 18.6413 15.0572 18.6413C13.5713 18.6413 13.0575 18.0159 12.8859 17.1619C12.8297 16.935 12.6572 16.8206 12.4856 16.8206H11.5144L11.4403 16.8272C11.3479 16.8421 11.264 16.8901 11.2042 16.9621C11.1443 17.0342 11.1127 17.1254 11.115 17.2191V17.2753L11.1459 17.4441C11.4178 18.7791 12.3328 19.7344 14.1431 20.0072V21.3731L14.1506 21.4556C14.1881 21.6413 14.3503 21.7781 14.6006 21.8278H15.4575L15.54 21.8203C15.7275 21.7828 15.8644 21.6216 15.915 21.3731V20.0063L16.1091 19.9688C17.715 19.6294 18.7716 18.4678 18.7716 16.9903C18.7716 14.9991 17.5716 14.3166 15.1716 14.0316C13.4569 13.8038 13.1147 13.3491 13.1147 12.5522C13.1147 11.7553 13.6866 11.2434 14.8284 11.2434C15.8569 11.2434 16.4287 11.5847 16.7137 12.4387C16.7434 12.5213 16.7977 12.5928 16.8693 12.6436C16.9409 12.6944 17.0263 12.722 17.1141 12.7228H18.0281L18.1022 12.7172C18.195 12.7024 18.2792 12.6545 18.3392 12.5822C18.3993 12.5099 18.431 12.4183 18.4284 12.3244V12.2681L18.3938 12.1059C18.253 11.5232 17.9321 10.9997 17.4766 10.6099C17.0211 10.2201 16.4544 9.98379 15.8569 9.93469V8.57063L15.8494 8.48812C15.8119 8.30156 15.6497 8.16469 15.3994 8.115H15.4003Z" fill="#1A7EDA"/>
      </svg>
    </div>
  </div>
);

const BlueLineSeparator = () => (
  <div className="w-9/10 border-b border-primary mr-2 pt-1 pb-1"></div>
);

const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34783 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34783 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34783 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34783 0 10 0V0ZM11.4999 6.13956C12.2427 6.13956 12.8455 5.62388 12.8455 4.85965C12.8455 4.09542 12.2413 3.57974 11.4999 3.57974C10.7571 3.57974 10.1571 4.09542 10.1571 4.85965C10.1571 5.62388 10.7571 6.13956 11.4999 6.13956ZM11.7613 14.1776C11.7613 14.0247 11.8142 13.6276 11.7842 13.4019L10.61 14.7532C10.3671 15.0089 10.0629 15.1861 9.92001 15.1389C9.8552 15.1151 9.80104 15.0689 9.76726 15.0086C9.73348 14.9484 9.7223 14.8781 9.73573 14.8104L11.6927 8.62795C11.8527 7.84372 11.4128 7.12806 10.48 7.03664C9.49575 7.03664 8.04728 8.03514 7.16592 9.30219C7.16592 9.45361 7.13735 9.83073 7.16735 10.0564L8.34012 8.70366C8.58296 8.45082 8.8658 8.27227 9.00864 8.32083C9.07902 8.34609 9.13669 8.39794 9.16927 8.46524C9.20185 8.53254 9.20675 8.60994 9.18292 8.68081L7.24305 14.8332C7.01878 15.5532 7.44304 16.2588 8.47154 16.4188C9.98571 16.4188 10.8799 15.4446 11.7627 14.1776H11.7613Z" fill="#18A0FB"/>
  </svg>
);

const CardBox = ({name, rate, info, icon}) => { 
  let { coinType, repTokens } = useParams();
  const { address, isConnected } = useAccount();

  const getConversion = useApi(Crypto.api.getConversion);

  useEffect(() => {
    let cType = null;
    if (coinType === 'eth') {
      cType = 'Ethereum';
    }
    if (coinType === 'btc') {
      cType = 'Bitcoin';
    }
    //TODO make this cleaner
    getConversion.call({coinType: cType, repTokens });
  }, []);

  let coinIcon = null;
  if (coinType === 'eth') {
    coinIcon = <EthereumIcon />;
  }
  if (coinType === 'btc') {
    coinIcon = <BitcoinIcon />;
  }
  if (coinType === 'usdc') {
    coinIcon = <USDCIcon />;
  }
  return (
    <div>
      <div className="bg-gray-100 rounded-lg mx-4 p-4 mb-4">
        <div className="flex justify-between">
          <article className="prose flex flex-col justify-center">
            <p className="">Reptokens a redimir</p>
          </article>
          <article className="prose prose-xl">
            <p className="font-bold">{repTokens}</p>
          </article>
        </div>
        <BlueLineSeparator />
        <div className="flex justify-between">
          <article className="prose flex flex-col justify-center">
            <p className="">Recibes</p>
          </article>
          <article className="prose prose-xl">
            <div className="flex justify-end">
              {
                getConversion.res &&
                <p className="font-bold m-0">{getConversion.res.exchangeAmount}</p>
              }
            </div>
            <div className="flex">
              {coinIcon}
              <article className="prose flex flex-col justify-center">
                {coinType.toUpperCase()}
              </article>
            </div>
          </article>
        </div>
        <BlueLineSeparator />
        <article className="prose prose-xl font-bold mt-4">
      Costos de transacción
        </article>
        <article className="prose leading-6">
      5% de comisión serán descontada de tus RepToken según la tasa de cambio.
        </article>
        <div className="flex justify-between  mt-4">
          <article className="prose prose-xl flex flex-col justify-center font-bold">
        Subtotal
          </article>
          <article className="prose prose-xl">
            {
              getConversion.res &&
                <p className="font-bold">${getConversion.res.usdAmountAfterComission}</p>
            }
          </article>
        </div>
        <div className="flex justify-between">
          <article className="prose prose-xl flex flex-col justify-center font-bold">
        Total de wBTC
          </article>
          {
            getConversion.res &&
              <article className="prose prose-xl font-bold">
                {getConversion.res.exchangeAmount}
              </article>
          }
          
        </div>
        <div className="flex mt-4">
          <div className="w-24 p-4">
            <InfoIcon />
          </div>
          <div>
            <article className="prose prose-sm leading-6 mt-2">
              <p>{'Al confirmar se entiende que aceptas estos costos de transacción.'}</p>
            </article>
          </div>
        </div>
        <SendTransactionButton coinType={coinType} repTokens={repTokens} />
      </div>
    </div>
    
  );};

export const ConfirmTransaction = () => (
  <div className="h-max">
    <Titlebar />
    <div className="container mx-auto px-3">
      <Navbar showBackButton title="Elegir Token" />
    </div>
    <article className="prose prose-xl text-white">
      <p className="font-bold">{'CONFIRMA LA TRANSACCIÓN'}</p>
    </article>
    <CardBox />    
  </div>    
); 
