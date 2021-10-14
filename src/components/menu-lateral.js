import LogoBorder from "../assets/images/BorderLogo.png"
import { Link } from "react-router-dom"

import Carrinho from "../assets/images/Carrinho.svg"

import Home from "../assets/images/Home.svg"

import Menu from "../assets/images/Menu.svg"

import Contatos from "../assets/images/Contatos.svg"

import Pedidos from "../assets/images/Pedidos.svg"

import Sobre from "../assets/images/Sobre.svg"

export function MenuLateral() {

    return (
        <div className="menu-lateral">
            <div className="menu-hamburguer">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <img src={LogoBorder} />
            <nav className="menu-links">
                <a href="#"><img src ={Home}/>HOME</a>
                <a href="#"><img src ={Menu}/>CARDAPIO</a>
                <a href="#"><img src ={Pedidos}/>PEDIDOS</a>
                <a href="#"><img src ={Contatos}/>CONTATOS</a>
                <a href="#"><img src ={Sobre}/>SOBRE</a>

                <div> <a href="#"><img src ={Carrinho}/>CARRINHO</a></div>
            </nav>



        </div>
    )
}