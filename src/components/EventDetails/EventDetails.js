import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuestsItem from '../GuestsItem/GuestsItem';
import GamesItem from '../GamesItem/GamesItem';
import CollectionItemList from '../CollectionItem/CollectionItemList';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class EventDetails extends Component {

    state = {
        addGames: 0,
    }

    componentDidMount() {
        console.log('eventDetails component mounted');
        this.props.dispatch({ type: 'FETCH_EVENT_DETAILS', payload: this.props.reduxStore.eventID });
        this.props.dispatch({ type: 'FETCH_EVENT_GUESTS', payload: this.props.reduxStore.eventID });
        this.props.dispatch({ type: 'FETCH_EVENT_GAMES', payload: this.props.reduxStore.eventID });
    }

    addGames = () => {
        for(let i=0; i<this.props.reduxStore.eventGuests.length; i++){
            if( this.props.reduxStore.user.id === this.props.reduxStore.eventGuests[i].user_id && this.props.reduxStore.eventGuests[i].status === 'accepted'){
                console.log('in addgames, this.state.addGames =', this.state.addGames)
                if (this.state.addGames === 1) {
                    return <><h3>My Games</h3>
                        <div className='addGames'>
                            {this.props.reduxStore.userCollection.map((game, i) => {
                                return (<CollectionItemList key={i} game={game} history={this.props.history} check='declined' />);
                            })}
                        </div></>
                }
                else {
                    return <Button size='small' variant='contained' color='primary' onClick={() => this.setAddGames()}>Add Games</Button>
                }
            }
        }
    }

    setAddGames = () => {
        this.setState({addGames: 1});
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
                return <><p>RSVP</p> <Button size='small' variant='contained' color='primary' onClick={this.acceptInvite}>Accept</Button> <Button size='small' variant='contained' color='secondary' onClick={this.declineInvite}>Decline</Button></>
            }
        }
    }

    render() {
        return (
            <div className='what'>
                <div className='eventGuests'>
                    <br/>
                    <br/>
                    <br/>
                    <br />
                    <h3>Guest List</h3>
                    <div>
                        {this.props.reduxStore.eventGuests.map((guest, i) => {
                            return (<GuestsItem key={i} guest={guest} history={this.props.history} check='accepted' />);
                        })}
                    </div>
                    <br/>
                    <h3>Pending Invitations</h3>
                    <div>
                        {this.props.reduxStore.eventGuests.map((guest, i) => {
                            return (<GuestsItem key={i} guest={guest} history={this.props.history} check='pending' />);
                        })}
                    </div>
                    <br/>
                    <h3>Declined</h3>
                    <div>
                        {this.props.reduxStore.eventGuests.map((guest, i) => {
                            return (<GuestsItem key={i} guest={guest} history={this.props.history} check='declined' />);
                        })}
                    </div>
                </div >
                <div className='eventDetails'>
                    <br/>
                    <h1>{this.props.reduxStore.eventDetails.title}</h1>
                    {this.checkInvite()}
                    <br/>
                    <h3>Hosted by {this.props.reduxStore.eventDetails.host}</h3>
                    <h3>{this.props.reduxStore.eventDetails.location}</h3>
                    <h3>{this.props.reduxStore.eventDetails.to_char}</h3>
                    <h3>{this.props.reduxStore.eventDetails.time}</h3>
                </div>
                <div className='eventGames'>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Agenda</h3>
                    <div>
                        {this.props.reduxStore.eventGames.map((game, i) => {
                            return (<GamesItem key={i} game={game} history={this.props.history} check='declined' />);
                        })}
                    </div>
                    <br/>
                    {this.addGames()}
                    {/* <h3>My Games</h3>
                    <ul>
                        {this.props.reduxStore.userCollection.map((game, i) => {
                            return (<CollectionItemList key={i} game={game} history={this.props.history} check='declined' />);
                        })}
                    </ul> */}
                </div>
            </div>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(withStyles(styles)(EventDetails));
