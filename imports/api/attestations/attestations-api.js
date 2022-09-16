import { registerMethods } from '../utils/register-methods';
import { Attestations } from './attestations-module';
import { Users } from '../users/users-module';
import { Badges } from '../badges/badges-module';

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
  },
  getAttestationCounts() {
    const badges = Badges.db.find().fetch();
    const results = [];
    badges.forEach((badge) => {
      const count = Attestations.db.find({badge_id: badge._id}).fetch().length;
      results.push({
        name: badge.name,
        attestationCount: count,
        tokens: badge.reward * count
      });
    });
    return results;
  },

});