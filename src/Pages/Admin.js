import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import "../styles/Admin.scss"
import { NavLink } from "react-router-dom"
export function Admin() {

    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()

    function logout() {
        dispatch({ type: "LOGOUT" })
        localStorage.setItem("savedAdm", JSON.stringify(''))
    }

    return (
        <div className="content-admin">
            <Header></Header>

            <div className="menu-bar">
                <NavLink  activeClassName="ActivedMenu" to="#">Cardapio</NavLink>
                <NavLink  activeClassName="ActivedMenu" to="#">Ofertas</NavLink>
                <NavLink  activeClassName="ActivedMenu" to="#">Relatório</NavLink>
                <NavLink  activeClassName="ActivedMenu" to="#">Clientes</NavLink>
            </div>
            <button onClick={logout}>LOGOUT</button>
            <Footer></Footer>
        </div>
    )
}