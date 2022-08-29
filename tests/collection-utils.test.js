import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect } from 'chai';
import { GenericCollection } from '../imports/api/utils/GenericCollection';

/* eslint-disable func-names, prefer-arrow-callback */

describe('Collection Utils', function() {
  if (Meteor.isServer) {
    const collection = new GenericCollection('test');
    beforeEach(function() {
      resetDatabase();
      // collection = new GenericCollection('test');
      for (let i = 0; i < 10; i++) {
        collection.insert({ number: i });
      }
    });
    it('should know if a document exists', function() {
      const doc = collection.findOne();
      expect(collection.exists(doc._id)).to.equal(true);
    });
    it('should know if a document does not exist', function() {
      const doc = collection.findOne('some id');
      expect(collection.exists('some id')).to.equal(false);
    });
    it('should return a random sample', async function() {
      const sample = collection.sample(2);
      sample.forEach((doc) => {
        expect(sample).to.deep.include(doc);
      });
    });
    it('should return the correct sample size', async function() {
      const sample = collection.sample(5);
      expect(sample.length).to.equal(5);
    });
    it('should return with the correct selector', async function() {
      // inset a duplicate
      collection.insert({ number: 0 });
      const sample = collection.selectSample({ number: { $eq: 0 } }, 1);
      expect(sample.length).to.equal(1);

      sample.forEach((doc) => {
        expect(doc.number).to.equal(0);
      });

      const secondSample = collection.selectSample({ number: { $eq: 0 } }, 2);
      expect(secondSample.length).to.equal(2);

      const thirdSample = collection.selectSample({ number: { $eq: 0 } }, 3);
      expect(thirdSample.length).to.equal(2);

      thirdSample.forEach((doc) => {
        expect(doc.number).to.equal(0);
      });
    });
  }
});
