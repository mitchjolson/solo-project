import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* approveFriendRequest(action) {
    console.log('in approveFriendRequest, action.payload is', action.payload);
    try {
        yield axios.put(`/api/friends/approve`, action.payload);
        yield put({ type: 'FETCH_FRIEND_REQUESTS', payload: action.payload.user2 })
        yield put({ type: 'FETCH_FRIENDS', payload: action.payload.user2 })
    } catch (error) {
        console.log('Error approving friend request:', error);
    }
}

function* approveFriendRequestSaga() {
    yield takeEvery('APPROVE_FRIEND_REQUEST', approveFriendRequest);
}

export default approveFriendRequestSaga;