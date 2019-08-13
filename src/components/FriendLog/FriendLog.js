import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendLogItem from '../FriendLogItem/FriendLogItem';

class FriendLog extends Component {

    componentDidMount = () => {
        console.log('FriendLog page did mount');
        this.props.dispatch({ type: 'FETCH_FRIENDLOG', payload: this.props.reduxStore.user.id });
    }

    render() {
        return (
            <>
                <h1>Activity Log</h1>
                    <ul>
                        {this.props.reduxStore.friendLog.map((activity, i) => {
                            return (<FriendLogItem key={i} activity={activity}/>);
                        })}
                    </ul>
            </>
        )
    }

};

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(FriendLog);
