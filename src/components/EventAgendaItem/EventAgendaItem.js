import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventAgendaItem extends Component {

    checkStatus = (game) => {
            return (<li>
                        {game.name}
                        <button onClick={this.handleRemove}>remove</button>
                    </li>)
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

export default connect(mapStateToProps)(EventAgendaItem);
