import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { getFaker } from '/imports/api/utils/optimized-faker';
import { generateFromSchema } from '../utils/schema-utils';
import { Artists } from '../artists/artists-module';
import { Users } from './users-module';

// this will seed the db with a user of type 'customer' and one of type 'artist'

export const fixtures = {
  generateArtistUserWithEmail(email) {
    Accounts.createUser({ email, password: 'password' });
    const user = Users.db.findOne(Users.db.selectors.findByEmail(email));
    Users.test.loginAsUser(user._id);
    user.artist_id = Artists.fixtures.generate(user._id);
    Users.test.logoutUser();
    return user;
  },
  generateArtistUser() {
    const email = getFaker().internet.email();
    return this.generateArtistUserWithEmail(email);
  },
  generateNormalUser() {
    const email = getFaker().internet.email();
    Accounts.createUser({ email, password: 'password' });
    return Users.db.findOne(Users.db.selectors.findByEmail(email));
  },
  run() {
    // make default artist
    this.generateArtistUserWithEmail('artist@test.com');

    // make 9 artists with stripe connected
    for (let i = 0; i < 9; i++) this.generateArtistUser();

    // make default collector
    Accounts.createUser({ email: "collector@test.com", password: 'password' });

    // make 10 normal users
    for (let i = 0; i < 9; i++) this.generateNormalUser();
  },
};
