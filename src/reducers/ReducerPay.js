export default function payment(state = {}, action){
    switch (action.type) {
        case "PAYMENT":
            
            return state = action.payload;
    
        default:
            return state
    }
}