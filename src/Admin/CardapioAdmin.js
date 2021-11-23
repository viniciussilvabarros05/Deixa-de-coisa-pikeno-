
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { parsedMenuBar } from "../actions/actionList";
import { Link } from "react-router-dom"

import Hamburguer from "../assets/images/Hamburguer.svg"
import Batata from "../assets/images/Batata.svg"
import Combo from "../assets/images/Combo.svg"
import Garrafa from "../assets/images/Bebida.svg"
import Bolo from "../assets/images/Doce.svg"
import Home from "../assets/images/Home.svg"

import "./styles/CardapioAdmin.scss"
import { ModelEdit } from "./ModelEdit";
import { ModelADD } from "./ModelADD";
export function Cardapio() {

    const Cardapio = useSelector(state => state.cardapio)
    const type_produtos = useSelector(state => { return (state.parsedMenuBar) })
    const dispatch = useDispatch()
    const [modelEdit, setModelEdit] = useState(false)
    const [modelADD, setModelADD] = useState(false)

    const [itemEdit, setItemEdit] = useState({})
    const [idRef, setId] = useState("empty")



    useEffect(async () => {


        const unsubscribe = await db.collection(type_produtos).onSnapshot((doc) => {
            const arrayItens = []
            doc.forEach(item => {
                arrayItens.push(item.data())
            })

            dispatch({ type: "DATABASE", payload: arrayItens })

        })

        return () => {
            unsubscribe()
        }

    }, [type_produtos])

    useEffect(() => {

        db.collection(type_produtos).doc(idRef).delete()

    }, [idRef])



    function handleValue(value) {
        return value.toLocaleString("pt-br", { style: "currency", currency: "brl" })
    }


    function parseItemsMenu(i) {

        if (type_produtos === i) {
            return
        }
        dispatch(parsedMenuBar(i))

    }

    async function parseItemCardapio(item) {
        await setItemEdit(item)
        setModelEdit(true)
    }

    function deleteItem(produto) {

        if (window.confirm("Tem certeza que deseja excluir este item?")) {
            db.collection(type_produtos).where("name", "==", produto.name).get().then(snapshot => {
                snapshot.forEach(doc => {
                    let document = doc.id
                    setId(document)

                })
            })
        }

    }

    function registerOferta() {
        const name = document.getElementById("name-product").value
        const value = document.getElementById("new-value").value
        const type = document.getElementById("type-oferta").value

        db.collection(type).where("name", "==", name).get().then(snapshot => {
            console.log(snapshot)
            snapshot.forEach(doc => {
                const{desc,name,img,type,} = doc.data()
                db.collection("ofertas").doc("oferta").set({
                    desc,
                    name,
                    value: parseInt(value),
                    img,
                    type
                })
            })
        })


    }

    return (
        <div className="editCardapio">


            <div className="bar-cardapio">
                <img onClick={() => parseItemsMenu("hamburgueres")} src={Hamburguer} />
                <div className="point"></div>
                <img onClick={() => parseItemsMenu("combos")} src={Combo} />
                <div className="point"></div>
                <img onClick={() => parseItemsMenu("doces")} src={Bolo} />
                <div className="point"></div>
                <img onClick={() => parseItemsMenu("batatas")} src={Batata} />
                <div className="point"></div>
                <img onClick={() => parseItemsMenu("bebidas")} src={Garrafa} />
            </div>


            <div className="menu-bar"></div>
            <section className="list">

                <div className="bar">
                    <button onClick={() => setModelADD(true)}>+</button>
                    <Link to="/adminpikeno"><img src={Home}></img></Link>
                </div>

                {Cardapio.map((item, index) => {
                    if (item.falseItem) {
                        return
                    }
                    return (
                        <>
                            <div key={index} className="card">
                                <img src={item.img}></img>
                                <img src={item.type}></img>
                                <div className="name">{item.name}____<span>{handleValue(item.value)}</span> </div>

                                <ul>
                                    {item.desc.map((items, id) => {

                                        return (<li key={id}>{items}</li>)
                                    })}
                                </ul>

                                <div className="content-options">
                                    <div onClick={() => parseItemCardapio(item)} className="edit">EDITAR</div >
                                    <div className="delete" onClick={() => deleteItem(item)}>Excluir</div>
                                </div>
                            </div>
                        </>
                    )
                })
                }

            </section>

            <div className="content-ofertas">
               
                <div className="ofertas">
                <h1>OFERTAS</h1>
                    <select id="type-oferta">
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

                    <input id="name-product" placeholder="nome do produto" type="text">
                    </input>
                    <input id="new-value" placeholder="valor promocional" type="number">
                    </input>
                    <button onClick={registerOferta}>Enviar</button>
                </div>
            </div>



            {modelEdit ? <ModelEdit item={itemEdit} setModelEdit={setModelEdit} /> : ""}
            {modelADD ? <ModelADD setModelADD={setModelADD}></ModelADD> : ""}
        </div>)
}