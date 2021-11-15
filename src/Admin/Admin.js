import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import "../styles/Admin.scss"
import { NavLink, useRouteMatch } from "react-router-dom"
import { storage } from "../services/firebase"



export function Admin() {

    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()



    const match = useRouteMatch("/adminpikeno")

    function logout() {
        dispatch({ type: "LOGOUT" })
        localStorage.setItem("savedAdm", JSON.stringify(''))
    }

    function createNewItemMenu() {
        const ref = storage.ref("/Images")
        const image = document.getElementById("file").files[0]
        
        ref.child(image.name).put(image).then(snapshot=>{
            ref.child(image.name).getDownloadURL().then(url=>{
                
            })
    })}



    return (
        <div className="content-admin">
            <Header></Header>

            <div className="menu-bar">
                <NavLink activeClassName="ActivedMenu" to="/adminpikeno">Home</NavLink>
                <NavLink activeClassName="ActivedMenu" to = "/cardapio">Cardapio</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/ofertas">Ofertas</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/relatorio">Relatório</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/clientes">Clientes</NavLink>
            </div>
            <button onClick={logout}>LOGOUT</button>

            <input type="file" id="file"></input>
            <button onClick = {createNewItemMenu}>CADASTRAR</button>
            <Footer></Footer>
        </div>
    )
}