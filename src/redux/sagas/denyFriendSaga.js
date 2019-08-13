import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* denyFriendRequest(action) {
    console.log('in denyFriendRequest, action.payload is', action.payload);
    try {
        yield axios.delete(`/api/friends/deny`, { data: action.payload });
        yield put({ type: 'FETCH_FRIENDS', payload: action.payload.user2 })
        yield put({ type: 'FETCH_FRIEND_REQUESTS', payload: action.payload.user2 })
    } catch (error) {
        console.log('Error denying friend request:', error);
    }
}

function* denyFriendRequestSaga() {
    yield takeEvery('DENY_FRIEND_REQUEST', denyFriendRequest);
}

export default denyFriendRequestSaga;