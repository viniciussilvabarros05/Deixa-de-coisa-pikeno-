
import { useSelector } from "react-redux"
import pronto from "../assets/images/direito.png"
import panela from "../assets/images/panela-quente.png"
import { db } from "../services/firebase"
import pdfImg from "../assets/images/pdf.png"
import makeNoteRequests from "../services/pdfMake"

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
    function handleValue(value = 0) {

        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })

    }


    return (
        <div className={`list-request ${props.item.RequestStatus == "received" ? "" : props.item.RequestStatus == "ready" ? "ready" : "cooking"}`}>

            <div className={`CardRequest ${props.item.RequestStatus == "received" ? "" : props.item.RequestStatus == "ready" ? "ready" : "cooking"}`}>

                <div id="description-item">
                    {admin ? <h3>{props.order + 1}</h3> : ""}

                    <h1 className="value"> {props.item.nameClient}</h1>

                    <div className="subtitle">Pedido(s)</div>
                    {props.item.name.map((item, index) => {
                        return (

                            <p key={index} className="desc">{item.quantidade ? `${item.quantidade} ,  ${item.name}` : item}</p>
                        )
                    })}


                    <div className="subtitle">Tipo de Pagamento</div>
                    <p className="desc">{props.item.typePayment}</p>

                    <div className="subtitle">Valor</div>
                    <p className="value"> {handleValue(props.item.value)}</p>

                    <div className="subtitle">Quantidade</div>
                    <p Style="color:var(--preto-cinza);">{props.item.quant}</p>

                    <div className="content-buttons">
                        {admin ? <button onClick={cooking} className="preparando"><img src={panela}></img></button> : ""}
                        {admin ? <button onClick={ready} className="pronto"><img src={pronto}></img></button> : ""}
                        {admin ? <button onClick={Delete} className="pronto">X</button> : ""}

                    </div>

                </div>
                {admin ? <button className="makePDFButton" onClick={() => makeNoteRequests(props.item)}>
                    <img src={pdfImg} alt="gerar nota "></img>
                
                </button> : ""}

            </div>

        </div>
    )
}