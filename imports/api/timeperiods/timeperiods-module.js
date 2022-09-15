import { db, schema } from './timeperiods-schema';
import { api } from './timeperiods-api';
import { fixtures } from './timeperiods-fixtures';

export const TimePeriods = {
  db,
  schema,
  api,
  fixtures
};
