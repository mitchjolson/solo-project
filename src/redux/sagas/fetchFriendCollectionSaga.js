import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchFriendCollection(action) {
    console.log('in fetchFriendCollection, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/games/${action.payload}`);
        console.log('in fetchFriendCollection, response is:', response.data)
        yield put({ type: 'SET_FRIEND_COLLECTION', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchFriendCollectionSaga() {
    yield takeEvery('FETCH_FRIEND_COLLECTION', fetchFriendCollection);
}

export default fetchFriendCollectionSaga;
