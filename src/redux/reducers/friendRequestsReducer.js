const friendRequests = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIEND_REQUESTS':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default friendRequests;