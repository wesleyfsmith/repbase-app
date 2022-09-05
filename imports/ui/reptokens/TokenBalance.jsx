import React, {useEffect} from 'react';
import { Exchange } from '../../api/exchange/exchange-module';
import { useApi } from '/imports/api/utils/client-utils'
import { Link } from 'react-router-dom';

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

export const TokenBalance = () => {
  const getUserTokenBalance = useApi(Exchange.api.getReptokensForUser);
  const getUserWalletAddress = useApi(Exchange.api.getWalletAddressForUser);

  useEffect(async () => {
    await getUserTokenBalance.call(Meteor.userId());
    await getUserWalletAddress.call(Meteor.userId());
  }, []);
  console.log({res: getUserWalletAddress.res});

  if (getUserWalletAddress.res !== 'no_wallet') {
    return (
      <div className="h-full">
        <article className="prose prose-xl mx-auto">
          <p className="font-bold">Tus RepTokens:</p>
          <h2 className="text-center pt-0 mt-0">{getUserTokenBalance.res}</h2>
          <p className="text-center pt-0 mt-0">{`En la billetera ${getUserWalletAddress.res}`}</p>
        </article>
        <div className="form-control">
          <button className="btn btn-primary mt-4">Usar Tokens</button>
        </div>
      </div>)
  } else {
    return <NoReptokens />;
  }

  
};
