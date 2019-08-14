import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import userCollection from './userCollectionReducer';
import searchGame from './searchGameReducer';
import gameDetails from './gameDetailsReducer';
import collectionView from './collectionViewReducer';
import friends from './friendsReducer';
import friendCollection from './friendCollectionReducer';
import friendLog from './friendLogReducer';
import users from './usersReducer';
import friendRequests from './friendRequestsReducer';
import eventCreateGuests from './eventCreateGuestsReducer';
import eventCreateGames from './eventCreateGamesReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  userCollection,
  searchGame,
  gameDetails,
  collectionView,
  friends,
  friendCollection,
  friendLog,
  users,
  friendRequests,
  eventCreateGuests,
  eventCreateGames,
});

export default rootReducer;
