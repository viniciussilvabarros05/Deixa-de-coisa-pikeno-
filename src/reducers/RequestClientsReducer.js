export function RequestClients(state = [], action) {
    switch (action.type) {
        case "REQUEST":
            action.payload.sort((a, b) => {
       

                if (a.time < b.time) {
                    return -1
                } else {
                    return 1
                }
            })

            return action.payload

        default:
            return state;
    }
}