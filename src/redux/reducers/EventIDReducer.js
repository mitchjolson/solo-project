const eventID = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_ID':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default eventID;