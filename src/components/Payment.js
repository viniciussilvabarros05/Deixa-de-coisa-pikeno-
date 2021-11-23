import Logo from "../assets/images/Frame.png"

import "../styles/Payment.scss"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { db } from "../services/firebase"





export function PaymentView(props) {

    const payment = useSelector(state => { return state.payment })
    const [quant, setQuant] = useState(1)
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

    function pushRequest(event) {
        event.preventDefault()

        const nameClient = document.getElementById("name-client").value
        const typePayment = document.getElementById("type-payment").value

        if(!nameClient){
            return alert("Por favor, insira seu nome completo")
        }

        function time(){
            let time = new Date()
            let hour = time.getHours()
            let minutes = time.getMinutes()
            let seconds = time.getSeconds()

            return `${hour}:${minutes}:${seconds}`
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

        db.collection("Pedidos").add(request).then(()=>{
            props.setPayment(false)
            return alert("Pedido Enviado")
        })

    }



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
                    <input id="name-client" placeholder="nome completo"></input>

                    <div>
                        <label>Forma de pagamento:</label>
                        <select id="type-payment">
                            <option>Cartão</option>
                            <option>Pix</option>
                            <option>Dinheiro</option>
                        </select>
                    </div>

                    <button onClick={pushRequest}>FAZER PEDIDO</button>
                    <div onClick={() => props.setPayment(false)} className="button-cancel">CANCELAR</div>

                </form>
            </div>
        </div>
    )
}