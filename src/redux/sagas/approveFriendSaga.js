import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* friendRequest(action) {
    console.log('in friendRequest, action.payload is', action.payload);
    let data = {}
    try {
        yield axios.post(`/api/friends`, action.payload);
        yield put({ type: 'FETCH_FRIENDS', payload: action.payload.user1 })
    } catch (error) {
        console.log('Error sending friend request:', error);
    }
}

function* friendRequestSaga() {
    yield takeEvery('SEND_FRIEND_REQUEST', friendRequest);
}

export default friendRequestSaga;