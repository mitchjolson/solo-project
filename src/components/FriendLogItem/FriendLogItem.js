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
                <li>
                    {this.props.activity.username} {this.rename(this.props.activity.action)} {this.props.activity.name} on {this.props.activity.to_char}.
                </li>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(FriendsItem);
