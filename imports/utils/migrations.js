import { Users } from '../users/users-module';

Migrations.add({
  version: 1,
  up() {
    Users.db.find().forEach((user) => {
      if (!user.wallet_ids) {
        Users.db.update(user._id, { $set: { wallet_ids: [] } });
      }
    });
  },
  down() {
  },
});
