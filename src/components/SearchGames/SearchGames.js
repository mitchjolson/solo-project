import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchGamesItem from '../SearchGamesItem/SearchGamesItem'

class SearchGames extends Component {

    state = {
        search: '',
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id })
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            [propToChange]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'SEARCH_GAMES', payload: this.state.search });
        this.setState({
            search: '',
        })
    }

    render() {
        return (
            <>
            <p>Search</p>
            <form onSubmit={this.handleSubmit}>
                <label>Game Title: </label>
                <input type="text" value={this.state.search} onChange={(event) => this.handleChangeFor(event, 'search')} />
                <button type="submit">Search</button>
            </form>
            <table className="collectionTable">
                <thead>
                    <tr><th>Game</th><th>Category</th><th>Players</th><th>Playtime</th><th>Year</th><th>Publisher</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.searchGame.map((game, i) => {                            
                        return (<SearchGamesItem key={i} game={game} history={this.props.history}/>);
                    })}
                </tbody>
            </table>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(SearchGames);
