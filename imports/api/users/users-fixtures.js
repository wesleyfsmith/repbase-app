import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { getFaker } from '/imports/api/utils/optimized-faker';
import { generateFromSchema } from '../utils/schema-utils';
import { Users } from './users-module';

// this will seed the db with a user of type 'customer' and one of type 'artist'

export const fixtures = {
  generateManagerUser() {
    const email = getFaker().internet.email();
    Accounts.createUser({ email, password: 'password', profile: {account_type: 'manager'} });
    return Users.db.findOne(Users.db.selectors.findByEmail(email));
  },
  generateNormalUser() {
    const email = getFaker().internet.email();
    const employeeProfile = {
      names: getFaker().name.fullName(),
      last_names: getFaker().name.fullName(),
      company_email: getFaker().internet.email(),
      company_sector: "tech",
      account_type: 'employee'
    }
    //fun meteor account stuff
    Accounts.createUser({ email, password: 'password', profile: employeeProfile });
    return Users.db.findOne(Users.db.selectors.findByEmail(email));
  },
  run() {

    // make 10 normal users
    for (let i = 0; i < 9; i++) this.generateNormalUser();

    //TODO create company user
  },
};
