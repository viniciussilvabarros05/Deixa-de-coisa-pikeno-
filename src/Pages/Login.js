import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import "../styles/Login.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import usuario from "../assets/images/usuario.png"

export function Login() {
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const history = useHistory()

    function loginAdm(event) {
        event.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const adm = {
            email,
            senha: password
        }
        dispatch({ type: "LOGIN", payload: adm })
    }


    useEffect(() => {

        let savedAdm = JSON.parse(localStorage.getItem("savedAdm"))

        if (savedAdm) {
            dispatch({ type: "LOGIN", payload: savedAdm })
        }

    }, [])


    useEffect(() => {

        if (admin) {
            history.push("/adminpikeno")
            localStorage.setItem("savedAdm", JSON.stringify(admin))
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
                    <p>É novo aqui ?  <button id="createAccount">  Crie sua conta</button></p>
                </div>

            </form>
            <Footer></Footer>
        </div>
    )
}