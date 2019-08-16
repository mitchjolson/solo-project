import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

// worker Saga: will be fired on "REGISTER" actions
function* checkFlag(action) {
    console.log('in check flag, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/events/checkflag/${action.payload}`);
        console.log('in check flag, response is:', response.data.new_invite)
        if( response.data.new_invite == 1 ){
            Swal.fire({
                title: "New event invite!",
                text: "You must be pretty popular",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            try {
                yield axios.put(`api/events/resolveflag/${action.payload}`)
                // yield put({ type: 'FETCH_FRIENDS', payload: action.payload.user2 })
            } catch (error) {
                console.log('Error unflagging user:', error);
            }
        }
    } catch (error) {
        console.log('Error retrieving event details:', error);
    }
}

function* checkFlagSaga() {
    yield takeEvery('CHECK_FLAG', checkFlag);
}

export default checkFlagSaga;
