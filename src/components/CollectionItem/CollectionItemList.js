import React, { Component } from 'react';
import { connect } from 'react-redux';

class CollectionItemList extends Component {

    handleAdd = () => {
        const data = {event_id: this.props.reduxStore.eventID, game_id: this.props.game.atlas_id, user_id: this.props.reduxStore.user.id};
        this.props.dispatch({ type: 'ADD_EVENT_GAME', payload: data })
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