import React, { Component } from 'react';
import { connect } from 'react-redux';

class FriendsItem extends Component {

    checkStatus = (friend) => {
        if(friend.status === 'accepted'){
            return (<li>
                        {this.props.friend.username}
                        <button onClick={this.handleCollection}>Collection</button>
                        <button onClick={this.handleRemove}>Remove</button>
                    </li>)
        }
    }

    handleCollection = () => {
        this.props.dispatch({ type: 'FETCH_FRIEND_COLLECTION', payload: this.props.friend.friend_id });
        this.props.dispatch({ type: 'FETCH_FRIEND_LOG', payload: this.props.friend.friend_id });
        this.props.history.push('/friendcollection');
    }

    handleRemove = () => {
        const data = {
            friend: this.props.friend,
            user: this.props.reduxStore.user,
        }
        this.props.dispatch({ type: 'REMOVE_FRIEND', payload: data });
    }

    render() {
        return (
            <>
                {this.checkStatus(this.props.friend)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(FriendsItem);
