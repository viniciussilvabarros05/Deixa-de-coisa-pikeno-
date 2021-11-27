export function RequestClients(state = [], action) {
    switch (action.type) {
        case "REQUEST":

            return action.payload
            
        default:
            return state;
    }
}