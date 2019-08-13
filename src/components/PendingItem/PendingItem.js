import React, { Component } from 'react';
import { connect } from 'react-redux';

class PendingItem extends Component {

    acceptRequest = () => {
        this.props.dispatch({ type: 'APPROVE_FRIEND_REQUEST', payload: this.props.request })
    }

    denyRequest = () => {
        this.props.dispatch({ type: 'DENY_FRIEND_REQUEST', payload: this.props.request })
    }

    // NEED TO DO A DIFFERENT GET HERE TO ONLY VIEW REQUESTS THAT WERE SENT BY OTHERS, NOT REQUESTS SENT BY ME

    handleCollection = () => {
        this.props.dispatch({ type: 'FETCH_FRIEND_COLLECTION', payload: this.props.request.friend_id })
        this.props.dispatch({ type: 'FETCH_FRIEND_LOG', payload: this.props.request.friend_id })
        this.props.history.push('/friendcollection')
    }

    render() {
        return (
            <>
                <li>
                    {this.props.request.username}
                    <button onClick={this.acceptRequest}>Accept</button>
                    <button onClick={this.denyRequest}>Ignore</button>
                </li>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(PendingItem);
