import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { getFaker } from '/imports/api/utils/optimized-faker';
import { idExistsInCollection } from '../utils/schema-utils';

export const employeeProfileSchema = new SimpleSchema({
  names: {
    type: String,
    fixture: getFaker().name.findName
  },
  last_names: {
    type: String,
    fixture: getFaker().name.findName
  },
  company_email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    fixture: getFaker().internet.email
  },
  company_sector: {
    type: String,
    fixture: () => "business"
  }
});

export const schema = new SimpleSchema({
  employee_profile: {
    type: employeeProfileSchema,
    optional: true
  },
  emails: {
    type: Array,
    optional: true,
  },
  polygon_wallet_address: {
    type: String,
    optional: true,
  },
  soul_id: {
    type: String,
    optional: true
  },
  'emails.$': {
    type: Object,
    numFixtures: 1,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    fixture: getFaker().internet.email,
  },
  'emails.$.verified': {
    type: Boolean,
    fixture: () => true,
  },
  created_at: {
    type: Date,
    defaultValue: new Date(),
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  heartbeat: {
    type: Date,
    optional: true,
  }, 
});

Meteor.users.attachSchema(schema);

const usersSelectors = {
  findByEmail(email) {
    return { 'emails.address': { $eq: email } };
  },
};

Meteor.users.selectors = usersSelectors;

// since Meteor.users isn't a generic collection, we need to add this
Meteor.users.exists = (_id) => !!Meteor.users.findOne({ _id });

export const db = Meteor.users;
 