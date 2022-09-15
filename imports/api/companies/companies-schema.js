import SimpleSchema from 'simpl-schema';
import { GenericCollection } from '../utils/GenericCollection';

export const schema = new SimpleSchema({
  name: {
    type: String,
    fixture: () => 'TUL',
  },
});

export const db = new GenericCollection('companies');
db.attachSchema(schema);
