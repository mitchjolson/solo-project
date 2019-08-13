const searchGame = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_SEARCH':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default searchGame;