
import { useDispatch } from "react-redux"
import "./styles/Admin.scss"
import { NavLink } from "react-router-dom"
import { RegisterUser } from "./components/registerUser"

import Home from "../assets/images/Home.svg"
import Menu from "../assets/images/Menu.svg"
import pdf from "../assets/images/pdf.png"
import clientes from '../assets/images/grupo.png'
import dinheiro from '../assets/images/dinheiro.png'
import grafico from '../assets/images/grafico.png'
import { useState } from "react"
import Swal from "sweetalert2"
export function Admin() {

    const dispatch = useDispatch()
    const [menuLateral, setMenuLateral] = useState(false)

    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
    }

    function sendEmail() {
    

        try {
            fetch("http://localhost:3000/api/sendemail")
                .then(response => console.log(response))
                .then(data => {
                    return Swal.fire({
                        title: 'Email enviado',
                        icon: 'success'
                    })

                })
        } catch (err) {
            if (err) {
                console.log(err.message)
            }
        }

    }

    return (
        <div className="content-admin">
            <div className="menu-hamburguer"
                onClick={() => setMenuLateral(true)}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className={`menu-bar ${menuLateral ? "menuExposed" : "menuhiddenADM"}`}>
                <div className="menu-hamburguer"
                    onClick={() => setMenuLateral(false)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>

                <NavLink activeClassName="ActiveMenuADM" to="/adminpikeno">
                    <img src={Home} /> Dashboard
                </NavLink>
                <NavLink activeClassName="ActiveMenuADM" to="/cardapio">
                    <img src={Menu} />
                    Cardapio</NavLink>
                <NavLink activeClassName="ActiveMenuADM" onClick={sendEmail} to="#">
                    <img src={pdf} />
                    Relatório</NavLink>
                <NavLink activeClassName="ActiveMenuADM" to=" ">
                    <img src={clientes} />
                    Clientes</NavLink>
                <NavLink activeClassName="ActiveMenuADM" to=" ">
                    <img src={Home} />
                    Usuários</NavLink>
                <NavLink activeClassName="ActiveMenuADM" onClick={logout} to=" ">
                    <img src={Home} />
                    Sign out</NavLink>
            </div>


            <div className="dashboard">

                <div className="card-board">
                    <div>
                        <span  >
                            1,500
                            <p>
                                Total de clientes
                            </p>
                        </span>
                        <img src={clientes}></img>


                    </div>
                    <div>
                        <span>
                            15
                            <p>
                                Vendas do dia
                            </p>
                        </span>
                        <img src={grafico}></img>

                    </div>
                    <div>
                        <span>
                            R$ 800,00
                            <p>
                                Total
                            </p>
                        </span>
                        <img src={dinheiro}></img>

                    </div>
                </div>
                <div className="content-relatorio">
                    <div className="relatorio">
                        <h1>Relatório do dia</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Pagamento</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>
                                <tr>
                                    <td>Invocado</td>
                                    <td>R$18,00</td>
                                    <td>Pago</td>
                                    <td>Entregue</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                    <div className="ranking">
                        <h1>Mais saídos</h1>
                        <ul>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                Invocado
                            </li>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                Tem como não
                            </li>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                Bolo
                            </li>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                invocado, combo
                            </li>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                Brocado
                            </li>
                            <li>
                                <img src="https://firebasestorage.googleapis.com/v0/b/deixa-de-coisa-pikeno.appspot.com/o/Images%2Finvocado.jpeg?alt=media&token=7fbe0b46-a848-45c8-9eb8-7851db1650fc"></img>
                                Invocado
                            </li>

                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}