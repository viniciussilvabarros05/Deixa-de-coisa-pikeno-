export function Carrinho(state = [], action) {
    switch (action.type) {
        case 'ADDCART':

        if(action.payload.length == 0){
            return state = []
        }

            return [...state, action.payload];

        case 'REMOVECART':

            const newState = state.filter(item => item.hour != action.payload)

            return newState
        default:
            return state;
    }
}