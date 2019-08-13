const friendLog = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIEND_LOG':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default friendLog;