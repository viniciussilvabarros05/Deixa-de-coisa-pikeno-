export default function ParseMenu(state = 'hamburgueres' , action){
    switch (action.type) {
        case "PARSE":
            
            return state = action.payload;
    
        default:
            return state;
    }
}