import { Meteor } from 'meteor/meteor';

export const registerMethods = (moduleName, methods) => {
  const methodObj = {};

  const apiObj = {};
  Object.keys(methods).forEach((key) => {
    // method name to avoid collisions
    const methodName = `${moduleName}.${key}`;
    methodObj[methodName] = methods[key];

    apiObj[key] = {
      call(args, callback) {
        return Meteor.call(methodName, args, callback);
      },
    };
  });
  // for now, only register methods on the server
  // if (Meteor.isServer) {
    Meteor.methods(methodObj);
  // }
  return apiObj;
};
