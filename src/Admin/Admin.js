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
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts"


export function Admin() {
    const ref = storage.ref('/relatorio')
    const dispatch = useDispatch()
    const [menuLateral, setMenuLateral] = useState(false)
    const [relatorio, setRelatorio] = useState([])
    const [maisSaidos, setMaisSaidos] = useState([])
    const [base64Relatorio, setBase64] = useState('')

    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
    }
    function generatorRelatorio(sumAllLucros, sumAllVendas) {


        Swal.fire({
            title: "Ao emitir o relatório, todos os dados serão resetados",
            text: "Deseja emitir?",
            icon:'info',
            confirmButtonText: "Confirmar",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((result) => {

            if(!result.isConfirmed){
               return
            }else{



                pdfMake.vfs = pdfFonts.pdfMake.vfs

                const date = new Date
        
                const reportTitle = [
        
                    {
                        text: `${date}`,
                        fontSize: 10,
                        bold: true,
                        margin: [15, 0, 0, 15]
                    },
        
                ]
                const dados = relatorio.map(item => {
                    return [
                        { text: item.name.map((request) => request.name + ", "), style: 'tableHeader', fontSize: 12 },
                        { text: handleValue(item.value), style: 'tableHeader', fontSize: 12 },
                        { text: item.quant, style: 'tableHeader', fontSize: 12 },
        
                    ]
                })
        
                const details = [
        
                    {
                        table: {
                            headerRows: 1,
                            widths: [200, '*', '*', 100],
                            body: [
        
                                [
                                    { text: 'Pedidos', style: 'tableHeader', fontSize: 18 },
                                    { text: 'Valor', style: 'tableHeader', fontSize: 18 },
                                    { text: 'Total', style: 'tableHeader', fontSize: 18 },
        
                                ],
        
                                ...dados,
        
                                [
                                    { text: "Total", style: 'tableHeader', fontSize: 16 },
                                    { text: '=', style: 'bold', fontSize: 16 },
                                    { text: handleValue(sumAllLucros), style: 'bold', fontSize: 16 }
                                ],
                                [
                                    { text: "Total de Clientes", style: 'tableHeader', fontSize: 12 },
                                    { text: '=', style: 'tableHeader', fontSize: 12 },
                                    { text: sumAllVendas, style: 'tableHeader', fontSize: 12 }
                                ]
                            ]
                        },
                        layout: "headerLineOnly"
                    }]
        
        
                function Rodape(currentPage, pageCount) {
                    return [
                        {
                            text: currentPage,
                            alignment: 'right',
                            fontSize: 9,
                            margin: [30, 5, 20, 0]
                        }
                    ]
                }
        
                const docDefinitions = {
                    pageSize: 'A4',
                    pageMargins: [30, 15, 15, 30],
                    header: [reportTitle],
                    content: [details],
                    footer: Rodape,
                }
        
                const pdf = pdfMake.createPdf(docDefinitions)
        
                pdf.getBase64(data => {
                    setBase64(data)
                });
                pdf.open()
        
            }
        })


    }

    async function sendEmail() {

        if (base64Relatorio.length === 0) {
            return
        }
        if (relatorio.length === 0) {
            return
        }

        try {


            const push = ref.child('relatório.pdf').putString(base64Relatorio, 'base64').then((snapshot) => {

                ref.child('relatório.pdf').getDownloadURL().then(url => {
                    fetch('/api/sendemail', {
                        method: 'POST',
                        body: JSON.stringify(url),
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Methods": "*"
                        },
                    }).then(response => {
                        console.log('pdf enviado')

                        db.collection('Relatorio').get().then(doc => {
                            doc.forEach(item => {
                                db.collection('Relatorio').doc(item.id).delete()
                            })

                            setRelatorio([])
                        })

                    }).then(data => {
                        Swal.fire({ title: "Email enviado com sucesso", icon: 'success' })
                    })
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

        sendEmail()

    }
        , [base64Relatorio])
    useEffect(() => {
        let QuantidadeSaidos = []

        relatorio.forEach(data => {
            data.name.map((item) => {

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
        QuantidadeSaidos.sort((a, b) => {
            if (a.item.quantidade > b.item.quantidade) {
                return -1
            } else {
                return 1
            }
        })
        setMaisSaidos(QuantidadeSaidos)
    }, [relatorio])

    useEffect(() => {

        const unsubscribe = db.collection('Relatorio').onSnapshot(snapshot => {
            const arrayRelatorio = []
            snapshot.forEach(item => {
                arrayRelatorio.push(item.data())
            })
            setRelatorio(arrayRelatorio)

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
                <a onClick={() => generatorRelatorio(sumAllLucros(), sumAllVendas())} href="#">
                    <img src={pdf} />
                    Relatório</a>
                <NavLink activeClassName="ActiveMenuADM" to="/clientes">
                    <img src={clientes} />
                    Clientes</NavLink>
                <NavLink activeClassName="ActiveMenuADM" to="/usuarios">
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
                                    <img src={item.img ? item.img : item.item.img}></img>
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
