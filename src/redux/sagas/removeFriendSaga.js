import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* removeFriend(action) {
    console.log('in removeFriend, action.payload is', action.payload);
    try {
        yield axios.delete(`/api/friends`, {data: action.payload});
        yield put({ type: 'FETCH_FRIENDS', payload: action.payload.user.id })
    } catch (error) {
        console.log('Error removing friend:', error);
    }
}

function* removeFriendSaga() {
    yield takeEvery('REMOVE_FRIEND', removeFriend);
}

export default removeFriendSaga;