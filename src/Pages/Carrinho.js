
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components/Header";
import "../styles/Carrinho.scss"
import { db } from "../services/firebase";
import swal from "sweetalert2";
export function Carrinho() {

    const carrinho = useSelector(state => state.carrinho)
    const dispatch = useDispatch()
    let valueTotalCart = 0
    function DeleteItem(item) {
        dispatch({ type: "REMOVECART", payload: item })
    }

    function time() {

        let time = new Date()
        let hour = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()

        let fulltime = (hour * 60 * 60) + (minutes * 60) + seconds
        return fulltime
    }



    function ConfirmItem() {
        let some = 0
        let quant = 0
        let names = []

        if (carrinho.length == 0) {
            return swal.fire({
                title: "Carrinho Vazio",
                icon: "warning"

            })
        }
        carrinho.map(item => {
            some = some + parseFloat(item.value)
            quant = quant + parseInt(item.quant)
            console.log(item)
            names.push({ name: item.name.name, quantidade: item.quant, value: item.value })
        })


        const RequestFromCart = {
            name: names,
            nameClient: carrinho[0].nameClient,
            value: some,
            typePayment: carrinho[0].typePayment,
            RequestStatus: carrinho[0].RequestStatus,
            quant: quant,
            hour: carrinho[0].hour,
            time: time()

        }

        db.collection("Pedidos").add(RequestFromCart).then(() => {

            return swal.fire({
                title: "Pedidos Enviados",
                icon: "success"

            })
        })

        dispatch({ type: "ADDCART", payload: [] })
    }

    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }

    console.log(carrinho)

    return (
        <>
            <Header></Header>
            <div className='content-cart'>



                {carrinho.length == 0? <div className="message-not-requests"><h1>Ops.. Seu carrinho está vazio</h1></div>:carrinho.map((item, index) => {

                    valueTotalCart = carrinho.reduce((acc, value) => {
                        return (acc + value.value)
                    }, 0)
                    return (

                        <div className="cart-card">

                            <div className="nameProduct">

                                <div className="content-image"> <img src={item.img}></img></div>
                                <span>Quantidade:  {item.quant}</span>

                                <p>{item.name.name ? item.name.name : item.name}</p>
                                <span>{handleValue(item.value)}</span>
                                <div>

                                    <button onClick={() => DeleteItem(item.hour)}>X</button>
                                </div>

                            </div>

                        </div>
                    )
                })}

            </div>
            {carrinho.length !== 0 ?
                <div className="content-button-confirm">
                    <span>TOTAL: {handleValue(valueTotalCart)}</span>
                    < button className="confirm-cart" onClick={ConfirmItem}>

                        Confirmar

                    </button>
                </div> : ""}

        </>
    )


}