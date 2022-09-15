import { Attestations } from './attestations-module';
import { Badges } from '../badges/badges-module';
import { TimePeriods } from '../timeperiods/timeperiods-module';
import { Users } from '../users/users-module';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomBadgeId = () => {
  const bronceBadge = Badges.db.findOne({name: 'Bronce'});
  const plataBadge = Badges.db.findOne({name: 'Plata'});
  const oroBadge = Badges.db.findOne({name: 'Oro'});
  const platinoBadge = Badges.db.findOne({name: 'Platino'});
  const rand = getRandomInt(4);
  if (rand == 0) {
    return bronceBadge._id;
  }
  if (rand == 1) {
    return plataBadge._id;
  }
  if (rand == 2) {
    return oroBadge._id;
  }
  if (rand == 3) {
    return platinoBadge._id;
  }
};

const getRandomTimePeriodId = () => {
  const rand = getRandomInt(TimePeriods.db.find().count());
  return TimePeriods.db.findOne({instance: (rand)})._id;
};

export const fixtures = {
  generateRandomAttestation(managerId, userId) {
    const attestation = {
      badge_id: getRandomBadgeId(),
      issuer_id: managerId,
      reciever_id: userId,
      timeperiod_id: getRandomTimePeriodId() 
    };
    Users.test.loginAsUser(managerId);
    Attestations.db.insert(attestation);
  }
};