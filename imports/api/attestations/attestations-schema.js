import SimpleSchema from 'simpl-schema';
import { GenericCollection } from '../utils/GenericCollection';
import { idExistsInCollection } from '../utils/schema-utils';
import { Badges } from '../badges/badges-module';
import { Users } from '../users/users-module';
import { Companies } from '../companies/companies-module';

const tulMetadataSchema = new SimpleSchema({
  badge_id: {
    type: String,
    custom() {
      return idExistsInCollection(Badges.db, this.value);
    }
  },
  timeperiod_id: {
    type: String,
    custom() {
      return idExistsInCollection(Companies.db, this.value);
    }
  },
  kpi_percentage: {
    type: Number,
    fixture: () => 80
  }
});

export const schema = new SimpleSchema({
  nft_id: {
    type: String,
    optional: true, //TODO this shouldn't be optional forever
    fixture: () => 'XXX',
  },
  
  issuer_id: {
    type: String,
    custom() {
      return idExistsInCollection(Users.db, this.value);
    }
  },
  reciever_id: {
    type: String,
    custom() {
      return idExistsInCollection(Users.db, this.value);
    }
  },
  created_at: {
    type: Date,
    defaultValue: new Date(),
  },
  type: {
    type: String,
    allowedValues: ['tulV1'],
  },
  metadata: {
    type: tulMetadataSchema
  }

});
  

export const db = new GenericCollection('attestations');
db.attachSchema(schema);
