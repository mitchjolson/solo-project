import React, { Component } from 'react';
import { connect } from 'react-redux';

class GamesItem extends Component {

    render() {
        return (
            <>
            <p>
                {this.props.game.name} - {this.props.game.username}
            </p>
            </>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(GamesItem);
