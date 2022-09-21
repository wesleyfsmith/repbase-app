import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { UsersCollection, Users } from './users-schema';
import { registerMethods } from '../utils/register-methods';
import { sendEmail } from '../utils/send-email';

// these are client only, to make our api consistent due to meteor quirks
// generally speaking, we want the users collection to stay minimal because it has unique constraints
// that are different from other types of collections
export const api = {
  loginWithPassword: {
    async call(args, callback) {
      console.log(args);
      Meteor.loginWithPassword(args.email, args.password, callback);
    },
  },
  createUserWithPassword: {
    async call(args, callback) {
      const user = Accounts.createUser(args, callback);
    },
  },
  changePassword: {
    async call(args, callback) {
      Accounts.changePassword(args.oldPassword, args.newPassword, callback);
    }
  },
  loginWithGoogle: {
    call() {
      Meteor.loginWithGoogle({
        requestPermissions: ['email'],
      }, (err) => {
        if (err) {
          // handle error
        } else {
          // successful login!
        }
      });
    },
  },
};

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {

    if (options.profile.account_type === 'employee') {
      user.employee_profile = {
        names: options.profile.names,
        last_names: options.profile.last_names,
        company_email: options.profile.company_email,
        company_sector: options.profile.company_sector
      },
      user.roles = ['employee']
    }
    if (options.profile.account_type === 'manager') {
      user.roles = ['manager']
    }

      
      //TODO verify both addresses? 
      sendEmail(
      'verify_email',
      user.emails[0].address,
      {
        verify_email_link: `${Meteor.absoluteUrl()}verify/${user._id}`,
      },
    );
    return user;
  });
}
