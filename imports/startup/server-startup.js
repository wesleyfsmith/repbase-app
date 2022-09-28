// this must go first or all the schemas will break
import '../utils/schema-utils';
import { Companies } from '../api/companies/companies-module';
import { TimePeriods } from '../api/timeperiods/timeperiods-module';
import { Users } from '../api/users/users-module';
import { Badges } from '../api/badges/badges-module';
import { Attestations } from '../api/attestations/attestations-module';
import { Crypto } from '../api/crypto/crypto-module';
import { Settings } from '../api/settings/settings-module';
import { Meteor } from 'meteor/meteor';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// seed fixtures
if (Users.db.find().count() === 0 && Meteor.settings.run_fixtures) {
  console.log('---------- Running Fixtures ----------');
  const companyId = Companies.fixtures.generateTul();
  // create 10 random time periods
  TimePeriods.fixtures.generateTenTimePeriodsFromNow(companyId);
  // badge types

  Badges.fixtures.generateAllBadges();
  // create tul user with manager type

  const manager = Users.fixtures.generateManagerUser();
  // create 30 employees
  Users.test.loginAsUser(manager._id);

  for (let i = 0; i < 30; i++) {
    const user = Users.fixtures.generateNormalUser();
    const periods = TimePeriods.db.find().fetch();
    for (let i = 0; i < periods.length; i++) {
      if (getRandomInt(3) === 2) { // 1/3 change to get an attestation for a period
        Attestations.fixtures.generateRandomAttestation(manager._id, user._id, periods[i]._id);
      }
    }
  }


  // party

}