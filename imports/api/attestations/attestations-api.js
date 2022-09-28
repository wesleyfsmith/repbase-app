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
    const plataBadge = Badges.db.findOne({name: 'Plata'});
    const platinoBadge = Badges.db.findOne({name: 'Platino'});
    const oroBadge = Badges.db.findOne({name: 'Oro'});
    const timeperiod = TimePeriods.api.getMostRecentPeriod.call();

    let badgeId = null;
    
    if (kpiPercentage >= 60 && kpiPercentage <= 75) {
      badgeId = bronceBadge._id;
    }
    if (kpiPercentage >= 76 && kpiPercentage <= 89) {
      badgeId = plataBadge._id;
    }
    if (kpiPercentage >= 90) {
      badgeId = oroBadge._id;
    }
    if (kpiPercentage >= 100) {
      badgeId = platinoBadge._id;
    }

    //check if user already has attestation for the current period
    const attestations = Attestations.db.find({'metadata.reciever_id': userId, 'metadata.timeperiod_id': timeperiod._id}).fetch();
    if (attestations.length > 0) {
      const attestation = attestations[0];
      if (!badgeId) {
        Attestations.db.remove({_id: attestation._id}); //delete because no reward
      } else {
        Attestations.db.update({_id: attestation._id}, {$set: {'metadata.kpi_percentage': kpiPercentage, 'metadata.badge_id': badgeId}});
      }
    } else {
      if (!badgeId) {
        return;
      }
      const attestation = {
        issuer_id: Users.secure.userId(this),
        reciever_id: userId,
        type: 'tulV1',
        metadata: {
          kpi_percentage: kpiPercentage,
          badge_id: badgeId,
          timeperiod_id: timeperiod._id
        }
      };
      Attestations.db.insert(attestation);
    }
  },
  read(_id) {
    return Attestations.db.findOne(_id);
  },
  getAttestationCounts() {
    const badges = Badges.db.find().fetch();
    const results = [];
    badges.forEach((badge) => {
      const count = Attestations.db.find({'metadata.badge_id': badge._id}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
    return results;
  },
  getAttestationCountsForCurrentMonth() {
    const badges = Badges.db.find().fetch();

    const timePeriods = TimePeriods.db.find({end_date: {$exists: true}}).fetch();

    const currentMonthTimePeriods = [];
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0, 0, 0); // Zero the time component
    timePeriods.forEach((period) => {
      if (new Date(period.start_date) >= monthAgo) {
        currentMonthTimePeriods.push(period);
      } 
    });

    const results = [];
    currentMonthTimePeriods.forEach((period) => {
      badges.forEach((badge) => {
        const count = Attestations.db.find({'metadata.badge_id': badge._id, 'metadata.timeperiod_id': period._id}).fetch().length;
        results.push({
          name: badge.name,
          attestationCount: count,
          tokens: badge.reward * count
        });
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
      const count = Attestations.db.find({'metadata.badge_id': badge._id, reciever_id: userId}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
    return results;
  },
  getBadgeStatisticsForUser({userId, badgeName}) {
    const badge = Badges.db.findOne({name: badgeName});

    const companyAttestationCount = Attestations.db.find({'metadata.badge_id': badge._id}).fetch().length;
    const userAttestationsCount = Attestations.db.find({'metadata.badge_id': badge._id, reciever_id: userId}).fetch().length;

    return {
      veces: userAttestationsCount,
      enEmpresa: companyAttestationCount,
      enArea: companyAttestationCount,
      enTotal: companyAttestationCount,
      reward: badge.reward
    };
  },
  getAttestionHistoryForUserAndBadge({userId, badgeName}) {
    const badge = Badges.db.findOne({name: badgeName});
    const userAttestations = Attestations.db.find({'metadata.badge_id': badge._id, 'metadata.reciever_id': userId}).fetch();

    const results = [];
    userAttestations.forEach((attestation) => {
      const timeperiod = TimePeriods.db.findOne({_id: attestation.metadata.timeperiod_id});
      if (!timeperiod.end_date) return; //skip the current time period
      results.push({
        kpiPercentage: attestation.metadata.kpi_percentage,
        startDate: timeperiod.start_date,
        endDate: timeperiod.end_date
      });
    });
    return results;
  },
});