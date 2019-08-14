const eventCreateGuests = (state = [], action) => {
    switch (action.type) {
        case 'EVENT_CREATE_INVITE':
            return [...state, action.payload];
        case 'EVENT_CREATE_INVITE_RESET':
            return [];
        case 'EVENT_CREATE_UNINVITE':
            let newArray = []
            for ( let i=0; i<state.length; i++ ){
                if (state[i].friend_id != action.payload.friend_id){
                    newArray.push(state[i]);
                }
            }
            return newArray;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default eventCreateGuests;