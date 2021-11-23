import { useState } from "react"
import { useSelector } from "react-redux"
import pronto from "../assets/images/direito.png"
import panela from "../assets/images/panela-quente.png"
import { db } from "../services/firebase"

export function CardRequest(props) {
    const admin = useSelector(state => state.admin)


    function ready() {
        db.collection("Pedidos").where("nameClient", "==", props.item.nameClient).where("hour", "==", props.item.hour).get().then(doc => {
            doc.forEach(item => {
                db.collection("Pedidos").doc(item.id).update({
                    RequestStatus: "ready"
                })
            })
        })
    }



    function cooking() {
        db.collection("Pedidos").where("nameClient", "==", props.item.nameClient).where("hour", "==", props.item.hour).get().then(doc => {

            doc.forEach(item => {
                db.collection("Pedidos").doc(item.id).update({
                    RequestStatus: "cooking"
                })
            })

        })
    }

    function Delete() {
        const confirm = window.confirm("Certeza que deseja excluir esse pedido?")
        if (confirm) {
            db.collection("Pedidos").where("nameClient", "==", props.item.nameClient).where("hour", "==", props.item.hour).get().then(doc => {

                doc.forEach(item => {
                    db.collection("Pedidos").doc(item.id).delete()
                })

            })
        }

    }


    return (
        <div className="list-request">
            <div className={`CardRequest ${props.item.RequestStatus == "received" ? "" : props.item.RequestStatus == "ready" ? "ready" : "cooking"}`}>
                <div>
                    <img id="image-product" src={props.item.img} />
                    <h1 className="desc">{props.item.name}</h1>
                    <p className="value">Cliente: {props.item.nameClient}</p>
                    <p className="desc">{props.item.typePayment}</p>
                    <p className="value">R$ {props.item.value}</p>
                    <p Style="color:var(--preto-cinza);">Quantidade:{props.item.quant}</p>

                    <div className="content-buttons">
                        {admin ? <button onClick={cooking} className="preparando"><img src={panela}></img></button> : ""}
                        {admin ? <button onClick={ready} className="pronto"><img src={pronto}></img></button> : ""}
                        {admin ? <button onClick={Delete} className="pronto">X</button> : ""}

                    </div>
                </div>


            </div>

        </div>
    )
}