import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventsItem from '../EventsItem/EventsItem';

class EventDetails extends Component {

    componentDidMount() {
        console.log('eventDetails component mounted');
        this.props.dispatch({ type: 'FETCH_EVENT_DETAILS', payload: this.props.reduxStore.eventID });
        this.props.dispatch({ type: 'FETCH_EVENT_GUESTS', payload: this.props.reduxStore.eventID });
        this.props.dispatch({ type: 'FETCH_EVENT_GAMES', payload: this.props.reduxStore.eventID });
    }

    handleCreate = () => {
        this.props.history.push('/eventcreate')
    }

    render() {
        return (
            <>
            <div>
                <h1>Event Details</h1>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(EventDetails);
