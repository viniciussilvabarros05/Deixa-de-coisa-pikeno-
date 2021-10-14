import { Header } from "../components/Header";
import { MenuLateral } from "../components/menu-lateral";
import "../styles/Home.scss"

import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Garrafa from "../assets/images/Garrafa.svg"
import Bolo from "../assets/images/Bolo.svg"
import { Card } from "../components/card";

export function Home() {
    return (
        <>
            <Header></Header>
            {/* <MenuLateral></MenuLateral> */}
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
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
            <div className="bem-vindo">
                <h1>OFERTAS DO DIA!</h1>
            </div>
        </>

    )
}