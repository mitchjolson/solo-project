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
                <p>
                    {this.props.request.username} - 
                    <Button variant='text' size='small' color='primary' onClick={this.acceptRequest}>Accept</Button>
                     - 
                    <Button variant='text' size='small' color='secondary' onClick={this.denyRequest}>Ignore</Button>
                </p>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(PendingItem));
