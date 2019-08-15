const eventDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default eventDetails;