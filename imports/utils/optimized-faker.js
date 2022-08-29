// probably a better way to do this, but this will keep faker js from being exported to the client

import { Meteor } from 'meteor/meteor';

let fakerLib = null;

export const setFakerLib = (fakerLibrary) => {
  if (Meteor.isClient) {
    throw new Meteor.Error('Faker should not be loaded/set on the client! Keep the bundle small!');
  }
  fakerLib = fakerLibrary;
};

export const getFaker = () => {
  console.log({fakerLib})

  if (!fakerLib) {
    return {
      name: {
        findName() {},
      },
      lorem: {
        sentences() {},
        words() {},
      },
      internet: {
        userName() {},
        email() {},
      },
      commerce: {
        price() {},
      },
      music: {
        genre() {},
      },
    };
  }
  console.log({fakerLib})
  return fakerLib;
};
