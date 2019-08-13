import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchUserCollection(action) {
    console.log('in fetchUserCollection, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/games/${action.payload}`);
        console.log('in fetchUserCollection, response is:', response.data)
        yield put({ type: 'SET_USER_COLLECTION', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchUserCollectionSaga() {
    yield takeEvery('FETCH_USER_COLLECTION', fetchUserCollection);
}

export default fetchUserCollectionSaga;
