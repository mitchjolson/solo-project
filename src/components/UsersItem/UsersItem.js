import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class UsersItem extends Component {

    handleAdd = () => {
        let data = {
            user1: this.props.reduxStore.user.id,
            user2: this.props.user
        }
        this.props.dispatch({ type: 'SEND_FRIEND_REQUEST', payload: data })
        // this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id })
    }

    checkUser = (user) => {
        const friends = this.props.reduxStore.friends;
        for(let i=0; i < friends.length; i++){
            if( user.username === friends[i].username && friends[i].status === 'accepted'){
                return <></>;
            }
            else if (user.username === friends[i].username && friends[i].status === 'pending') {
                return <p>
                        {this.props.user.username} - (request pending)
                    </p>
            }
        }
        return <p>
                    {this.props.user.username} - 
                    <Button variant='text' size='small' color='primary' onClick = {this.handleAdd}>Send Request</Button>
                </p>
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

export default connect(mapStateToProps)(withStyles(styles)(UsersItem));
