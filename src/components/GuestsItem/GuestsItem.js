import React, { Component } from 'react';
import { connect } from 'react-redux';

class GuestsItem extends Component {

    checkStatus = (guest) => {
        console.log('guest.status:', guest.status, 'this.props.guest.check:', this.propscheck)
        if(guest.status === this.props.check){
            return (<li>
                        {guest.username}
                    </li>)
        }
    }

    render() {
        return (
            <>
                {this.checkStatus(this.props.guest)}
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(GuestsItem);
