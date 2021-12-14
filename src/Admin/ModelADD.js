import "./styles/ModalEdit.scss"
import { db } from "../services/firebase"
import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import bebida from "../assets/images/Bebida.svg"
import Doce from "../assets/images/Doce.svg"
import { storage } from "../services/firebase"


export function ModelADD(props) {

    function addItem() {

        let type = document.getElementById("type-product").value
        const produtos = document.getElementById("type-product").value
        const name = document.getElementById("name").value
        const img = document.getElementById("file").files[0]
        const value = document.getElementById("value").value
        const desc = document.getElementById("description").value
        const ref = storage.ref("/Images")


        if (!img) {
    
            return alert("Não foi inserido uma imagem para o produto")
        }
        if (!name) {
            return alert("Não foi inserido um nome para o produto")
        }

        if (type == 'hamburgueres') {
            type = Hamburguer
        }
        if (type == 'combos') {
            type = Combo
        }
        if (type == 'batatas') {
            type = Batata
        }
        if (type == 'doces') {
            type = Doce
        }
        if (type == 'bebidas') {
            type = bebida
        }



        ref.child(img.name).put(img).then(snapshot => {
            ref.child(img.name).getDownloadURL().then(url => {


                db.collection(produtos).where("name", "==", name).get().then(doc => {
                    if (doc.length > 0) {
                        return alert(`Já existe um produto com o nome ${name}`)
                    }

                    db.collection(produtos).doc(name).set({
                        img: url,
                        name,
                        type,
                        desc: [desc],
                        value: parseFloat(value),
                        quant: 1
                    })
                })



            })

        })


        props.setModelADD(false)
    }




    return (
        <div>
            <div className="modal">
                <div className="card">
                    <img alt='' />

                    <input id="file" type="file"></input>


                    <div>
                        <label>Tipo de produto:</label>
                        <select id="type-product">
                            <option>
                                hamburgueres
                            </option>
                            <option>
                                batatas
                            </option>
                            <option>
                                bebidas
                            </option>
                            <option>
                                combos
                            </option>
                            <option>
                                doces
                            </option>
                            <option>
                                hamburgueres
                            </option>
                        </select>
                    </div>
                    <input type="text" className="name" id="name" placeholder="nome" ></input >
                    <input type="number" min="1" id="value" placeholder="valor" ></input>
                    <input id="description" type="text" placeholder="descrição"></input>
                    <div className="content-options">
                        <div className="edit" onClick={addItem}>CONFIRMAR</div >
                        <div className="delete" onClick={() => props.setModelADD(false)}>CANCELAR</div>
                    </div>

                </div>
            </div>

        </div>
    )
}