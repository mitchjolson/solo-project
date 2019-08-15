import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import fetchUserCollectionSaga from './fetchUserCollectionSaga';
import searchGamesSaga from './searchGamesSaga';
import addGameSaga from './addGameSaga';
import removeGameSaga from './removeGameSaga';
import fetchFriendCollectionSaga from './fetchFriendCollectionSaga';
import fetchFriendsSaga from './fetchFriendsSaga';
import fetchFriendLogSaga from './fetchFriendLogSaga';
import fetchUsersSaga from './fetchUsersSaga';
import friendRequestSaga from './friendRequestSaga';
import fetchFriendRequestsSaga from './fetchFriendRequestsSaga';
import approveFriendSaga from './approveFriendSaga';
import denyFriendSaga from './denyFriendSaga';
import removeFriendSaga from './removeFriendSaga';
import createEventSaga from './createEventSaga';
import fetchEventsSaga from './fetchEventsSaga';
import fetchEventDetailsSaga from './fetchEventDetailsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    fetchUserCollectionSaga(),
    searchGamesSaga(),
    addGameSaga(),
    removeGameSaga(),
    fetchFriendsSaga(),
    fetchFriendCollectionSaga(),
    fetchFriendLogSaga(),
    fetchUsersSaga(),
    friendRequestSaga(),
    fetchFriendRequestsSaga(),
    approveFriendSaga(),
    denyFriendSaga(),
    removeFriendSaga(),
    createEventSaga(),
    fetchEventsSaga(),
    fetchEventDetailsSaga(),
  ]);
}