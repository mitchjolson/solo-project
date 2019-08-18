import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class EventGuestsItem extends Component {

    checkStatus = (guest) => {
            return (<p>
                        {guest.username}
                        <Button variant='text' size='small' color='secondary' onClick={this.handleRemove}>remove</Button>
                    </p>)
    }

    handleRemove = () => {
        this.props.dispatch({ type: 'EVENT_CREATE_UNINVITE', payload: this.props.guest });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id});
    }


    render() {
        return (
            <>
                {this.checkStatus(this.props.guest)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(EventGuestsItem));
