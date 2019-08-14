const eventCreateGames = (state = [], action) => {
    switch (action.type) {
        case 'EVENT_CREATE_ADD_GAME':
            return [...state, action.payload];
        case 'EVENT_CREATE_GAMES_RESET':
            return [];
        case 'EVENT_CREATE_REMOVE_GAME':
            let newArray = []
            for ( let i=0; i<state.length; i++ ){
                if (state[i].atlas_id != action.payload.atlas_id){
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
export default eventCreateGames;