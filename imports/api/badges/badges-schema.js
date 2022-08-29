import SimpleSchema from 'simpl-schema';
import { getFaker } from '/imports/api/utils/optimized-faker';
import { GenericCollection } from '../utils/GenericCollection';
import { idExistsInCollection } from '../utils/schema-utils';
import { Users } from '../users/users-module';

export const schema = new SimpleSchema({
  name: {
    type: String,
    fixture: () => "KPI",
  },
  description: {
    type: String,
    fixture: () => getFaker().lorem.paragraph()
  },
  reward: {
    type: Number,
    fixture: () => 100
  }
});

export const db = new GenericCollection('badges');
db.attachSchema(schema);
