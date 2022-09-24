import { Users } from '../users/users-module';
import { registerMethods } from '../utils/register-methods';

export const api = registerMethods('crypto', {
  getReptokensForUser(userId) {
    if (Users.secure.userId(this) !== userId) {
      throw new Meteor.Error('invalid access');
    }
    return 0;
  },
  getWalletAddressForUser(userId) {
    if (Users.secure.userId(this) !== userId) {
      throw new Meteor.Error('invalid access');
    }
    const user = Users.db.findOne({_id: userId}); 
    if (!user.polygon_wallet_address) {
      return 'no_wallet';
    } else {
      return user.polygon_wallet_address;
    }
  },
  setUserWalletAddress(address) {
    const userId = Users.secure.userId(this);
    //TODO some sort of validation for this step
    Users.db.update({$set: {polygon_wallet_address: address}});
  },
  getConversion({coinType, repTokens}) {
    const usdAmount = repTokens * .10;
    let exchangeAmount = 0;

    console.log({coinType, repTokens});
    
    const btcAmount = .0000053 * usdAmount;
    const ethAmount = .000077 * usdAmount;

    if (coinType === 'Ethereum') {
      exchangeAmount = ethAmount;
    }
    if (coinType === 'Bitcoin') {
      exchangeAmount = btcAmount;
    }
    return {exchangeAmount, usdAmount};
  }

});