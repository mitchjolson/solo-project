import React, { Component } from 'react';
import { connect } from 'react-redux';

class CollectionItemList extends Component {

    handleAdd = () => {
        this.props.dispatch({ type: 'SET_GAME_DETAILS', payload: this.props.game })
        this.props.history.push('/gamedetails')
    }

    render() {
        return (
            <>
            <li>
                {this.props.game.name}
                <button onClick={this.handleAdd}>Add</button>
            </li>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(CollectionItemList);