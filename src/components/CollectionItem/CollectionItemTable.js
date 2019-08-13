import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categorize from '../Categorize/Categorize'

class CollectionItemTable extends Component {

    handleDetails = () => {
        this.props.dispatch({ type: 'SET_GAME_DETAILS', payload: this.props.game })
        this.props.history.push('/gamedetails')
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            <tr>
                <td>{this.props.game.name}</td>
                <td>{Categorize(this.props.game.category)}</td>
                <td>{this.props.game.min_players} - {this.props.game.max_players}</td>
                <td>{this.props.game.playtime}</td>
                <td>{Math.round(this.props.game.rating * 100) / 100}</td>
                <td><button onClick={this.handleDetails}>Details</button></td>
            </tr>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(CollectionItemTable);
