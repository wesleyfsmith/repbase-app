import { registerMethods } from '../utils/register-methods';
import { Attestations } from './attestations-module';
import { Users } from '../users/users-module';
import { Badges } from '../badges/badges-module';
import { TimePeriods } from '../timeperiods/timeperiods-module';

export const api = registerMethods('attestations', {
  create(attestation) {
    //TODO check user has correct role to make attestation
    //TODO create 3x attestation automatically
    attestation.issuer_id = Users.secure.userId(this);
    return Attestations.db.insert(attestation);
  },
  updateAttestationForUser({userId, kpiPercentage}) {
    //todo assign the correct badge color for percentage
    const bronceBadge = Badges.db.findOne({name: 'Bronce'});
    const timeperiod = TimePeriods.api.getMostRecentPeriod.call();
    //check if user already has attestation for the current period
    const attestations = Attestations.db.find({reciever_id: userId, timeperiod_id: timeperiod._id}).fetch();
    if (attestations.length > 0) {
      const attestation = attestations[0];
      console.log({attestationId: attestation._id});
      Attestations.db.update({_id: attestation._id}, {$set: {kpi_percentage: kpiPercentage}});
    } else {
      const attestation = {
        badge_id: bronceBadge._id,
        issuer_id: Users.secure.userId(this),
        reciever_id: userId,
        timeperiod_id: timeperiod._id,
        kpi_percentage: kpiPercentage
      };
      const attestationId = Attestations.db.insert(attestation);
      console.log({attestationId});
    }
  },
  read(_id) {
    return Attestations.db.findOne(_id);
  },
  getAttestationCounts() {
    const badges = Badges.db.find().fetch();
    const results = [];
    badges.forEach((badge) => {
      const count = Attestations.db.find({badge_id: badge._id}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
    return results;
  },
  getAttestationCountsForCurrentPeriod() {
    const currentTimePeriod = TimePeriods.api.getMostRecentPeriod.call();
    const badges = Badges.db.find().fetch();
    const results = [];
    badges.forEach((badge) => {
      const count = Attestations.db.find({badge_id: badge._id, timeperiod_id: currentTimePeriod._id}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
    return results.sort((a, b) => {
      if (a.attestationCount < b.attestationCount) return -1;
      if (a.attestationCount > b.attestationCount) return 1;
      if (a.attestationCount === b.attestationCount) return 0; 
    }).reverse();
  },
  getAttestationCountsForUser(userId) {
    const badges = Badges.db.find().fetch();
    const results = [];
    badges.forEach((badge) => {
      const count = Attestations.db.find({badge_id: badge._id, reciever_id: userId}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
  }
});