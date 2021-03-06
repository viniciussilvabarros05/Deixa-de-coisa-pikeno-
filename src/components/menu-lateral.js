import LogoBorder from "../assets/images/BorderLogo.png"
import { NavLink } from "react-router-dom"

import Carrinho from "../assets/images/Carrinho.svg"

import Home from "../assets/images/Home.svg"

import login from '../assets/images/login.png'

import Contatos from "../assets/images/Contatos.svg"

import Pedidos from "../assets/images/Pedidos.svg"

import Sobre from "../assets/images/Sobre.svg"
import { useDispatch, useSelector } from "react-redux"

import { menuActived, menuDisable } from "../actions/actionList"


export function MenuLateral() {
    const pedidos = useSelector(state => state.carrinho)

    function handleFocusMenu(event) {

        const target = event.target.getAttribute("class")
        if (target === "content-menuLateral menuExposed") {
            dispatch(menuDisable())
        } else {
            dispatch(menuActived())
        }

        if (target === "menu-hamburguer" || target === "line") {
            dispatch(menuDisable())
        }

    }

    const dispatch = useDispatch()

    const menuLateral = useSelector(state => { return state.menuLateral })


    return (
        <div onClick={handleFocusMenu} className={`content-menuLateral ${menuLateral ? "menuExposed" : "menuhidden content-hidden"}`}>

            <div className={`menu-lateral ${menuLateral ? "menuExposed" : "menuhidden"}`}>
                <div className="menu-hamburguer">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <img src={LogoBorder} />
                <nav className="menu-links">
                    <NavLink to="/"><img src={Home} />HOME</NavLink>

                    <NavLink activeClassName="ActivedMenu"

                        to="/pedidos"><img src={Pedidos} />PEDIDOS</NavLink>


                    <NavLink activeClassName="ActivedMenu"

                        to="/contatos"><img src={Contatos} />CONTATOS</NavLink>


                    <NavLink activeClassName="ActivedMenu"

                        to="/sobre"><img src={Sobre} />SOBRE</NavLink>

                    <div > <NavLink activeClassName="ActivedMenu"

                        to="/carrinho"><img src={Carrinho} />CARRINHO <span>{pedidos.length}</span></NavLink></div>
                    <NavLink activeClassName="ActivedMenu"to="/login"><img src={login} />LOGIN </NavLink>
                </nav>



            </div>

        </div>
    )
}