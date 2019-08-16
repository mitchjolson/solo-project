import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addEventGame(action) {
    console.log('in addEventGame, action.payload is', action.payload);
    try {
        yield axios.post(`/api/events/addgame`, action.payload);
        yield put({ type: 'FETCH_EVENT_GAMES', payload: action.payload.event_id });
    }
    catch (error) {
        console.log('Error linking game:', error);
    }
}

function* addEventGameSaga() {
    yield takeEvery('ADD_EVENT_GAME', addEventGame);
}

export default addEventGameSaga;