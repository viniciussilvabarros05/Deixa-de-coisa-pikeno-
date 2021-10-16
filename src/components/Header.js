import React from "react"
import "../styles/Header.scss"

import Logo from "../assets/images/Logo.svg"
export function Header(props) {

    return (
        <header>

            <div>
                <div  onClick = {()=>{props.setMenu(true)
                console.log(props.Menu)}}className="menu-hamburguer">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                
            </div>
            <img src={Logo} />
            

        </header>
    )
}