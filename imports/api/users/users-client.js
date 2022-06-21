import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { useCallback } from 'react';
import { useCallbackWithArgs, useApi, useMethod3 } from '../utils/client-utils';

export const client = {
  currentUser: () => useTracker(() => Meteor.user()),
  loggingIn: () => useTracker(() => Meteor.loggingIn()),
  currentUserId: () => useTracker(() => Meteor.userId()),
};

// export const useCreateUserWithPassword = () => useApi(Accounts.createUser);

// export const useLoginWithPassword = () => useCallbackWithArgs(Meteor.loginWithPassword);

// export const useLoginWithFacebook = () => useApi(Meteor.loginWithFacebook);

// export const useUpdateArtistProfile = () => useMethod3('updateArtistProfile');

// export const useGetArtistProfile = () => useMethod3('getArtistProfile');

// export const useGetArtistSignupStage = () => useMethod3('getArtistSignupStage');
