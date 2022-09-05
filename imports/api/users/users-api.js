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
    call(args, callback) {
      Meteor.loginWithPassword(args.email, args.password, callback);
    },
  },
  createUserWithPassword: {
    async call(args, callback) {
      const user = Accounts.createUser(args, callback);
      // if (Meteor.isServer) {
      //   await sendEmail(
      //     'verify_email',
      //     args.email,
      //     {
      //       verify_email_link: `${Meteor.absoluteUrl()}/verify/${user.id}`,
      //     },
      //   );
      // }
    },
  },
  loginWithFacebook: {

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
    
    if (user.profile) {
      user.employee_profile = {
        names: options.profile.names,
        last_names: options.profile.last_names,
        company_email: options.profile.company_email,
        company_sector: options.profile.company_sector
      }
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
