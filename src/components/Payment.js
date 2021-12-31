import Logo from "../assets/images/Frame.png"

import "../styles/Payment.scss"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { db } from "../services/firebase"
import swal from "sweetalert2"
import Swal from "sweetalert2"





export function PaymentView(props) {

    const payment = useSelector(state => { return state.payment })
    const [quant, setQuant] = useState(1)
    const [nameStorage, setNameStorage] = useState('')
    const admin = useSelector(state => state.admin)
    const [nameClientAdm, setClientAdm] = useState('undefined')
    const dispatch = useDispatch()


    useEffect(() => {

        handleValue(payment.valueTotal)

    }, [quant])



    function parseQuantidade(event) {

        let quant = parseInt(event.target.value)

        setQuant(quant)
        dispatch({ type: "INCREMENT", payload: quant })

    }


    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }

    function time() {
        let time = new Date()
        let hour = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        let mili = time.getMilliseconds()
        let fulltimeSeconds = (hour * 60 * 60) + (minutes * 60) + seconds
        return { time: fulltimeSeconds, fulltime: `${hour}:${minutes}:${seconds}:${mili}` }
    }


    function pushRequest(event) {
        event.preventDefault()


        let nameClient = document.getElementById("name-client").value
        const typePayment = document.getElementById("type-payment").value


        if (!nameClient) {
            if (!nameStorage) {
                return swal.fire({
                    title: "Por favor, insira seu nome Completo",
                    icon: "warning"

                })
            } else {
                nameClient = nameStorage
            }
        }

        const request = {
            name: [payment.name],
            hour: time().fulltime,
            time: time().time,
            nameClient,
            typePayment,
            type: payment.type,
            img: payment.img,
            value: payment.valueTotal,
            quant: quant,
            pg: 'Em aberto',
            RequestStatus: "received",

        }

        db.collection("Pedidos").add(request).then(() => {
            props.setPayment(false)


            saveName(nameClient)

            return swal.fire({
                title: "Pedido Enviado",
                icon: "success"

            })
        })

        db.collection("Relatorio").add(request).then(() => {
            console.log('success')
        })

    }

    function pushCart(event) {
        event.preventDefault()



        let nameClient = document.getElementById("name-client").value
        const typePayment = document.getElementById("type-payment").value


        if (!nameClient) {
            if (!nameStorage) {
                return swal.fire({
                    title: "Por favor, insira seu nome Completo",
                    icon: "warning"

                })
            } else {
                nameClient = nameStorage
            }
        }


        const request = {
            name: payment.name,
            hour: time(),
            nameClient,
            typePayment,
            type: payment.type,
            img: payment.img,
            value: payment.valueTotal,
            quant: quant,
            RequestStatus: "received",

        }

        dispatch({ type: "ADDCART", payload: request })

        saveName(nameClient)


        props.setPayment(false)
    }

    function saveName(name) {

        localStorage.setItem("nameClient", JSON.stringify(name))

    }

    useEffect(() => {

        const nameClientSaved = JSON.parse(localStorage.getItem("nameClient"))

        if (nameClientSaved) {
            setNameStorage(nameClientSaved)
        }

    }, [])

    useEffect(() => {


        let savedAdm = JSON.parse(localStorage.getItem("adminLog"))
        if (savedAdm) {
            dispatch({ type: "LOGIN", payload: savedAdm })
        }

    }, [])


    return (
        <div className="content-payment">

            <div className="payment-card">

                <div className="request">
                    <img src={payment.img}></img>

                    <p>Total: {handleValue(payment.valueTotal)}
                        <input onChange={parseQuantidade} id="quantidade" type="number" placeholder="1" min="1"></input>

                    </p>


                    <p> {payment.desc.map((item) => {
                        return item
                    })}</p>

                </div>

                <form>
                    <img src={Logo}></img>
                    {nameStorage ? <p id="name-client" value={nameClientAdm} inputlaceholder="nome completo"></p> : <input id="name-client" placeholder="nome completo" ></input>}

                    <div>
                        <label>Forma de pagamento:</label>
                        <select id="type-payment">
                            <option>Cartão</option>
                            <option>Pix</option>
                            <option>Dinheiro</option>
                        </select>
                    </div>

                    <button onClick={pushRequest}>FAZER PEDIDO</button>
                    <button className="add-cart" onClick={pushCart}>ADICIONAR AO CARRINHO</button>
                    {admin? <button onClick={(event) => {
                        event.preventDefault()
                        setNameStorage('')
                        localStorage.setItem("nameClient", JSON.stringify(''))
                    }}> RESETAR</button>: ''}
                    <div onClick={() => props.setPayment(false)} className="button-cancel">CANCELAR</div>

                </form>
            </div>
        </div>
    )
}