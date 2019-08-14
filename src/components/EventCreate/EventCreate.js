import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventFriendsItem from '../EventFriendsItem/EventFriendsItem';
import EventGuestsItem from '../EventGuestsItem/EventGuestsItem';
import EventGamesItem from '../EventGamesItem/EventGamesItem';
import EventAgendaItem from '../EventAgendaItem/EventAgendaItem';

class EventCreate extends Component {

    componentDidMount() {
        console.log('events component mounted');
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'EVENT_CREATE_INVITE_RESET' });
        this.props.dispatch({ type: 'EVENT_CREATE_GAMES_RESET' });
    }

    handleCreate = () => {
        this.props.history.push('/eventcreate')
    }

    render() {
        return (
            <>
                <div>
                    <h1>Create Event</h1>
                </div>
                <div>
                    <h1>Friends</h1>
                    <ul>
                        {this.props.reduxStore.friends.map((friend, i) => {
                            return (<EventFriendsItem key={i} friend={friend} history={this.props.history} />);
                        })}
                    </ul>
                    <h1>Guest List</h1>
                    <ul>
                        {this.props.reduxStore.eventCreateGuests.map((guest, i) => {
                            return (<EventGuestsItem key={i} guest={guest} history={this.props.history} />);
                        })}
                    </ul>
                </div>
                <div>
                    <h1>My Games</h1>
                    <ul>
                        {this.props.reduxStore.userCollection.map((game, i) => {
                            return (<EventGamesItem key={i} game={game} history={this.props.history} />);
                        })}
                    </ul>
                    <h1>Agenda</h1>
                    <ul>
                        {this.props.reduxStore.eventCreateGames.map((game, i) => {
                            return (<EventAgendaItem key={i} game={game} history={this.props.history} />);
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

export default connect(mapStateToProps)(EventCreate);
