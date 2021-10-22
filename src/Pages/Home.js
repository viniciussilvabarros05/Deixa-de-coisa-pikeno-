import { Header } from "../components/Header";
import { PaymentView } from "../components/Payment";
import "../styles/Home.scss"
import { Card } from "../components/card";


import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Garrafa from "../assets/images/Garrafa.svg"
import Bolo from "../assets/images/Bolo.svg"
import fundoOfertas from "../assets/images/fundoOfertas.svg"
import { cardapio } from "../services/cardapio";


import teste2 from "../assets/images/teste2.jpg"
import { Footer } from "../components/Footer";
import {useDispatch, useSelector } from "react-redux";

import { useState } from "react";
export function Home() {

    
    const dispatch = useDispatch()
    const [payment, setPayment] = useState(false)

    return (
        <div>
            <Header></Header>
         
            <main>
                <div className="bem-vindo">
                    <h1>BEM VINDOS</h1>
                    <h3>Aproveite a estadia, venha sempre e traga seu apetite </h3>
                </div>


                <div className="bar-cardapio">
                    <img src={Hamburguer} />
                    <div className="point"></div>
                    <img src={Combo} />
                    <div className="point"></div>
                    <img src={Bolo} />
                    <div className="point"></div>
                    <img src={Batata} />
                    <div className="point"></div>
                    <img src={Garrafa} />
                </div>


                <div className="cardapio">
                    <Card setPayment = {setPayment}></Card>
                    <Card setPayment = {setPayment}></Card>
                    <Card setPayment = {setPayment}></Card>
                    <Card setPayment = {setPayment}></Card>
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



                        <button onClick = {()=>setPayment(true)}>PEDIR AGORA!</button>
                    </div>
                </div>

            </main>
            { payment? <PaymentView setPayment = {setPayment}></PaymentView>: "" }
            <Footer></Footer>
        </div>
    )
}