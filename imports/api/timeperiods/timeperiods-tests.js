/* eslint-disable no-undef */
/* eslint-disable func-names, prefer-arrow-callback */
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import assert from 'assert';
import { Users } from '../users/users-module';
import { TimePeriods } from './timeperiods-module';
import { Companies } from '../companies/companies-module'; 


describe('Time Periods', function() {
  if (Meteor.isServer) {
    beforeEach(function() {
      resetDatabase();
      Users.test.logoutUser();
    });
    it ('should create a new time period', function() {
      const companyId = Companies.fixtures.generateTul();
      const timePeriodId = TimePeriods.fixtures.generateTimePeriodStartingWeekAgo(companyId);
      const timePeriod = TimePeriods.db.findOne({_id: timePeriodId});
      expect(timePeriod.instance).to.equal(0);
    });
  }
});
