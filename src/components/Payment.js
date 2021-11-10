import Logo from "../assets/images/Frame.png"

import "../styles/Payment.scss"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"





export function PaymentView(props) {

    const payment = useSelector(state => { return state.payment })
    const [quant, setQuant] = useState(0)
    const dispatch = useDispatch()

    function parseQuantidade(event) {

        let quant = parseInt(event.target.value)

        setQuant(quant)
        dispatch({ type: "INCREMENT", payload: quant })

    }


    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }


    useEffect(() => {

        handleValue(payment.valueTotal)

    }, [quant])


return (
    <div className="content-payment">
        <div className="payment-card">
            <div className="request">
                <img src={payment.img}></img>

                <p>Total: {handleValue(payment.valueTotal)}<input onChange={parseQuantidade} id="quantidade" type="number" placeholder="1" min="1"></input></p>

                <p> {payment.desc.map((item) => {
                    return item + ", "
                })}</p>

            </div>
            <form>
                <img src={Logo}></img>
                <input placeholder="nome completo"></input>
                <div>
                    <label>Forma de pagamento:</label>
                    <select>
                        <option>Cartão</option>
                        <option>Pix</option>
                        <option>Dinheiro</option>
                    </select>
                </div>


                <button onClick={() => props.setPayment(false)}>ADICIONAR AO CARRINHO</button>
                <div onClick={() => props.setPayment(false)} className="button-cancel">CANCELAR</div>

            </form>
        </div>
    </div>
)
}