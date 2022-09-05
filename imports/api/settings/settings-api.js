import { Users } from '../users/users-module';
import { registerMethods } from '../utils/register-methods';

export const api = registerMethods('settings', {
  getEmployeeProfile() {
    const userId = Users.secure.userId(this);
    if (!userId) {
      throw new Meteor.Error('User must be logged in');
    }
    const user = Users.db.findOne({_id: userId});
    return user.employee_profile;
  },
  setEmployeeProfile(newProfile) {
    const userId = Users.secure.userId(this);
    if (!userId) {
      throw new Meteor.Error('User must be logged in');
    }
    Users.db.update({_id: userId}, {$set: {...newProfile}});
  }
});