import "../styles/Card.scss"
import teste from "../assets/images/teste1.png"
import hamburguer from "../assets/images/Hamburguer.svg"
export function Card() {
    return (
        <div>
            <div className='card'>
                <img src={teste}></img>
                <img src={hamburguer}></img>
                <div>hamburguer____ R$ 20,00</div>
            
                    <ul>
                        <li> Carne 220g</li>
                        <li> Alface, Cebola</li>
                        <li>Ovo, Queijo</li>
                    </ul>
                   
               
                <button></button>
            </div>
        </div>

    )
}