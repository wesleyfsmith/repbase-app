import { registerMethods } from '../utils/register-methods';
import { Attestations } from './attestations-module';

export const api = registerMethods('attestations', {
  create(attestation) {
    return Attestations.db.insert(attestation);
  },
  update() {
    // TODO talk to luigi about attestation type updates
  },
  read(_id) {
    return Attestations.db.findOne(_id);
  }

});