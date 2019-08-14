import React, { Component } from 'react';
import { connect } from 'react-redux';


class Events extends Component {

    componentDidMount() {
        console.log('events component mounted');
    }

    render() {
        return (
            <>
            <div>
                <h1>Events</h1>
            </div>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(Events);
