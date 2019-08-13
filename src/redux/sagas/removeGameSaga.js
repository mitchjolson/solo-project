import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* removeGame(action) {
    try {
        yield axios.delete(`/api/games/${action.payload.user}`, { data: action.payload });
        yield put({ type: 'FETCH_USER_COLLECTION', payload: action.payload.user })
        
    } catch (error) {
        console.log('Error removing game from collection:', error);
    }
}

function* removeGameSaga() {
    yield takeEvery('REMOVE_GAME_FROM_COLLECTION', removeGame);
}

export default removeGameSaga;