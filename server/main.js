import { Meteor } from 'meteor/meteor';
import { faker } from '@faker-js/faker';
import { setFakerLib } from '/imports/api/utils/optimized-faker';

setFakerLib(faker);
require('../imports/startup/server-startup.js');
