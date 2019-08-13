import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* friendRequest(action) {
    console.log('in friendRequest, action.payload is', action.payload);
    let data = {}
    try {
        yield axios.post(`/api/friends`, action.payload);
        alert(`Sent friend request to a person!`)
    } catch (error) {
        console.log('Error sending friend request:', error);
    }
}

function* friendRequestSaga() {
    yield takeEvery('SEND_FRIEND_REQUEST', friendRequest);
}

export default friendRequestSaga;