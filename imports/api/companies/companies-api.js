import { Meteor } from 'meteor/meteor';
import { registerMethods } from '../utils/register-methods';
import { Companies } from './companies-module';
import { Users } from '../users/users-module';

export const api = registerMethods('companies', {
  create() {
    if (Companies.db.count() > 0) {
      throw new Meteor.Error('company already created');
    }
    return Companies.db.insert({name: 'TUL'});
  },
  read(_id) {
    return Companies.db.findOne(_id);
  },
  getAllEmployees() {
    return Users.db.find().fetch();
  }

});