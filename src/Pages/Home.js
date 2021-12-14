import { Header } from "../components/Header";
import { PaymentView } from "../components/Payment";
import { Card } from "../components/card";
import { Footer } from "../components/Footer";

import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Garrafa from "../assets/images/Bebida.svg"
import Bolo from "../assets/images/Doce.svg"
import fundoOfertas from "../assets/images/fundoOfertas.svg"
import backgroundHamburguer from "../assets/images/backgroundHamburguer.png"
import backgroundBatatas from "../assets/images/backgroundBatatas.png"
import backgroundCebolas from "../assets/images/backgroundCebolas.png"


import { useDispatch, useSelector } from "react-redux";
import { db } from "../services/firebase"
import { useEffect, useState } from "react";
import swal from "sweetalert2"
import { invocPayment, parsedMenuBar } from "../actions/actionList";

import "../styles/Home.scss"

export function Home() {


    const [payment, setPayment] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [oferta, setOferta] = useState('')
    const type_produtos = useSelector(state => { return (state.parsedMenuBar) })
    const dispatch = useDispatch()
    const pedidos = useSelector(state => state.pedidos)
    let arrayProdutos = []

    useEffect(async () => {

        const unsubscribe = await db.collection(type_produtos).onSnapshot((doc) => {
            const arrayItens = []

            doc.forEach(item => {
                arrayItens.push(item.data())
            })
            arrayProdutos = arrayItens
            dispatch({ type: "DATABASE", payload: arrayProdutos })

        })

        return () => {
            unsubscribe()
        }

    }, [type_produtos])

    useEffect(() => {
        const unsubscribe = db.collection("ofertas").doc("oferta").onSnapshot(doc => {
            setOferta(doc.data())
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {

        pedidos.forEach(item => {
            if (item.RequestStatus == "ready") {

                return swal.fire({
                    html: '<pre>' + "Seu Pedido " + `<p>${item.name.map(desc => desc.name)}</p>` + " está pronto" + '</pre>',
                    imageUrl: item.img,
                    imageWidth: 200,
                    background: "#A31E23",

                    width: "110%",
                    customClass: {
                        popup: "notification"
                    },
                    confirmButtonText: "Tô indo"

                })

            }
        })

    }, [pedidos])


    useEffect(() => {

        const name = JSON.parse(localStorage.getItem("nameClient"))
        const unsubscribe = db.collection("Pedidos").where("nameClient", "==", name).onSnapshot((snapshot) => {

            const requestDB = []
            snapshot.forEach(item => {
                requestDB.push(item.data())
            })

            dispatch({ type: "REQUEST", payload: requestDB })
        })

        return () => {
            unsubscribe()
        }
    }, [])



    async function parseItemsMenu(i) {

        if (type_produtos === i) {
            return
        }
        setAnimation(true)

        setTimeout(() => dispatch(parsedMenuBar(i)), 400)
        setTimeout(() => setAnimation(false), 800)

    }


    async function PaymentCard(i) {
        const { value, desc, name, img, type } = i
        await dispatch(invocPayment({
            value,
            desc,
            name: {name},
            img,
            type,
            valueTotal: value
        }))
        setPayment(true)


    }

    function handleValue(value = 0) {

        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }



    return (
        <div>
            <Header></Header>

            <main>
                <div className="bem-vindo">
                    <h1>BEM VINDOS</h1>
                    <h3>Aproveite a estadia, venha sempre e traga seu apetite </h3>
                </div>


                <div className="bar-cardapio">
                    <img onClick={() => parseItemsMenu("hamburgueres")} src={Hamburguer} />
                    <div className="point"></div>
                    <img onClick={() => parseItemsMenu("combos")} src={Combo} />
                    <div className="point"></div>
                    <img onClick={() => parseItemsMenu("doces")} src={Bolo} />
                    <div className="point"></div>
                    <img onClick={() => parseItemsMenu("batatas")} src={Batata} />
                    <div className="point"></div>
                    <img onClick={() => parseItemsMenu("bebidas")} src={Garrafa} />
                </div>


                <div className="cardapio">
                    <img id="backgroundHamburguer" src={backgroundHamburguer} alt="hamburguer"></img>
                    <img id="backgroundBatatas" src={backgroundBatatas} alt="batatas"></img>
                    <img id="backgroundCebolas" src={backgroundCebolas} alt="cebolas"></img>
                    <Card animation={animation} setAnimation={setAnimation} setPayment={setPayment}></Card>
                </div>

                <div className="bem-vindo">
                    <h1>OFERTAS DO DIA!</h1>
                </div>

                <div className="ofertas">

                    <div className="content-produto"><img src={oferta.img} /></div>
                    <div className="descrição"><img src={fundoOfertas}></img></div>
                    <div className="descrição-ofertas">
                        <div className="name">{oferta.name}____<span>{handleValue(oferta.value)}</span></div>

                        <ul>
                            <li>{oferta.desc}</li>

                        </ul>

                        <button onClick={() => PaymentCard(oferta)}>PEDIR AGORA!</button>
                    </div>
                </div>

            </main>
            {payment ? <PaymentView setPayment={setPayment}></PaymentView> : ""}
            <Footer></Footer>
        </div>
    )
}