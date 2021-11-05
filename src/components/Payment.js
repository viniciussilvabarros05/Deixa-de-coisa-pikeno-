import Logo from "../assets/images/Frame.png"

import "../styles/Payment.scss"
import { useSelector } from "react-redux"




export function PaymentView(props) {

    const payment = useSelector(state=> {return state.payment})

    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }


    return (
        <div className="content-payment">
            <div className="payment-card">
                <div className="request">
                    <img src={payment.img}></img>
                
                    <p>Total: {handleValue(payment.value)}<input id="quantidade" type="number"placeholder="1"  min="1"></input></p>
                    
                    <p> {payment.desc.map((item)=>{
                        return item +", "
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


                    <button onClick ={()=>props.setPayment(false)}>ADICIONAR AO CARRINHO</button>
                    <div  onClick ={()=>props.setPayment(false)} className="button-cancel">CANCELAR</div>

                </form>
            </div>
        </div>
    )
}