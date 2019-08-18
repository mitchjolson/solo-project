import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsItem from '../FriendsItem/FriendsItem';
import UsersItem from '../UsersItem/UsersItem';
import PendingItem from '../PendingItem/PendingItem';

class Friends extends Component {

    componentDidMount = () => {
        console.log('Friends page did mount');
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_USERS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_FRIEND_REQUESTS', payload: this.props.reduxStore.user.id })
    }

    render() {
        return (
            <div className='what'>
                <div className='eventGuests'>
                    <h1>Users</h1>
                    <div>
                        {this.props.reduxStore.users.map((user, i) => {
                            return (<UsersItem key={i} user={user} history={this.props.history} />);
                        })}
                    </div>
                </div>
                <div className='eventDetails'>
                    <h1>Friends</h1>
                    <div>
                        {this.props.reduxStore.friends.map((friend, i) => {
                            return (<FriendsItem key={i} friend={friend} history={this.props.history} />);
                        })}
                    </div>
                </div>
                <div className='eventGames'>
                <h1>Requests</h1>
                    <div>
                        {this.props.reduxStore.friendRequests.map((request, i) => {
                            return (<PendingItem key={i} request={request} history={this.props.history} />);
                        })}
                    </div>
                </div>
            </div>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Friends);
