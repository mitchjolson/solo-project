import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFriends(action) {
    console.log('in fetchFriends, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/friends/${action.payload}`);
        console.log('in fetchFriends, response is:', response.data)
        yield put({ type: 'SET_FRIENDS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchFriendsSaga() {
    yield takeEvery('FETCH_FRIENDS', fetchFriends);
}

export default fetchFriendsSaga;
