import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class EventsItem extends Component {


    handleDetails = () => {
        this.props.dispatch({ type: 'SET_EVENT_ID', payload: this.props.event.id })
        this.props.history.push('/eventdetails')
    }

    render() {
        return (
            <>
                <tr>
                    <td>{this.props.event.title}</td>
                    <td>{this.props.event.to_char}</td>
                    <td>{this.props.event.time}</td>
                    <td>{this.props.event.location}</td>
                    <td>{this.props.event.username}</td>
                    <td><button onClick={this.handleDetails}>Details</button></td>
                </tr>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(EventsItem);
