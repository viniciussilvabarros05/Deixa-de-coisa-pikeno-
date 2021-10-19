import LogoBorder from "../assets/images/BorderLogo.png"
import { Link, NavLink } from "react-router-dom"

import Carrinho from "../assets/images/Carrinho.svg"

import Home from "../assets/images/Home.svg"

import Menu from "../assets/images/Menu.svg"

import Contatos from "../assets/images/Contatos.svg"

import Pedidos from "../assets/images/Pedidos.svg"

import Sobre from "../assets/images/Sobre.svg"
import { useDispatch, useSelector } from "react-redux"

import { menuActived, menuDisable } from "../actions/actionList"


export function MenuLateral() {

    const dispatch = useDispatch()

    const menuLateral = useSelector(state => { return state.menuLateral })

    function MenuDisable() {
        dispatch(menuDisable())
        console.log(menuLateral)
    }
    return (
        <>

            <div className={`menu-lateral ${menuLateral ? "menuExposed" : "menuhidden"}`}>
                <div onClick={MenuDisable} className="menu-hamburguer">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <img src={LogoBorder} />
                <nav className="menu-links">
                    <NavLink activeClassName="ActivedMenu" to="/Home"><img src={Home} />HOME</NavLink>


                    <NavLink activeClassName="ActivedMenu"
                     
                     to="/cardapio"><img src={Menu} />CARDAPIO</NavLink>


                    <NavLink activeClassName="ActivedMenu"
                  
                     to="/pedidos"><img src={Pedidos} />PEDIDOS</NavLink>


                    <NavLink activeClassName="ActivedMenu"
                   
                     to="/contatos"><img src={Contatos} />CONTATOS</NavLink>


                    <NavLink activeClassName="ActivedMenu"
                     
                     to="/sobre"><img src={Sobre} />SOBRE</NavLink>

                    <div> <NavLink activeClassName="ActivedMenu"
                     
                     to="/carrinho"><img src={Carrinho} />CARRINHO</NavLink></div>
                </nav>



            </div>

        </>
    )
}