import SimpleSchema from 'simpl-schema';
import { getFaker } from '/imports/api/utils/optimized-faker';
import { GenericCollection } from '../utils/GenericCollection';
import { idExistsInCollection } from '../utils/schema-utils';
import { Badges } from '../badges/badges-module';
import { Users } from '../users/users-module';

export const schema = new SimpleSchema({
   nft_id: {
    type: String,
    optional: true, //TODO this shouldn't be optional forever
    fixture: () => "XXX",
  },
  badge_id: {
    type: String,
    custom() {
      return idExistsInCollection(Badges.db, this.value);
    }
  },
  created_by_id: {
    type: String,
    custom() {
      return idExistsInCollection(Users.db, this.value);
    }
  },
  owner_id: {
    type: String,
    custom() {
      return idExistsInCollection(Users.db, this.value);
    }
  },
  created_at: {
    type: Date,
    defaultValue: new Date(),
  },
  start_interval: {
    type: Date,
    defaultValue: new Date(),
  },
  end_interval: {
    type: Date,
    defaultValue: new Date(),
  }
});
  

export const db = new GenericCollection('attestations');
db.attachSchema(schema);
