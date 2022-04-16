const emailReducer = (state = "", action) => {
    switch(action.type) {
        case 'SET_EMAIL':
            return action.email;
        default:
            return state;
    }
}

export default emailReducer