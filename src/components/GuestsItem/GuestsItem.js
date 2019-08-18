import React, { Component } from 'react';
import { connect } from 'react-redux';

class GuestsItem extends Component {

    checkStatus = (guest) => {
        if(guest.status === this.props.check){
            return (<p>
                        {guest.username}
                    </p>)
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
