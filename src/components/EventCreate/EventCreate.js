import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import EventFriendsItem from '../EventFriendsItem/EventFriendsItem';
import EventGuestsItem from '../EventGuestsItem/EventGuestsItem';
import EventGamesItem from '../EventGamesItem/EventGamesItem';
import EventAgendaItem from '../EventAgendaItem/EventAgendaItem';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

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

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            [propToChange]: event.target.value
        })
    }

    handleCreateEvent = () => {
        const data = {
            creator_id: this.props.reduxStore.user.id,
            title: this.state.title,
            date: this.state.startDate,
            time: this.state.startTime,
            location: this.state.location,
            guests: this.props.reduxStore.eventCreateGuests,
            games: this.props.reduxStore.eventCreateGames
        }
        this.props.dispatch({ type: 'CREATE_EVENT', payload: data});
        this.props.dispatch({ type: 'FETCH_EVENTS', payload: this.props.reduxStore.user.id });
        this.props.history.push('/events');
    }

    render() {
        return (
            <div className='what'>
                    <h1>Create Event</h1>
                <div className='eventGuests'>
                    <h3>Guest List</h3>
                    <div>
                        {this.props.reduxStore.eventCreateGuests.map((guest, i) => {
                            return (<EventGuestsItem key={i} guest={guest} history={this.props.history} />);
                        })}
                    </div>
                    <br/>
                    <h3>Friends</h3>
                    <div>
                        {this.props.reduxStore.friends.map((friend, i) => {
                            return (<EventFriendsItem key={i} friend={friend} history={this.props.history} />);
                        })}
                    </div>
                </div>
                <div className='eventDetails'>
                    <br/>
                    <Input type="text" value={this.state.title} onChange={(event) => this.handleChangeFor(event, 'title')}/>
                    <h4>Event Name</h4>
                    <br/>
                    <Input type="text" value={this.state.location} onChange={(event) => this.handleChangeFor(event, 'location')} />
                    <h4>Location</h4>
                    <br />
                    <Input type="text" value={this.state.startTime} onChange={(event) => this.handleChangeFor(event, 'startTime')} />
                    <h4>Start Time</h4>
                    <br />
                    <br/>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        />
                    <br/>
                    <br/>
                    <br />
                    <Button variant='contained' color='primary' onClick={this.handleCreateEvent}>Create Event</Button>
                </div>
                <div className='eventGames'>
                    <h3>Agenda</h3>
                    <div>
                        {this.props.reduxStore.eventCreateGames.map((game, i) => {
                            return (<EventAgendaItem key={i} game={game} history={this.props.history} />);
                        })}
                    </div>
                    <br/>
                    <h3>My Games</h3>
                    <div className='addGames'>
                        {this.props.reduxStore.userCollection.map((game, i) => {
                            return (<EventGamesItem key={i} game={game} history={this.props.history} />);
                        })}
                    </div>
                </div>
            </div>            
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(withStyles(styles)(EventCreate));
