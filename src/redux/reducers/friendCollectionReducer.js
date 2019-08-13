const friendCollection = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIEND_COLLECTION':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default friendCollection;