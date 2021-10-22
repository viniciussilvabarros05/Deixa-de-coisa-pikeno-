import Logo from "../assets/images/Logo.svg"
import teste2 from "../assets/images/teste2.jpg"
import "../styles/Payment.scss"

export function PaymentView(props) {

    return (
        <div className="content-payment">
            <div className="payment-card">
                <div className="request">
                    <img src={teste2}></img>
                
                    <p>Total: R$ 20,00</p>
                    <p>Carne 220g, Alface, Cebola, Ovo, Queijo</p>
                    <input id="quantidade" type="number"placeholder="1" min="1"></input>
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