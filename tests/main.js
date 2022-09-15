// we need to do this to prevent faker from loading in the client bundle and
// to keep the bundle size small
import { faker } from '@faker-js/faker';
import { setFakerLib } from '/imports/api/utils/optimized-faker';
setFakerLib(faker);

import './collection-utils.test';
import '/imports/api/companies/companies-tests';
import '/imports/api/timeperiods/timeperiods-tests';
import '/imports/api/users/users-tests';
import '/imports/api/badges/badges-tests';
import '/imports/api/attestations/attestations-tests';