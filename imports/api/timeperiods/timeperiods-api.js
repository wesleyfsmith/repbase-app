import { registerMethods } from '../utils/register-methods';
import { TimePeriods } from './timeperiods-module';

export const api = registerMethods('timeperiods', {
  create(badge) {
    return Badges.db.insert(badge);
  },
  update() {
    // TODO talk to luigi about attestation type updates
  },
  read(_id) {
    return Badges.db.findOne(_id);
  }

});