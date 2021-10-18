import React from "react"
import "../styles/Header.scss"
import Logo from "../assets/images/Logo.svg"

import { menuActived } from "../actions/actionList"
import { useDispatch, useSelector } from "react-redux"
export function Header() {

    const menuLateral = useSelector((state) => { return state.menuLateral })
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