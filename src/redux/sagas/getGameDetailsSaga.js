


// NO LONGER IN USE

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* getGameDetails(action) {
    try {
        const response = yield axios.get(`https://www.boardgameatlas.com/api/search?ids=${action.payload}&pretty=true&client_id=Pau6XMmc7O`);
        yield put({ type: 'SET_GAME_DETAILS', payload: response.data.games })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* getGameDetailsSaga() {
    yield takeEvery('FETCH_GAME_DETAILS', getGameDetails);
}

export default getGameDetailsSaga;


// NO LONGER IN USE