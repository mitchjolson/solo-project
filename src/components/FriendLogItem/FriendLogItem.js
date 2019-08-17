import React, { Component } from 'react';
import { connect } from 'react-redux';

class FriendsItem extends Component {

    rename = (word) => {
        if(word === 'add'){
            return 'added';
        }
        return 'removed';
    }

    render() {
        return (
            <>
                <p>
                    {this.props.activity.name} {this.rename(this.props.activity.action)} on {this.props.activity.to_char}.
                </p>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(FriendsItem);
