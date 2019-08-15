import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

// worker Saga: will be fired on "REGISTER" actions
function* createEvent(action) {
    try {
        yield axios.post(`/api/events`, action.payload);
        yield Swal.fire({
            type: 'success',
            title: `${action.payload.title}`,
            text: 'has been created successfully',
        })
    } catch (error) {
        console.log('Error posting event:', error);
    }

    try {
        const response = yield axios.post(`/api/events/eventID`, action.payload);
        // yield put({ type: 'SET_EVENT_ID', payload: response.data[0].id })
        for (let i = 0; i < action.payload.guests.length; i++) {
            let data = { event_id: response.data[0].id, user_id: action.payload.guests[i].friend_id}
            yield axios.post(`/api/events/eventguests`, data);
        }
    } catch (error) {
        console.log('Error setting event ID:', error);
    }
}

function* createEventSaga() {
    yield takeEvery('CREATE_EVENT', createEvent);
}

export default createEventSaga;