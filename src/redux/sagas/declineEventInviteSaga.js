import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* declineEventInvite(action) {
    console.log('in declineEventInvite, action.payload is', action.payload);
    try {
        yield axios.put(`/api/events/decline`, action.payload);
        yield put({ type: 'FETCH_EVENT_DETAILS', payload: action.payload.event_id })
        yield put({ type: 'FETCH_EVENT_GUESTS', payload: action.payload.event_id })
        yield put({ type: 'FETCH_EVENT_GAMES', payload: action.payload.event_id })
    } catch (error) {
        console.log('Error declining event invite:', error);
    }
}

function* declineEventInviteSaga() {
    yield takeEvery('DECLINE_EVENT_INVITE', declineEventInvite);
}

export default declineEventInviteSaga;