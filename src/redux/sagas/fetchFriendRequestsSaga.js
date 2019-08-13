import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFriendRequests(action) {
    console.log('in fetchFriendRequests, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/friends/requests/${action.payload}`);
        console.log('in fetchFriendRequests, response is:', response.data)
        yield put({ type: 'SET_FRIEND_REQUESTS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchFriendRequestsSaga() {
    yield takeEvery('FETCH_FRIEND_REQUESTS', fetchFriendRequests);
}

export default fetchFriendRequestsSaga;
