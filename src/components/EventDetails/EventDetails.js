import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuestsItem from '../GuestsItem/GuestsItem';

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

    acceptInvite = () => {
        const data = {event_id: this.props.reduxStore.eventID, user_id: this.props.reduxStore.user.id}
        this.props.dispatch({ type: 'ACCEPT_EVENT_INVITE', payload: data})
    }

    declineInvite = () => {
        const data = { event_id: this.props.reduxStore.eventID, user_id: this.props.reduxStore.user.id }
        this.props.dispatch({ type: 'DECLINE_EVENT_INVITE', payload: data })
    }

    checkInvite = () => {
        for(let i=0; i<this.props.reduxStore.eventGuests.length; i++){
            if( this.props.reduxStore.user.id === this.props.reduxStore.eventGuests[i].user_id && this.props.reduxStore.eventGuests[i].status === 'pending' ){
                return <><p>RSVP</p> <button onClick={this.acceptInvite}>Accept</button> <button onClick={this.declineInvite}>Decline</button></>
            }
        }
    }

    render() {
        return (
            <>
            <div>
                <h1>{this.props.reduxStore.eventDetails.title}</h1>
            </div>
            <div>
                {this.checkInvite()}
            </div>
            <div>
                <h3>Guest List</h3>
                <ul>
                    {this.props.reduxStore.eventGuests.map((guest, i) => {
                        return (<GuestsItem key={i} guest={guest} history={this.props.history} check='accepted' />);
                    })}
                </ul>
                <h3>Pending Invitations</h3>
                <ul>
                    {this.props.reduxStore.eventGuests.map((guest, i) => {
                        return (<GuestsItem key={i} guest={guest} history={this.props.history} check='pending' />);
                    })}
                </ul>
                <h3>Declined</h3>
                <ul>
                    {this.props.reduxStore.eventGuests.map((guest, i) => {
                        return (<GuestsItem key={i} guest={guest} history={this.props.history} check='declined' />);
                    })}
                </ul>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(EventDetails);
