import { useDispatch } from "react-redux"

import bcrypt from "bcryptjs"
import { db } from "../../services/firebase"


export function RegisterUser() {
    function registerUser() {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const typeUser = document.getElementById("type-user").value


        let user = {}

        if (!(email, typeUser, password)) {
            return alert("Dados incompletos. Por farvor, preencha todos os")
        }

        if (typeUser == "admin") {
            user = {
                name: email,
                email,
                password: bcrypt.hashSync(password),
                admin: true
            }
        } else {
            user = {
                email,
                password: bcrypt.hashSync(password),
                cozinha: true
            }
        }

        db.collection("Usuarios").doc(email).set(user).then(doc => {
            return alert("Usuário cadastrado")
        })


    }

    return (
        <div className="content-register">
            <h2>CADASTRO DE USUARIOS</h2>
            <input id="email" type="text" placeholder="nome do usuário"></input>
            <input id="password" type="password" placeholder="senha do usuário"></input>


            <div >

                <label>Tipo de usuário:</label>
                <select id="type-user">
                    <option>
                        admin
                    </option>
                    <option>
                        cozinha
                    </option>
                </select>

            </div>
            <button onClick={registerUser}>CADASTRAR</button>
        </div>

    )
}