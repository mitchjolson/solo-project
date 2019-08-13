const collectionView = (state = ['grid'], action) => {
    switch (action.type) {
        case 'SET_COLLECTION_VIEW':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default collectionView;