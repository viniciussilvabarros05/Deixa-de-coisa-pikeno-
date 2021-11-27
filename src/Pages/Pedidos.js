import { CardRequest } from "../components/CardRequest";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/Pedidos.scss"
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Pedidos() {

    const pedidos = useSelector(state => state.pedidos)
    const dispatch = useDispatch()
    
    useEffect(() => {

        const name = JSON.parse(localStorage.getItem("nameClient"))
        const unsubscribe = db.collection("Pedidos").where("nameClient", "==", name).onSnapshot((snapshot) => {

            const requestDB = []
            snapshot.forEach(item => {
                requestDB.push(item.data())
            })

            dispatch({ type: "REQUEST", payload: requestDB })
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