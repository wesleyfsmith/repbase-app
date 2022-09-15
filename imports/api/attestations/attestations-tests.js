import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import assert from 'assert';
import { generateFromSchema } from '../utils/schema-utils';
import { Badges } from '../badges/badges-module';
import { Attestations } from './attestations-module';
import { Users } from '../users/users-module';
import { Companies } from '../companies/companies-module';
import { TimePeriods } from '../timeperiods/timeperiods-module';

/* eslint-disable func-names, prefer-arrow-callback */

describe('Attestations', function() {
  if (Meteor.isServer) {
    beforeEach(function() {
      resetDatabase();
      Users.test.logoutUser();
    });
    it ('should create a new attestation with attestation type', function() {

      const companyId = Companies.fixtures.generateTul();
      const timePeriodId = TimePeriods.fixtures.generateTimePeriodStartingWeekAgo(companyId);


      const managerUser = Users.fixtures.generateManagerUser();
      const normalUser = Users.fixtures.generateNormalUser();

      Users.test.loginAsUser(managerUser._id);
      const newBadge = generateFromSchema(Badges.schema);

      Badges.api.create.call(newBadge);
      const badge = Badges.db.findOne();

      const newAttestation = generateFromSchema(Attestations.schema);
      newAttestation.badge_id = badge._id;
      newAttestation.reciever_id = normalUser._id;
      newAttestation.timeperiod_id = timePeriodId;

      Attestations.api.create.call(newAttestation);
      const attestation = Attestations.db.findOne();

      //TODO fix this comparison
      // expect(newAttestation).to.equal(attestation);

      // console.log({newAttestationType})

    });
    // it ('should read an attestation type', function() {
    //   Users.test.loginAsUser('test-id');
    //   const newAttestationType = generateFromSchema(AttestationTypes.schema);
    //   AttestationTypes.api.create.call(newAttestationType);
    //   const attestationType = AttestationTypes.db.findOne();
    //   const readResult = AttestationTypes.api.read.call(newAttestationType);
    //   expect(attestationType).to.deep.equal(readResult);
    // });
  }
  
  // it('should create an artist with correct userId', function() {
  //   Users.test.loginAsUser('test-id');
  //   const newArtist = generateFromSchema(Artists.schema);
  //   Artists.api.create.call(newArtist);

  //   const artist = Artists.db.findOne();
  //   expect(artist.user_id).to.equal('test-id');
  // });
  // it('should not create artist if user is not logged in', function() {
  //   const newArtist = generateFromSchema(Artists.schema);
  //   try {
  //     Artists.api.create.call(newArtist);
  //   } catch (e) {
  //     assert(true);
  //   }
  // });
  // it('should only be able to create one artist per user', function () {
  //   Users.test.loginAsUser('test-id');
  //   const newArtist = generateFromSchema(Artists.schema);
  //   Artists.api.create.call(newArtist);
  //   try {
  //     Artists.api.create.call(newArtist);
  //   } catch (e) {
  //     assert(true);
  //   }
  // });
  // it('should be able to update the artist', function() {
  //   Users.test.loginAsUser('test-id');
  //   const newArtist = generateFromSchema(Artists.schema);
  //   const artistId = Artists.api.create.call(newArtist);

  //   Artists.api.set.call({ bio: 'my new bio' });
  //   const artist = Artists.api.getByArtistId.call(artistId);
  //   expect(artist.bio).to.equal('my new bio');
  // });
  // it('should only allow artist owner to update the artist', function() {
  //   Users.test.loginAsUser('test-id');
  //   const newArtist = generateFromSchema(Artists.schema);
  //   const artistId = Artists.api.create.call(newArtist);

  //   Users.test.logoutUser();
  //   Users.test.loginAsUser('test-id-2');
  //   try {
  //     Artists.api.set.call({ description: 'my new description' });
  //   } catch (e) {
  //     assert(true);
  //   }
  // });
  // it('should know if the current user is the artist for an artistId', function(done) {
  //   Users.test.loginAsUser('test-id');
  //   const newArtist = generateFromSchema(Artists.schema);
  //   const artistId = Artists.api.create.call(newArtist);
  //   let res = Artists.api.currentUserIsArtist.call(artistId);

  //   expect(res).to.equal(true);

  //   Users.test.logoutUser();
  //   Users.test.loginAsUser('test-id-2');
  //   res = Artists.api.currentUserIsArtist.call(artistId);
  //   expect(res).to.equal(false);

  //   const newArtistForSecondUser = generateFromSchema(Artists.schema);
  //   Artists.api.create.call(newArtistForSecondUser);

  //   // we are checking if the current logged in user, has this artist id
  //   // this call is used in the UI for rendering different buttons
  //   res = Artists.api.currentUserIsArtist.call(artistId);
  //   expect(res).to.equal(false);
  //   done();
  // });
  // it('should be able to sign up a user and create an artist', function(done) {
  //   Users.fixtures.generateNormalUser();
  //   const user = Users.db.findOne();
  //   Users.test.loginAsUser(user._id);
    
  //   const newArtist = generateFromSchema(Artists.schema);
  //   Artists.api.create.call(newArtist);

  //   const artist = Artists.db.findOne();
  //   expect(artist.user_id).to.equal(user._id);
  //   done();
  // });
});
