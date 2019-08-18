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

class CollectionItemList extends Component {

    handleAdd = () => {
        const data = {event_id: this.props.reduxStore.eventID, game_id: this.props.game.atlas_id, user_id: this.props.reduxStore.user.id};
        this.props.dispatch({ type: 'ADD_EVENT_GAME', payload: data })
    }

    render() {
        return (
            <>
            <p>
                {this.props.game.name}  
                <Button size='small' variant='text' color='primary' onClick={this.handleAdd}>Add</Button>
            </p>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(withStyles(styles)(CollectionItemList));
