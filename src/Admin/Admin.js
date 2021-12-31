import "./styles/Admin.scss"

import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { RegisterUser } from "./components/registerUser"

import Home from "../assets/images/Home.svg"
import Menu from "../assets/images/Menu.svg"
import pdf from "../assets/images/pdf.png"
import clientes from '../assets/images/grupo.png'
import dinheiro from '../assets/images/dinheiro.png'
import grafico from '../assets/images/grafico.png'
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { db, storage } from "../services/firebase"



export function Admin() {
    const ref = storage.ref('/relatorio')
    const dispatch = useDispatch()
    const [menuLateral, setMenuLateral] = useState(false)
    const [relatorio, setRelatorio] = useState([])
    const [maisSaidos, setMaisSaidos] = useState([])

    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
    }

    function sendEmail() {

        try {

            const filePath = ref.child("relatório.pdf").getDownloadURL().then(url => {
                fetch('/api/sendemail', {
                    method: 'POST',
                    body: JSON.stringify(url),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "*"
                    },
                }).then(response => {
                    console.log(response)

                }).then(data => {
                    Swal.fire({ title: "Email enviado com sucesso", icon: 'success' })
                })
            })

        } catch (error) {
            if (error) {
                Swal.fire({ title: error, icon: 'error' })
            }

        }



    }
    function sumAllLucros() {
        const AllLucros = relatorio.reduce((acumulator, atual) => {
            return acumulator + atual.value
        }, 0)

        return AllLucros
    }

    function sumAllVendas() {
        const allVendas = relatorio.reduce((acumulator, atual) => {


            return acumulator + atual.name.length
        }, 0)

        return allVendas
    }
    function handleValue(value = 0) {

        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }
    useEffect(() => {

        let QuantidadeSaidos = []
        relatorio.forEach(data => {
            data.name.map((item, index) => {

                let checkExist = QuantidadeSaidos.filter(exist => exist.item.name === item.name)

                if (checkExist.length > 0) {
                    checkExist.forEach(checkItem => {
                        QuantidadeSaidos.forEach(QuantItem => {
                            if (checkItem.item.name === QuantItem.item.name) {
                                QuantItem.item.quantidade += checkItem.item.quantidade
                            }
                        })
    
                      
                    })

                    return
                }
                QuantidadeSaidos.push({ item, img: data.img })
            })
        })

        QuantidadeSaidos.sort((a,b)=>{
            if(a.item.quantidade> b.item.quantidade){
                return -1
            }else{
                return 1
            }
        })
        console.log(QuantidadeSaidos)
        setMaisSaidos(QuantidadeSaidos)
    }, [relatorio])

    useEffect(() => {

        const unsubscribe = db.collection('Relatorio').onSnapshot(snapshot => {
            const arrayRelatorio = []
            snapshot.forEach(item => {
                arrayRelatorio.push(item.data())
            })

            setRelatorio(arrayRelatorio)
            console.log('oi')
        })

        return () => {
            unsubscribe()
        }
    }, [])

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
                <a onClick={sendEmail} href="#">
                    <img src={pdf} />
                    Relatório</a>
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
                            {relatorio.length}
                            <p>
                                Total de clientes
                            </p>
                        </span>
                        <img src={clientes}></img>


                    </div>
                    <div>
                        <span>
                            {sumAllVendas()}
                            <p>
                                Vendas do dia
                            </p>
                        </span>
                        <img src={grafico}></img>

                    </div>
                    <div>
                        <span>
                            {handleValue(sumAllLucros())}
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
                                    <th>Cliente</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Pagamento</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relatorio.map((item, index) => {

                                    return (

                                        <tr key={item.hour}>
                                            <td>{item.nameClient}</td>
                                            <td>{item.name[0] ? item.name.map(data => {
                                                return (<p key={item.hour} >{data.name}, </p>)
                                            }) : item.name.name}</td>
                                            <td>{handleValue(item.value)}</td>
                                            <td>{item.pg}</td>
                                            <td>{item.RequestStatus}</td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>

                    </div>

                    <div className="ranking">
                        <h1>Mais saídos</h1>
                        <ul>
                            {maisSaidos.map(item => {
                                return (<li>
                                    <img src={item.img? item.img: item.item.img}></img>
                                    {item.item.name}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}