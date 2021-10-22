import "../styles/Card.scss"
import teste from "../assets/images/teste1.png"
import hamburguer from "../assets/images/Hamburguer.svg"
import { cardapio } from "../services/cardapio"

export function Card(props) {

    const { type, name, desc, value, img } = cardapio.hamburgueres[0]

    let currencyValue = value.toLocaleString("pt-br", {style:"currency", currency:"brl"})


    return (
        <div>
            <div className='card'>
                <img src={img}></img>
                <img src={type}></img>
                <div className="name">{name}____<span>{currencyValue}</span> </div>

                <ul>
                    { desc.map((item=>{
                        console.log(item)
                        return (<li>{item}</li>)
                    }))}
                </ul>

                <button onClick={() => props.setPayment(true)}>PEDIR AGORA!</button>
            </div>
        </div>

    )
}