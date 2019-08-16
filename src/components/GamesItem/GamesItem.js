import React, { Component } from 'react';
import { connect } from 'react-redux';

class GamesItem extends Component {

    render() {
        return (
            <>
            <li>
                {this.props.game.name} - {this.props.game.username}
            </li>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(GamesItem);
