import LogoYellow from "../assets/images/LogoYellow.svg"
import Whatsapp from "../assets/images/whatsapp.svg"
import Instagram from "../assets/images/instagram.svg"
import Localização from "../assets/images/localização.svg"

export function Footer() {
    return (
        <footer>
            <img src={LogoYellow} />

            <div className="contatos">

                <a target="blank" href="https://www.instagram.com/deixadecoisa_pikeno/" className="instagram">
                    <img src={Instagram} />
                    <span>@deixadecoisa_pikeno</span>
                </a>

                <div className="localização" onClick={() => {
                    window.open(
                        'http://api.whatsapp.com/send?1=pt_BR&phone=5598982115974',
                        '_system', 'location=yes'); return false;
                }}
                >
                    <img src={Whatsapp} />
                    <span>
                        Whatsapp <br></br>
                        (+55) 98 982115974
                       </span>
                </div >

                <a className="whatsapp">
                    <img src={Localização} />
                    <span>Av Rui Barbosa 119-Madre Deus</span>
                </a >

            </div>

            <div className="bar-footer">

            </div>
        </footer >
    )
}