import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* searchGames(action) {
    console.log('in fetchUserCollection, action.payload is', action.payload)
    try {
        const response = yield axios.get(`https://www.boardgameatlas.com/api/search?name=${action.payload}&pretty=true&client_id=Pau6XMmc7O`);
        console.log('in searchGames, response is:', response.data.games)
        yield put({ type: 'SET_GAME_SEARCH', payload: response.data.games })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* searchGamesSaga() {
    yield takeEvery('SEARCH_GAMES', searchGames);
}

export default searchGamesSaga;
