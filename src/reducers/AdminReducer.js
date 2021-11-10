

const admin = [{
    name: "admin",
    email: "admin@email.com",
    senha: "admin",
    admin: true
}]

export default function AdminReducer(state = '', action) {


    switch (action.type) {
        case 'LOGIN':
            const confirmEmail = admin.filter(item => item.email == action.payload.email)


            if (confirmEmail[0].senha == action.payload.senha) {
             
                if (confirmEmail[0].admin) {

                    return state = confirmEmail[0]
                } else {
                    return state
                }
            }
        

        case "LOGOUT":
            return state = ''

        default:
            return state;
    }
}