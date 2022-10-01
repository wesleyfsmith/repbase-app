import { registerMethods } from '../utils/register-methods';
import { TimePeriods } from './timeperiods-module';
import { Attestations } from '../attestations/attestations-module';
import { Companies } from '../companies/companies-module';
import moment from 'moment';
import { Badges } from '../badges/badges-module';
import { Crypto } from '../crypto/crypto-module';
import { Users } from '../users/users-module';

export const api = registerMethods('timeperiods', {
  getAllPeriods() {
    const results = [];
    const timePeriods = TimePeriods.db.find({}, {sort: {instance: -1}}).fetch();
    timePeriods.forEach((period) => {
      const attestationCount = Attestations.db.find({timeperiod_id: period._id}).fetch().length;
      results.push({
        start_date: period.start_date,
        end_date: period.end_date ? period.end_date : 'N/A',
        instance: period.instance,
        attestationCount,
        _id: period._id
      });
    });
    return results;
    // return results.slice(1, results.length);
  },
  getMostRecentPeriod() {
    const timePeriods = TimePeriods.db.find({}, {sort: {instance: -1}, limit: 1}).fetch();
    return timePeriods[0];
  },
  getPeriod(periodId) {
    const period = TimePeriods.db.findOne({_id: periodId});
    if (!period.end_date) {
      period.isCurrentPeriod = true;
    } else {
      period.isCurrentPeriod = false;
    }
    return period;
  },
  endPeriod() {
    //todo security
    const currentPeriod = TimePeriods.api.getMostRecentPeriod.call();
    TimePeriods.db.update(currentPeriod._id, {$set: {end_date: new Date()}});
    const tulCompany = Companies.db.findOne();
    const timeperiod = {
      start_date: new Date(),
      instance: TimePeriods.db.find().count(),
      company_id: tulCompany._id
    };

    TimePeriods.db.insert(timeperiod);

    const users = [];

    //get all the users that have attestations for the current period
    const attestations = Attestations.db.find({'metadata.timeperiod_id': currentPeriod._id});
    attestations.forEach((attestation) => {
      const badge = Badges.db.findOne({_id: attestation.metadata.badge_id});

      let payout = 0;

      //check if it's a 3 or more award
      const attestationForBadgeType = Attestations.db.find({'metadata.badge_id': badge._id, reciever_id: attestation.reciever_id}).fetch();
      if (attestationForBadgeType.length % 3 === 0) {
        const tripleBadge = Badges.db.findOne({name: badge.name + ' 3X'});
        const attestationId = Attestations.db.insert({
          issuer_id:  Users.secure.userId(this),
          reciever_id: attestation.reciever_id,
          metadata: {
            timeperiod_id: currentPeriod._id,
            kpi_percentage: 100,
            badge_id: tripleBadge._id
          },
          type: 'tulV1'
        });
        payout = tripleBadge.reward;
      }

      payout += badge.reward;

      Users.db.update({_id: attestation.reciever_id}, {$inc: {'employee_profile.reptokensToRedeem': payout}});

      // users.push({
      //   user_id: attestation.reciever_id,
      //   payout: payout + badge.reward
      // });
    });
    // Crypto.api.sendRepTokens.call(users);
  }

});