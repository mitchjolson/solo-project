import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

// worker Saga: will be fired on "REGISTER" actions
function* createEvent(action) {
    try {
        // yield axios.post(`/api/events`, action.payload);
        let dataID = yield axios.post(`/api/events`, action.payload);
        console.log('dataID.data.id is:', dataID.data.id)
        for (let i = 0; i < action.payload.guests.length; i++) {
            let data = { event_id: dataID.data.id, user_id: action.payload.guests[i].friend_id }
            yield axios.post(`/api/events/eventguests`, data);
        }
        for (let i = 0; i < action.payload.games.length; i++) {
            let data = { event_id: dataID.data.id, game_id: action.payload.games[i].atlas_id, creator_id: action.payload.creator_id }
            yield axios.post(`/api/events/eventgames`, data);
        }
        Swal.fire({
            type: 'success',
            title: `${action.payload.title}`,
            text: 'has been created successfully',
        })
    } catch (error) {
        console.log('Error posting event:', error);
    }

    // try {
    //     for (let i = 0; i < action.payload.guests.length; i++) {
    //         let data = { event_id: dataID.data.id, user_id: action.payload.guests[i].friend_id}
    //         yield axios.post(`/api/events/eventguests`, data);
    //     }
    //     for (let i = 0; i < action.payload.games.length; i++) {
    //         let data = { event_id: dataID.data.id, game_id: action.payload.games[i].atlas_id, creator_id: action.payload.creator_id }
    //         yield axios.post(`/api/events/eventgames`, data);
    //     }
    //     yield Swal.fire({
    //         type: 'success',
    //         title: `${action.payload.title}`,
    //         text: 'has been created successfully',
    //     })
    // } catch (error) {
    //     console.log('Error posting guests and games to event:', error);
    // }
}

function* createEventSaga() {
    yield takeEvery('CREATE_EVENT', createEvent);
}

export default createEventSaga;