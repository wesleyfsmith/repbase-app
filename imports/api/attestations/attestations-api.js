import { registerMethods } from '../utils/register-methods';
import { Attestations } from './attestations-module';
import { Users } from '../users/users-module';

export const api = registerMethods('attestations', {
  create(attestation) {
    //TODO check user has correct role to make attestation
    //TODO create 3x attestation automatically
    attestation.issuer_id = Users.secure.userId(this);
    return Attestations.db.insert(attestation);
  },
  update() {
    // TODO talk to luigi about attestation type updates
  },
  read(_id) {
    return Attestations.db.findOne(_id);
  }

});