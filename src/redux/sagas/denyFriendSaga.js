import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* denyFriendRequest(action) {
    console.log('in denyFriendRequest, action.payload is', action.payload);
    try {
        yield axios.put(`/api/friends/deny`, action.payload);
        yield put({ type: 'FETCH_FRIEND_REQUESTS', payload: action.payload.user2 })
    } catch (error) {
        console.log('Error denying friend request:', error);
    }
}

function* denyFriendRequestSaga() {
    yield takeEvery('DENY_FRIEND_REQUEST', denyFriendRequest);
}

export default denyFriendRequestSaga;