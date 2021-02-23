const contextReducer = (state, action) => {
    let transactions;
    switch(action.type){
        case 'DELETE_TRANSACTION':
            transactions = state.filter((item) => item.id !== action.payload);
            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state];
            return transactions;
        default:
            return transactions;
    }
}

export default contextReducer;