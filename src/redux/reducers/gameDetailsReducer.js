const gameDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default gameDetails;