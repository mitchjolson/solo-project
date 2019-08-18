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

class EventAgendaItem extends Component {

    checkStatus = (game) => {
            return (<p>
                        {game.name}
                        <Button variant='text' color='secondary' onClick={this.handleRemove}>remove</Button>
                    </p>)
    }

    handleRemove = () => {
        this.props.dispatch({ type: 'EVENT_CREATE_REMOVE_GAME', payload: this.props.game });
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id});
    }


    render() {
        return (
            <>
                {this.checkStatus(this.props.game)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(EventAgendaItem));
