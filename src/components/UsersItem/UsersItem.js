import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersItem extends Component {

    handleAdd = () => {
        let data = {
            user1: this.props.reduxStore.user.id,
            user2: this.props.user
        }
        this.props.dispatch({ type: 'SEND_FRIEND_REQUEST', payload: data })
    }

    checkUser = (user) => {
        const friends = this.props.reduxStore.friends;
        for(let i=0; i < friends.length; i++){
            if( user.username === friends[i].username && friends[i].status === 'accepted'){
                return <></>;
            }
            else if (user.username === friends[i].username && friends[i].status === 'pending') {
                return <li>
                        {this.props.user.username} (request pending)
                    </li>
            }
        }
        return <li>
                    {this.props.user.username}
                    <button onClick = {this.handleAdd}>Send Friend Request</button>
                </li>
    }

    render() {
        return (
            <>
                {this.checkUser(this.props.user)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(UsersItem);
