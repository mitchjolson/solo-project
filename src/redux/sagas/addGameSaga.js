import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addGame(action) {
    console.log('in addGame, action.payload.game is', action.payload.game);
    console.log('in addGame, userID is', action.payload.user);
    try {
        const response = yield axios.post(`/api/games/checkgamedb`, action.payload.game);
        console.log('checking if game exists in DB, response.data is', response.data);
        if(response.data === undefined || response.data.length === 0){
            console.log('game not yet in DB, posting game now');
            yield axios.post(`/api/games`, action.payload.game);
        }
        else{ 
            console.log('game already exists in DB, not posting game');
        }
        const response2 = yield axios.post(`/api/games/checkcollection/${action.payload.user}`, action.payload.game);
        console.log('checking to see if user is linked to game. response2.data is:', response2.data)
        if (response2.data === undefined || response2.data.length === 0) {
            console.log('linking game to user in user_games');
            yield axios.post(`/api/games/link/${action.payload.user}`, action.payload.game);
        }
        else{
            console.log('user is already linked to game');
        }
        alert(`Added ${action.payload.game.name} to your collection!`)
    } catch (error) {
        console.log('Error linking game:', error);
    }
}

function* addGameFromDetails(action) {
    console.log('in addGame from details, action.payload.game is', action.payload.game);
    console.log('in addGame from details, userID is', action.payload.user);
    try {
        const response = yield axios.post(`/api/games/checkgamedbfromdetails`, action.payload.game);
        console.log('checking if game exists in DB, response.data is', response.data);
        if (response.data === undefined || response.data.length === 0) {
            console.log('game not yet in DB, posting game now');
            yield axios.post(`/api/games/addfromdetails`, action.payload.game);
        }
        else {
            console.log('game already exists in DB, not posting game');
        }
        const response2 = yield axios.post(`/api/games/checkcollectionfromdetails/${action.payload.user}`, action.payload.game);
        console.log('checking to see if user is linked to game. response2.data is:', response2.data)
        if (response2.data === undefined || response2.data.length === 0) {
            console.log('linking game to user in user_games');
            yield axios.post(`/api/games/linkfromdetails/${action.payload.user}`, action.payload.game);
        }
        else {
            console.log('user is already linked to game');
        }
    } catch (error) {
        console.log('Error linking game:', error);
    }
}

function* addGameSaga() {
    yield takeEvery('ADD_GAME', addGame);
    yield takeEvery('ADD_GAME_FROM_DETAILS', addGameFromDetails)
}

export default addGameSaga;