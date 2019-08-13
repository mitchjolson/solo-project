import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../CollectionItem/CollectionItem'

class Collection extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER_COLLECTION', payload: this.props.reduxStore.user.id })
    }

    render() {
        return (
            <>
                <div>
                    <p>
                        Collection
                    </p>
                </div>
                <table className="collectionTable">
                    <thead>
                        <tr><th>Game</th><th>Category</th><th>Players</th><th>Playtime</th><th>Rating</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                        {this.props.reduxStore.userCollection.map((game, i) => {
                            return (<CollectionItem key={i} game={game} history={this.props.history} />);
                        })}
                    </tbody>
                </table>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Collection);
