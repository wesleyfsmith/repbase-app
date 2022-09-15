import { db, schema } from './badges-schema';
import { api } from './badges-api';
import { fixtures } from './badges-fixtures';

export const Badges = {
  db,
  schema,
  api,
  fixtures
};
