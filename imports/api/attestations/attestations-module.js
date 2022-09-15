import { db, schema } from './attestations-schema';
import { api } from './attestations-api';
import { fixtures } from './attestations-fixtures';

export const Attestations = {
  db,
  schema,
  api,
  fixtures
};
