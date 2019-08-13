import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categorize from '../Categorize/Categorize'

class SearchGamesItem extends Component {


    // handleDelete = () => {
    //     this.props.dispatch({ type: 'DELETE_ANIMAL', payload: this.props.classData.id });
    // }

    handleAdd = () => {
        let myPayload = {
            game: this.props.game,
            user: this.props.reduxStore.user.id
        }
        console.log('adding game, payload is:', myPayload)
        this.props.dispatch({type: 'ADD_GAME', payload: myPayload});
    }

    handleDetails = () => {
        const gameDeets = {
            atlas_id: this.props.game.id,
            category: this.whyTho(this.props.game.categories[0]),
            description: this.props.game.description_preview,
            image: this.props.game.images.medium,
            max_players: this.props.game.max_players,
            min_players: this.props.game.min_players,
            name: this.props.game.name,
            playtime: this.props.game.max_playtime,
            publisher: this.props.game.publishers[0],
            rating: this.props.game.average_user_rating,
            year_published: this.props.game.year_published
        }
        this.props.dispatch({type: 'SET_GAME_DETAILS', payload: gameDeets});
        this.props.dispatch({ type: 'SET_GAME_SEARCH', payload: [] });
        this.props.history.push('/gamedetails');
    }

    whyTho = (game) => {
        let name = game ? game.id : "";
        return Categorize(name);
    }

    render() {
        return (
            <tr>
                <td>{this.props.game.name}</td>
                <td>{this.whyTho(this.props.game.categories[0])}</td>
                <td>{this.props.game.min_players} - {this.props.game.max_players}</td>
                <td>{this.props.game.min_playtime} - {this.props.game.max_playtime}</td>
                <td>{this.props.game.year_published}</td>
                <td>{this.props.game.publishers[0]}</td>
                <td><button onClick={this.handleDetails}>Details</button></td>
                <td><button onClick={this.handleAdd}>Add</button></td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(SearchGamesItem);
