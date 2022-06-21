// TOP LEVEL API object for importing
// TODO clean this up when imports are done
import { Meteor } from 'meteor/meteor';
import { db, schema } from './users-schema';
import { api } from '/imports/api/users/users-api';
import { fixtures } from '/imports/api/users/users-fixtures';
import { client } from '/imports/api/users/users-client';

let mockedUserId = '';

export const Users = {
  db,
  schema,
  api,
  client,
  fixtures,
  secure: {
    userId(methodInvocation) {
      if (Meteor.isTest || Meteor.isRunningFixtures) {
        return mockedUserId;
      }
      if (!methodInvocation) {
        throw new Meteor.Error('Calling userId() without "this" from method, must pass "this" from method function');
      }
      return methodInvocation.userId;
    },
  },
  test: {
    loginAsUser(userId) {
      if (!Meteor.isServer) {
        throw new Meteor.Error('Users.test.loginAsUser should only be called server side');
      }
      if (Meteor.isTest || Meteor.isRunningFixtures) {
        if (mockedUserId === userId) {
          throw new Meteor.Error('You are logging in as the same user twice. This is probably a mistake in your test code.');
        }
        mockedUserId = userId;
      }
      // if (Meteor.isProduction) {
      //   throw new Meteor.Error('Users.test.loginAsUser should never be called in a production environment!');
      // }
    },
    logoutUser() {
      if (!Meteor.isServer) {
        throw new Meteor.Error('Users.test.logoutUser should only be called server side');
      }
      if (Meteor.isTest || Meteor.isRunningFixtures) {
        mockedUserId = undefined;
      }
      // if (Meteor.isProduction) {
      //   throw new Meteor.Error('Users.test.logoutUser should never be called in a production environment!');
      // }
    },
  },
};
