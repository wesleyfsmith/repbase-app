import SimpleSchema from 'simpl-schema';

// this lets us support faker field on schemas
SimpleSchema.extendOptions(['fixture', 'numFixtures']);

export const idExistsInCollection = (collection, _id) => !!(collection).findOne({ _id });

// const getFixtureForArrayFormat = (subSchema, field) => {
//   const document = {};
//   Object.keys(subSchema).forEach((key) => {
//     console.log({ key1: key });
//     if (key.startsWith(`${field}.$`)) {
//       console.log({ key });
//       const dollarCharIndex = key.indexOf('$');
//       const subField = key.substring(dollarCharIndex + 2, key.length);
//       document[subField] = subSchema[key].fixture();
//     }
//   });
//   return document;
// };

const getFixtureForArrayElement = (subSchema, keyName) => {
  let fixture = null;
  Object.keys(subSchema).forEach((key) => {
    if (key === `${keyName}.$`) {
      fixture = subSchema[key].fixture;
    }
  });
  return fixture;
};

const getNumberOfElements = (subSchema, keyName, numElements) => {
  const fixture = getFixtureForArrayElement(subSchema, keyName);
  const results = [];
  // this prevents duplicates being sampled
  for (let i = 0; true; i++) {
    const generatedElement = fixture();
    if (!results.includes(generatedElement)) {
      results.push(generatedElement);
      if (results.length === numElements) {
        return results;
      }
    }
    if (i > 100) {
      throw new Error('getNumberOfElements has run 100 times, somethign is wrong');
    }
  }
};

export const generateFromSchema = (schema) => {
  const fakeDocument = {};
  const subSchema = schema._schema;
  Object.keys(subSchema).forEach((key) => {
    if (subSchema[key].numFixtures) {
      fakeDocument[key] = getNumberOfElements(subSchema, key, subSchema[key].numFixtures);
    } else if (!key.includes('$') && subSchema[key].fixture) {
      fakeDocument[key] = subSchema[key].fixture();
    }
  });
  return fakeDocument;
};
