import React, { Component } from 'react';
import { connect } from 'react-redux';


class EventCreate extends Component {

    componentDidMount() {
        console.log('events component mounted');
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id });
        this.props.dispatch({ type: 'FETCH_FRIENDS', payload: this.props.reduxStore.user.id });
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
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(EventCreate);
