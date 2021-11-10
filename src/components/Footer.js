import LogoYellow from "../assets/images/LogoYellow.svg"
import Whatsapp from "../assets/images/whatsapp.svg"
import Instagram from "../assets/images/instagram.svg"
import Localização from "../assets/images/localização.svg"

export function Footer() {
    return (
        <footer>
            <img src={LogoYellow} />

            <div className="contatos">

                <div className="instagram">
                    <img src={Instagram} />
                    <span>@deixadecoisa_pikeno</span>
                </div>

                <div className="localização">
                    <img src={Whatsapp} />
                    <span>+55 98 00000000
                        +55 98 00000001</span>
                </div>

                <div className="whatsapp">
                    <img src={Localização} />
                    <span>Rua 0, Casa 0, Avenizada zerada
                        cep 0000000</span>
                </div>

            </div>

            <div className="bar-footer">

            </div>
        </footer>
    )
}