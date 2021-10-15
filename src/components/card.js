import "../styles/Card.scss"
import teste from "../assets/images/teste1.png"
import hamburguer from "../assets/images/Hamburguer.svg"
export function Card() {
    return (
        <div>
            <div className='card'>
                <img src={teste}></img>
                <img src={hamburguer}></img>
                <div className = "name">hamburguer____<span>R$ 20,00</span> </div>
               
                    <ul>
                        <li>Carne 220g</li>
                        <li>Alface</li>
                        <li>Cebola</li>
                        <li>Ovo, Queijo</li>
                    </ul>
              



                <button>PEDIR AGORA!</button>
            </div>
        </div>

    )
}