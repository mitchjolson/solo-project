import React, { Component } from 'react';
import { connect } from 'react-redux';


class Events extends Component {

    componentDidMount() {
        console.log('events component mounted');
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_EVENTS', payload: this.props.reduxStore.user.id});
    }

    handleCreate = () => {
        this.props.history.push('/eventcreate')
    }

    render() {
        return (
            <>
            <div>
                <h1>Events</h1>
                <button onClick = {this.handleCreate}>Create an Event</button>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(Events);
