import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* acceptEventInvite(action) {
    console.log('in acceptEventInvite, action.payload is', action.payload);
    try {
        yield axios.put(`/api/events/accept`, action.payload);
        yield put({ type: 'FETCH_EVENT_DETAILS', payload: action.payload.event_id })
        yield put({ type: 'FETCH_EVENT_GUESTS', payload: action.payload.event_id })
        yield put({ type: 'FETCH_EVENT_GAMES', payload: action.payload.event_id })
    } catch (error) {
        console.log('Error accepting event invite:', error);
    }
}

function* acceptEventInviteSaga() {
    yield takeEvery('ACCEPT_EVENT_INVITE', acceptEventInvite);
}

export default acceptEventInviteSaga;