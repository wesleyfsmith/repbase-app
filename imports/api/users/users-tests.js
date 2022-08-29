/* eslint-disable no-unused-expressions */
import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'chai';
import { Users } from './users-module';

const nock = require('nock');

describe('Users', function() {
  if (Meteor.isServer) {
    beforeEach(function() {
      resetDatabase();
    });
    it('should create account with password', function() {
      Users.fixtures.generateNormalUser();
      const user = Users.db.findOne();
      // just check this user exists
      assert(user);
    });
    // it('should create account with password and send email', async function() {
    //   const mockSg = nock('https://api.sendgrid.com')
    //     // TODO: We are not matching the exact post body, because it includes
    //     // the user id which has not been created before we make the call.
    //     // This is not ideal, and we should look into wildcard matching.
    //     .post('/v3/mail/send')
    //     .reply(200, {
    //       message: 'success',
    //     });
    //   await Users.api.createUserWithPassword.call({ email: 'test@test.com', password: 'test' });
    //   const user = Users.db.findOne();
    //   // just check this user exists
    //   assert(user);

    //   //nock seems busted rn
    //   // await new Promise((resolve) => setTimeout(resolve, 5000));
    //   // console.log({ isDone: mockSg.isDone() });
    //   // assert.strictEqual(mockSg.isDone(), true);
    // });
  }
});
