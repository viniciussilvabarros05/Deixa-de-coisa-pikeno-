
export default function cardapio(state = [], action) {
    switch (action.type) {
        case "DATABASE":

            return state = action.payload

        default:
            return state;
    }
}