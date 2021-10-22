import teste2 from "../assets/images/teste2.jpg"
import Hamburguer from "../assets/images/Hamburguer.svg"

export function CardRequest() {
    return (
        <div className ="list-request">
            <div className="CardRequest">
                <div>
                    <img src={teste2} />
                    <img src={Hamburguer} />
                    <p className = "desc">Hamburguer</p>
                    <p className = "value">R$ 20,00</p>
                </div>
                <span>Status: <p>Em preparo</p></span>

            </div>
        </div>
    )
}