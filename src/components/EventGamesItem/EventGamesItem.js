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

class EventGamesItem extends Component {

    checkStatus = (game) => {
        for( let i=0; i<this.props.reduxStore.eventCreateGames.length; i++ ){
            if(game.atlas_id === this.props.reduxStore.eventCreateGames[i].atlas_id){
                return '';
            }
        }
        return (<p>
                    {game.name}
                    <Button variant='text' size='small' color='primary' onClick={this.handleAddGame}>Add</Button>
                </p>)
    }

    handleAddGame = () => {
        this.props.dispatch({ type: 'EVENT_CREATE_ADD_GAME', payload: this.props.game });
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });    }

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

export default connect(mapStateToProps)(withStyles(styles)(EventGamesItem));
