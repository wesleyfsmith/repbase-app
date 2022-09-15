/* eslint-disable no-undef */
/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import assert from 'assert';
import { generateFromSchema } from '../utils/schema-utils';
import { Users } from '../users/users-module';
import { Companies } from './companies-module';


describe('Companies', function() {
  if (Meteor.isServer) {
    beforeEach(function() {
      resetDatabase();
      Users.test.logoutUser();
    });
    it ('should create a new tul company object', function() {
      const empresa = { name: 'TUL'};
      const companyId = Companies.db.insert(empresa);
      const queriedEmpresa = Companies.db.findOne({_id: companyId});
      expect(queriedEmpresa.name).to.equal('TUL');
      // const queriedEmpresa = Companies.db.findOne()
    });
  }
});
