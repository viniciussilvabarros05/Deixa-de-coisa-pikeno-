import { cardapio as Cardapio } from "../services/cardapio";
export default function cardapio(state =  Cardapio , action) {
    switch (action.type) {
        case "DATABASE":

            return state = action.payload

        default:
            return state;
    }
}