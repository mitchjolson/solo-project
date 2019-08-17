import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

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
        this.props.dispatch({ type: 'SET_FRIEND', payload: this.props.friend.username });
        this.props.history.push('/friendcollection');
    }

    handleRemove = () => {
    //     const data = {
    //         friend: this.props.friend,
    //         user: this.props.reduxStore.user,
    //     }
    //     this.props.dispatch({ type: 'REMOVE_FRIEND', payload: data });
    // }
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove ${this.props.friend.username} from your friend list.`,
            type: 'warning',
                showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, remove them!'
            }).then((result) => {
                const data = {
                    friend: this.props.friend,
                    user: this.props.reduxStore.user,
                }
                this.props.dispatch({ type: 'REMOVE_FRIEND', payload: data });
            }
            )}


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
