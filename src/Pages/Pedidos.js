import { CardRequest } from "../components/CardRequest";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/Pedidos.scss"
import { db } from "../services/firebase";
import { useEffect, useState } from "react";

export function Pedidos() {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection("Pedidos").onSnapshot((snapshot) => {

            const requestDB = []
            snapshot.forEach(item => {
                requestDB.push(item.data())
            })

            setPedidos(requestDB)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <>
            <Header></Header>
            <div className="content-pedidos">

                {pedidos.map((item, index) => {
                    return (<CardRequest item={item} key={index}></CardRequest>)
                })}

            </div>
        </>
    )


}