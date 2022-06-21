import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { meteorWrapPromiseFunction } from './server-utils';

export class GenericCollection extends Mongo.Collection {
  exists(id) {
    return !!this.findOne({ _id: id });
  }

  sample(size) {
    const aggregatePromise = this.rawCollection().aggregate([{ $sample: { size } }]).toArray();
    return Promise.await(aggregatePromise);
  }

  selectSample(selector, size) {
    const aggregatePromise = this.rawCollection().aggregate([
      { $match: selector },
      { $sample: { size } },
    ]).toArray();
    return Promise.await(aggregatePromise);
  }
}
