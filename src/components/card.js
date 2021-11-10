import "../styles/Card.scss"
import {cardapio} from "../services/cardapio"
import { useSelector, useDispatch } from "react-redux"
import { invocPayment } from "../actions/actionList"

export  function Card(props) {

    const type_produtos = useSelector(state => { return state.parsedMenuBar })
    const Cardapio =  useSelector(state =>  state.cardapio)
    const cardapioProdutos = Object.getOwnPropertyDescriptor(Cardapio, type_produtos)
    const dispatch = useDispatch()
    

    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }

    async function PaymentCard(i) {
        await dispatch(invocPayment(i))
        props.setPayment(true)
    }


    return (
        <div className={`content-card ${props.animation ? "animation-cardapio" : ''}`}>

            {cardapioProdutos.value.map((item, index) => {

                const ItemRequest = {
                    type: item.type,
                    value: item.value,
                    name: item.name,
                    img: item.img,
                    desc: item.desc,
                    quant: item.quant,
                    valueTotal: item.value * item.quant
                }


                return (

                    <div key={index} className="card">
                        <img src={item.img}></img>
                        <img src={item.type}></img>
                        <div className="name">{item.name}____<span>{handleValue(item.value)}</span> </div>

                        <ul>
                            {item.desc.map((items, id) => {

                                return (<li key={id}>{items}</li>)
                            })}
                        </ul>


                        <button onClick={() => PaymentCard(ItemRequest)}>PEDIR AGORA!</button>
                    </div>
                )
            }
            )

            } </div>

    )
}