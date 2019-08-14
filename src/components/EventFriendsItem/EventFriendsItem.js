import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class EventFriendsItem extends Component {

    checkStatus = (friend) => {
        if(friend.status === 'accepted'){
            for( let i=0; i<this.props.reduxStore.eventCreateGuests.length; i++ ){
                if(friend.username === this.props.reduxStore.eventCreateGuests[i].username){
                    return '';
                }
            }
            return (<li>
                        {friend.username}
                        <button onClick={this.handleInvite}>Invite</button>
                    </li>)
        }
    }

    handleInvite = () => {
        this.props.dispatch({ type: 'EVENT_CREATE_INVITE', payload: this.props.friend });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id});
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

export default connect(mapStateToProps)(EventFriendsItem);
