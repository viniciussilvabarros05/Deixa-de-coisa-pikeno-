import { CardRequest } from "../components/CardRequest";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/Pedidos.scss"

export function Pedidos(){

    return (
        <div className="content-pedidos">
        <Header></Header>
        <h1>SEUS PEDIDOS:</h1>
        <CardRequest></CardRequest>
        <CardRequest></CardRequest>
        <CardRequest></CardRequest>
        <CardRequest></CardRequest>
        <Footer></Footer>
      
        </div>
    )


}