export default function menuLateral (state = false, action){
    switch (action.type) {
        case 'ACTIVED':
            return state = true
        case 'DISABLE':
            return state = false
        default:
            return state;
    }
}