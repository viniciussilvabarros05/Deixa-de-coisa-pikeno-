import { Header } from "../components/Header"
import { useDispatch } from "react-redux"
import "../styles/Admin.scss"
import { NavLink } from "react-router-dom"

import bcrypt from "bcryptjs"
import { db } from "../services/firebase"


export function Admin() {

    const dispatch = useDispatch()

    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
    }

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
        <div className="content-admin">
            <Header></Header>

            <div className="menu-bar">
                <NavLink activeClassName="ActivedMenu" to="/adminpikeno">Home</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/cardapio">Cardapio</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/relatorio">Relatório</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/clientes">Clientes</NavLink>
            </div>

            <button className="logout" onClick={logout}>LOGOUT</button>


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


        </div>
    )
}