import "../styles/Card.scss"
import teste from "../assets/images/teste1.png"
import hamburguer from "../assets/images/Hamburguer.svg"
import { cardapio } from "../services/cardapio"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export function Card(props) {

    


    let type_produtos = useSelector(state => {return (state.parsedMenuBar) })
    const cardapioProdutos = Object.getOwnPropertyDescriptor(cardapio, type_produtos)

    

    
    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }

    console.log(type_produtos)

    return (
        <div className ={`content-card ${props.animation? "animation-cardapio" : ''}`}>{cardapioProdutos.value.map((item, index) => {
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

                    <button onClick={() => props.setPayment(true)}>PEDIR AGORA!</button>
                </div>
            )
        }
        )

        } </div>

    )
}