import SimpleSchema from 'simpl-schema';
import { GenericCollection } from '../utils/GenericCollection';
import { idExistsInCollection } from '../utils/schema-utils';
import { Companies } from '../companies/companies-module';

export const schema = new SimpleSchema({
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
    optional: true
  },
  instance: {
    type: Number
  },
  company_id: {
    type: String,
    custom() {
      return idExistsInCollection(Companies.db, this.value);
    }
  }
});

export const db = new GenericCollection('timeperiods');
db.attachSchema(schema);
