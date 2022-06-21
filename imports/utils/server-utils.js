import { Meteor } from 'meteor/meteor';

export const meteorWrapPromiseFunction = (fn) => Meteor.wrapAsync((...args) => {
  const callback = args.pop();
  fn(...args)
    .then((...result) => {
      callback(null, ...result);
    })
    .catch((err) => {
      callback(err);
    });
});
