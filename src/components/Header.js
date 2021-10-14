import React from "react"
import "../styles/Header.scss"

import Logo from "../assets/images/Logo.svg"
export function Header(){

    return(
        <header>
           
            <div>
              <img src={Logo}/>
            </div>
          
        </header>
    )
}