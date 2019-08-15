import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchEventDetails(action) {
    console.log('in fetchEventDetails, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/Events/Details/${action.payload}`);
        console.log('in fetch event details, response is:', response.data)
        yield put({ type: 'SET_EVENT_DETAILS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving event details:', error);
    }
}

function* fetchEventGuests(action) {
    console.log('in fetchEventGuests, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/Events/Guests/${action.payload}`);
        console.log('in fetch event guests, response is:', response.data)
        yield put({ type: 'SET_EVENT_GUESTS', payload: response.data })
    } catch (error) {
        console.log('Error retrieving event guests:', error);
    }
}

function* fetchEventGames(action) {
    console.log('in fetchEventGames, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/Events/Games/${action.payload}`);
        console.log('in fetch event games, response is:', response.data)
        yield put({ type: 'SET_EVENT_GAMES', payload: response.data })
    } catch (error) {
        console.log('Error retrieving event games:', error);
    }
}

function* fetchEventDetailsSaga() {
    yield takeEvery('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeEvery('FETCH_EVENT_GUESTS', fetchEventGuests);
    yield takeEvery('FETCH_EVENT_GAMES', fetchEventGames);
}

export default fetchEventDetailsSaga;
