import { Users } from '../users/users-module';
import { registerMethods } from '../utils/register-methods';
import { Meteor } from 'meteor/meteor';
import { ethers, Wallet } from 'ethers';
import { contractAbi } from '../../ui/employee/exchange/ReptokenAbi';
import { Network, Alchemy } from 'alchemy-sdk';

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
    Users.db.update({_id: userId}, {$set: {polygon_wallet_address: address}});
  },
  getConversion({coinType, repTokens}) {
    const usdAmount = repTokens * .10;
    let exchangeAmount = 0;
    
    const btcAmount = .0000053 * usdAmount;
    const ethAmount = .000077 * usdAmount;

    if (coinType === 'Ethereum') {
      exchangeAmount = ethAmount;
    }
    if (coinType === 'Bitcoin') {
      exchangeAmount = btcAmount;
    }

    //5% commission
    const comission = exchangeAmount * .05;
    exchangeAmount = exchangeAmount - (comission);

    return {exchangeAmount, usdAmount, usdAmountAfterComission: usdAmount - (usdAmount * .05), comission};
  },
  async sendRepTokens(users) {
    if (Meteor.isClient) return; //server side only
    const userId = Users.secure.userId(this);

    const alchemy = new Alchemy({apiKey: Meteor.settings.public.alchemy_key, network: Network.MATIC_MUMBAI});

    const provider = new ethers.providers.AlchemyProvider('maticmum', Meteor.settings.public.alchemy_key);

    const wallet = new ethers.Wallet(Meteor.settings.company_wallet_secret_key, provider);

    const reptokenContract = new ethers.Contract(Meteor.settings.public.reptoken_address, contractAbi, wallet);

    for (let i = 0; i < users.length; i++) {
      const payout = users[i].payout;
      const user = Users.db.findOne({_id: users[i].user_id});
      const address = user.polygon_wallet_address;

      const tx = await reptokenContract.transfer(address, payout);
      const receipt = await tx.wait();
      console.log(`Reptokens sent: ${tx.hash}`)
    }


  }

});