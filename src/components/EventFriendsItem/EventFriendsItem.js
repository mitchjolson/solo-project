import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

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

class EventFriendsItem extends Component {

    checkStatus = (friend) => {
        if(friend.status === 'accepted'){
            for( let i=0; i<this.props.reduxStore.eventCreateGuests.length; i++ ){
                if(friend.username === this.props.reduxStore.eventCreateGuests[i].username){
                    return '';
                }
            }
            return (<p>
                        {friend.username}
                        <Button variant='text' color='primary' onClick={this.handleInvite}>Invite</Button>
                    </p>)
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

export default connect(mapStateToProps)(withStyles(styles)(EventFriendsItem));
