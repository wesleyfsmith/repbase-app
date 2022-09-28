import { Badges } from './badges-module';
import { getFaker } from '/imports/api/utils/optimized-faker';

export const fixtures = {
  generateAllBadges() {
    Badges.db.insert({
      name: 'Bronce',
      description: getFaker().lorem.paragraph(),
      reward: 25 
    });
    Badges.db.insert({
      name: 'Oro',
      description: getFaker().lorem.paragraph(),
      reward: 100
    });
    Badges.db.insert({
      name: 'Plata',
      description: getFaker().lorem.paragraph(),
      reward: 50
    });
    Badges.db.insert({
      name: 'Platino',
      description: getFaker().lorem.paragraph(),
      reward: 200
    });
    Badges.db.insert({
      name: 'Bronce 3X',
      description: getFaker().lorem.paragraph(),
      reward: 25 * 3
    });
    Badges.db.insert({
      name: 'Oro 3X',
      description: getFaker().lorem.paragraph(),
      reward: 100 * 3
    });
    Badges.db.insert({
      name: 'Plata 3X',
      description: getFaker().lorem.paragraph(),
      reward: 50 * 3
    });
    Badges.db.insert({
      name: 'Platino 3X',
      description: getFaker().lorem.paragraph(),
      reward: 200 * 3
    });
  }
};