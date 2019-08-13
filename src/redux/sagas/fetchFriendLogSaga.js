import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFriendLog(action) {
    console.log('in fetchFriendLog, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/games/log/${action.payload}`);
        console.log('in fetchFriendLog, response is:', response.data)
        yield put({ type: 'SET_FRIEND_LOG', payload: response.data })
    } catch (error) {
        console.log('Error retrieving Log:', error);
    }
}

function* fetchFriendLogSaga() {
    yield takeEvery('FETCH_FRIEND_LOG', fetchFriendLog);
}

export default fetchFriendLogSaga;
