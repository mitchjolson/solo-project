import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventGuestsItem extends Component {

    checkStatus = (guest) => {
            return (<li>
                        {guest.username}
                        <button onClick={this.handleRemove}>remove</button>
                    </li>)
    }

    handleRemove = () => {
        this.props.dispatch({ type: 'EVENT_CREATE_UNINVITE', payload: this.props.guest });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id});
    }


    render() {
        return (
            <>
                {this.checkStatus(this.props.guest)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(EventGuestsItem);
