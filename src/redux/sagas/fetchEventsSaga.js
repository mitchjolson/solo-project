import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchEvents(action) {
    console.log('in fetchEvents, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/Events/${action.payload}`);
        console.log('in fetchEvents, response is:', response.data)
        yield put({ type: 'SET_EVENTS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchEventsSaga() {
    yield takeEvery('FETCH_EVENTS', fetchEvents);
}

export default fetchEventsSaga;
