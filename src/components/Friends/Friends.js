import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsItem from '../FriendsItem/FriendsItem';

class Friends extends Component {

    componentDidMount = () => {
        console.log('Friends page did mount');
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_USERS', payload: this.props.reduxStore.user.id });
    }

    render() {
        return (
            <>
                <h1>Friends</h1>
                    <ul>
                        {this.props.reduxStore.friends.map((friend, i) => {
                            return (<FriendsItem key={i} friend={friend} history={this.props.history} />);
                        })}
                    </ul>
                <h1>Users</h1>
                <ul>
                    
                </ul>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Friends);
