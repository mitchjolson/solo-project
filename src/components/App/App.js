import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import Collection from '../Collection/Collection';
import SearchGames from '../SearchGames/SearchGames';
import GameDetails from '../GameDetails/GameDetails';
import Friends from '../Friends/Friends';
import FriendCollection from '../FriendCollection/FriendCollection';
import Events from '../Events/Events';
import EventCreate from '../EventCreate/EventCreate';
import EventDetails from '../EventDetails/EventDetails';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/collection"
              component={Collection}
            />
            <ProtectedRoute
              exact
              path="/search"
              component={SearchGames}
            />
            <ProtectedRoute
              exact
              path="/gamedetails"
              component={GameDetails}
            />
            <ProtectedRoute
              exact
              path="/friends"
              component={Friends}
            />
            <ProtectedRoute
              exact
              path="/friendcollection"
              component={FriendCollection}
            />
            <ProtectedRoute
              exact
              path="/events"
              component={Events}
            />
            <ProtectedRoute
              exact
              path="/eventcreate"
              component={EventCreate}
            />
            <ProtectedRoute
              exact
              path="/eventdetails"
              component={EventDetails}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
