import "./styles/ModalEdit.scss"
import { db } from "../services/firebase"
import { useSelector } from "react-redux"


import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import bebida from "../assets/images/Bebida.svg"
import Doce from "../assets/images/Doce.svg"
import { useEffect, useState } from "react"
import { storage } from "../services/firebase"

export function ModelEdit(props) {
    const type_produtos = useSelector(state => { return state.parsedMenuBar })
    const [idRef, setId] = useState("empty")


    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }
 

    useEffect(() => {
        db.collection(type_produtos).where("name", "==", props.item.name).get().then(snapshot => {
            snapshot.forEach(doc => {
                let document = doc.id
                setId(document)

            })
        })
    }, [])

    function pushItemUpdated(item) {



        switch (item.type) {

            case "Batata":

                item.type = Batata

                return db.collection(type_produtos).doc(idRef).update(item)
            case "Hamburguer":

                item.type = Hamburguer
                return db.collection(type_produtos).doc(idRef).update(item)

            case "Combo":

                item.type = Combo
                return db.collection(type_produtos).doc(idRef).update(item)
            case "Bebida":

                item.type = bebida
                return db.collection(type_produtos).doc(idRef).update(item)
            case "Doce":

                item.type = Doce
                return db.collection(type_produtos).doc(idRef).update(item)
            default:
                return;
        }



    }

    function updateItem() {
        let type = document.getElementById("type-product").value
        let name = document.getElementById("name").value
        let value = document.getElementById("value").value
        let img = document.getElementById("file").files[0]
        let allDescription = document.querySelectorAll(".description")
        let allValues = []
        let ref = storage.ref("/Images")

     

        allDescription.forEach(item => {
            if (item.value.length == 0) {
                return
            }
            allValues.push(item.value)
        })

        if (!name) {
            name = props.item.name

        }

        if (!value) {
            value = props.item.value
        }

        if (allValues.length == 0) {
            allValues = props.item.desc
        }

        if (!img) {
            props.setModelEdit(false)
            return pushItemUpdated({ img: props.item.img, type: type, name: name, value: parseFloat(value), desc: allValues })
        }

        ref.child(img.name).put(img).then(snapshot => {

            ref.child(img.name).getDownloadURL().then(url => {

                pushItemUpdated({ img: url, type: type, name: name, value: parseFloat(value), desc: allValues })
            })


        })
        props.setModelEdit(false)
    }


    return (
        <div className="modal">
            <div key={props.index} className="card">
                <img src={props.item.img} />

                <input id="file" type="file"></input>


                <div>
                    <label>Tipo de produto:</label>
                    <select id="type-product">
                        <option>
                            Hamburguer
                        </option>
                        <option>
                            Batata
                        </option>
                        <option>
                            Bebida
                        </option>
                        <option>
                            Combo
                        </option>
                        <option>
                            Doce
                        </option>
                    </select>
                </div>
                <input type="text" className="name" id="name" placeholder={props.item.name}></input >
                <input type="number" min="1" id="value" placeholder={handleValue(props.item.value)}></input>

                {props.item.desc.map((items, id) => {

                    return (
                        <>
                            <input className="description" type="text" key={id} placeholder={items}></input>

                        </>
                    )
                })}


                <div className="content-options">
                    <div onClick={updateItem} className="edit">CONFIRMAR</div >
                    <div className="delete" onClick={() => props.setModelEdit(false)}>CANCELAR</div>
                </div>

            </div>
        </div>
    )
}


