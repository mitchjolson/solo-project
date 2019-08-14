import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import EventFriendsItem from '../EventFriendsItem/EventFriendsItem';
import EventGuestsItem from '../EventGuestsItem/EventGuestsItem';
import EventGamesItem from '../EventGamesItem/EventGamesItem';
import EventAgendaItem from '../EventAgendaItem/EventAgendaItem';

class EventCreate extends Component {

    state = {
        startDate: new Date(),
        startTime: '',
        location: '',
        title: ''
    };

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

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
        console.log('this.state is:', this.state);
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            [propToChange]: event.target.value
        })
        console.log('this.state is:', this.state);
    }

    render() {
        return (
            <>
                <div>
                    <p>Create Event</p>
                </div>
                <div>
                    <p>Guest List</p>
                    <ul>
                        {this.props.reduxStore.eventCreateGuests.map((guest, i) => {
                            return (<EventGuestsItem key={i} guest={guest} history={this.props.history} />);
                        })}
                    </ul>
                    <p>Friends</p>
                    <ul>
                        {this.props.reduxStore.friends.map((friend, i) => {
                            return (<EventFriendsItem key={i} friend={friend} history={this.props.history} />);
                        })}
                    </ul>
                </div>
                <div>
                    <p>Event Name</p>
                    <input type="text" value={this.state.title} placeholder='Game Night!' onChange={(event) => this.handleChangeFor(event, 'title')}/>
                    <br/>
                    <p>Location</p>
                    <input type="text" value={this.state.location} onChange={(event) => this.handleChangeFor(event, 'location')} />
                    <br />
                    <p>Start Time</p>
                    <input type="text" value={this.state.startTime} onChange={(event) => this.handleChangeFor(event, 'startTime')} />
                    <br />
                    <p>Date</p>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <p>Agenda</p>
                    <ul>
                        {this.props.reduxStore.eventCreateGames.map((game, i) => {
                            return (<EventAgendaItem key={i} game={game} history={this.props.history} />);
                        })}
                    </ul>
                    <p>My Games</p>
                    <ul>
                        {this.props.reduxStore.userCollection.map((game, i) => {
                            return (<EventGamesItem key={i} game={game} history={this.props.history} />);
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
