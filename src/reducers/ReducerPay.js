export default function payment(state = {}, action) {
    switch (action.type) {
        case "PAYMENT":

            return state = action.payload;

        case "INCREMENT":
            if(!action.payload){
                return state
            }
            state.quant = action.payload
            state.valueTotal = state.value * state.quant
            return state

        default:
            return state
    }
}