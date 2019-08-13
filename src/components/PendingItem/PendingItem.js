import React, { Component } from 'react';
import { connect } from 'react-redux';

class PendingItem extends Component {

    checkStatus = (friend) => {
        if(friend.status === 'pending'){
            return (<li>
                        {this.props.friend.username}
                        <button onClick={this.acceptRequest}>Accept</button>
                        <button onClick={this.denyRequest}>Ignore</button>
                    </li>)
        }
    }
    acceptRequest = () => {
        console.log('accepted');
    }

    denyRequest = () => {
        console.log('denied');
    }

    handleCollection = () => {
        this.props.dispatch({ type: 'FETCH_FRIEND_COLLECTION', payload: this.props.friend.friend_id })
        this.props.dispatch({ type: 'FETCH_FRIEND_LOG', payload: this.props.friend.friend_id })
        this.props.history.push('/friendcollection')
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

export default connect(mapStateToProps)(PendingItem);
