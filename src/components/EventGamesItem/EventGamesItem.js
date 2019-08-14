import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventGamesItem extends Component {

    checkStatus = (game) => {
        for( let i=0; i<this.props.reduxStore.eventCreateGames.length; i++ ){
            if(game.atlas_id === this.props.reduxStore.eventCreateGames[i].atlas_id){
                return '';
            }
        }
        return (<li>
                    {game.name}
                    <button onClick={this.handleAddGame}>Add</button>
                </li>)
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

export default connect(mapStateToProps)(EventGamesItem);
