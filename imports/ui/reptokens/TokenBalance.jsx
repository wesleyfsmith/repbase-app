import React, {useEffect} from 'react';
import { Crypto } from '../../api/crypto/crypto-module';
import { useApi } from '/imports/api/utils/client-utils'
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { shortenAddress } from '../../utils/crypto-client-helpers';

const NoReptokens = () => (
  <div className="h-full">
        <article className="prose prose-xl mx-auto">
          <p className="font-bold">Tus RepTokens:</p>
        </article>
        <article className="prose">
          Ingresa a ajustes y conecta tu billetera para ver tus RepTokens.
        </article>
        <div className="form-control mb-8">
          <Link to="/settings" className="w-full">
            <button className="btn btn-primary mt-4 w-full">Ir a ajustes</button>
          </Link>
        </div>
      </div>
)

export const TokenBalanceOnly = ({balance, address}) => {
  return (
    <article className="prose prose-xl mx-auto">
          <p className="font-bold">Tus RepTokens:</p>
          <h2 className="text-center pt-0 mt-0">{balance}</h2>
          <p className="text-center pt-0 mt-0">{`En la billetera ${shortenAddress(address)}`}</p>
        </article>
  )
}

export const TokenBalance = ({hideButton}) => {
  const getUserTokenBalance = useApi(Crypto.api.getReptokensForUser);
  const getUserWalletAddress = useApi(Crypto.api.getWalletAddressForUser);
  const { address, isConnected } = useAccount();

  useEffect(async () => {
    await getUserTokenBalance.call(Meteor.userId());
    await getUserWalletAddress.call(Meteor.userId());
  }, []);
  console.log({address})

  if (address) {
    return (
      <div className="h-full">
        <TokenBalanceOnly balance={getUserTokenBalance.res} address={address} />
        <div className="form-control">
          {!hideButton && 
            <Link to="/exchange">
              <button className="btn btn-primary mt-4 w-full">Usar Tokens</button>
            </Link>
          }
          
        </div>
      </div>)
  } else {
    return <NoReptokens />;
  }

  
};
