import React from "react"
import "../styles/Header.scss"
import Logo from "../assets/images/Logo.svg"

import { menuActived } from "../actions/actionList"
import { useDispatch } from "react-redux"
export function Header() {

    const dispatch = useDispatch()

    function activeMenu() {
        dispatch(menuActived())
    }
    return (
        <header>

            <div>
                <div onClick={activeMenu} className="menu-hamburguer">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </div>
            <img src={Logo} />


        </header>
    )
}