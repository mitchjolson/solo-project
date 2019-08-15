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
}

function* createEventSaga() {
    yield takeEvery('CREATE_EVENT', createEvent);
}

export default createEventSaga;