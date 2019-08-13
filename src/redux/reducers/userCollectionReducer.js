const userCollection = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_COLLECTION':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default userCollection;