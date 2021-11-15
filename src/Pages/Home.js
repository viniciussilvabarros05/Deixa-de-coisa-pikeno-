import { Header } from "../components/Header";
import { PaymentView } from "../components/Payment";
import "../styles/Home.scss"
import { Card } from "../components/card";


import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Garrafa from "../assets/images/Bebida.svg"
import Bolo from "../assets/images/Doce.svg"
import fundoOfertas from "../assets/images/fundoOfertas.svg"



import teste2 from "../assets/images/teste2.jpg"
import { Footer } from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../services/firebase"
import { useEffect, useState } from "react";
import { parsedMenuBar } from "../actions/actionList";

export function Home() {


    const [payment, setPayment] = useState(false)
    const [animation, setAnimation] = useState(false)
    const Cardapio = useSelector(state => state.cardapio)
    const type_produtos = useSelector(state => { return (state.parsedMenuBar) })
    let arrayProdutos = []
    const dispatch = useDispatch()



    useEffect(() => {
       
    
        const unsubscribe = db.collection(type_produtos).onSnapshot((doc) => {
            const arrayItens = []
            
            doc.forEach(item => {
                arrayItens.push(item.data())
            })
            arrayProdutos = arrayItens
            dispatch({ type: "DATABASE", payload: arrayProdutos })

        })
        console.log("oi")
        
        return () => {
            unsubscribe()
        }

    }, [type_produtos])



    function parseItemsMenu(i) {

        if (type_produtos === i) {
            return
        }
        setAnimation(true)

        setTimeout(() => dispatch(parsedMenuBar(i)), 400)
        setTimeout(() => { setAnimation(false) }, 700)

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
                    <Card animation={animation} setAnimation={setAnimation} setPayment={setPayment}></Card>
                </div>

                <div className="bem-vindo">
                    <h1>OFERTAS DO DIA!</h1>
                </div>

                <div className="ofertas">
                    <div className="content-produto"><img src={teste2} /></div>
                    <div className="descrição"><img src={fundoOfertas}></img></div>
                    <div className="descrição-ofertas">
                        <div className="name">hamburguer____<span>R$ 20,00</span></div>

                        <ul>
                            <li>Carne 220g</li>
                            <li>Alface</li>
                            <li>Cebola</li>
                            <li>Ovo</li>
                            <li>Queijo</li>
                        </ul>



                        <button onClick={() => setPayment(true)}>PEDIR AGORA!</button>
                    </div>
                </div>

            </main>
            {payment ? <PaymentView setPayment={setPayment}></PaymentView> : ""}
            <Footer></Footer>
        </div>
    )
}