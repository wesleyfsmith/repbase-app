import { db, schema } from './companies-schema';
import { api } from './companies-api';
import { fixtures } from './companies-fixtures';
// import { fixtures } from './attestation-types-fixtures';

export const Companies = {
  db,
  schema,
  api,
  fixtures
};
