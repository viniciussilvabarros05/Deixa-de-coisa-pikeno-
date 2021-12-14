
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
export function Admin() {

    const dispatch = useDispatch()

    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
    }



    return (
        <div className="content-admin">

            <div className="menu-bar">
                <NavLink activeClassName="ActivedMenu" to="/adminpikeno">
                    <img src={Home} /> Dashboard
                </NavLink>
                <NavLink activeClassName="ActivedMenu" to="/cardapio">
                    <img src={Menu} />
                    Cardapio</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/relatorio">
                    <img src={pdf} />
                    Relatório</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/clientes">
                    <img src={Home} />
                    Clientes</NavLink>
                <NavLink activeClassName="ActivedMenu" to="/clientes">
                    <img src={Home} />
                    Usuários</NavLink>
                <NavLink activeClassName="ActivedMenu" onClick={logout} to="/clientes">
                    <img src={Home} />
                    Sign out</NavLink>
            </div>


            <div className="dashboard">

                <div className="card-board">
                    <div>
                        <span>
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