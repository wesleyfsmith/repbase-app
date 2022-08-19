import { Meteor } from "meteor/meteor";

export const PublicationMap = {};

export const registerPublications = (moduleName, publications) => {

  const subscriptionNames = {};

  Object.keys(publications).forEach((key) => {
    // publication name to avoid collisions
    const publicationName = `${moduleName}.${key}`;
    PublicationMap[publicationName] = publications[key];
    subscriptionNames[key] = publicationName;
    if (Meteor.isServer) {
      Meteor.publish(publicationName, function(args) {
        if (publications[key].validate(args)) {
          return publications[key].cursor(args);
        } else {
          throw new Meteor.Error('Publication not permitted')
        }
      });
    }
  });
  
  return subscriptionNames;
}