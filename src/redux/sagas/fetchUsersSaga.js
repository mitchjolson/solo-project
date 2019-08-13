import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchUsers(action) {
    console.log('in fetchUsers, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/friends/users/${action.payload}`);
        console.log('in fetchUsers, response is:', response.data)
        yield put({ type: 'SET_USERS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving user list:', error);
    }
}

function* fetchUsersSaga() {
    yield takeEvery('FETCH_USERS', fetchUsers);
}

export default fetchUsersSaga;
