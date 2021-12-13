import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import "../styles/Login.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import usuario from "../assets/images/usuario.png"
import { db } from "../services/firebase"
import bcrypt from "bcryptjs"
export function Login() {
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const history = useHistory()


    function loginAdm(event) {
        event.preventDefault()

        const email = document.getElementById("email").value
        const confirmEmail = db.collection("Usuarios").where("email", "==", email).get().then(doc => {

            if(doc.empty){
                alert("Usuário não autorizado")
            }

            doc.forEach(item => {

                const confirmPassword = bcrypt.compareSync(document.getElementById("password").value, item.data().password)

                if (confirmPassword) {
                    if (item.data().admin) {
                        dispatch({ type: "LOGIN", payload: item.data() })
                    }
                    if (item.data().cozinha) {
                        dispatch({ type: "LOGIN", payload: item.data() })

                    }
                } else {
                    return alert("Email ou senha incorreto")
                }
            })
        })

    }


    useEffect(() => {
        let savedAdm = JSON.parse(localStorage.getItem("adminLog"))
        if (savedAdm) {
            dispatch({ type: "LOGIN", payload: savedAdm })
        }

    }, [])

    useEffect(() => {

        if (admin.admin) {
            history.push("/adminpikeno")
            localStorage.setItem("adminLog", JSON.stringify(admin))
        }

        if (admin.cozinha) {
            history.push("/admincozinha")
            localStorage.setItem("adminLog", JSON.stringify(admin))
        }

    }, [admin])


    return (
        <div className="content-login">
            <Header></Header>
            <form>
                <img src={usuario} />
                <input type="email" id="email">
                </input>

                <input type="password" id="password">
                </input>

                <div className="buttons">
                    <button onClick={loginAdm} id="Login">LOGIN</button>
                </div>

            </form>
            <Footer></Footer>
        </div>
    )
}