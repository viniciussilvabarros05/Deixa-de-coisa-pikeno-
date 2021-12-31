import { CardRequest } from "../components/CardRequest";
import { Header } from "../components/Header";
import "../styles/Pedidos.scss"
import { db } from "../services/firebase";
import { useEffect } from "react";
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

               
                {pedidos.length ==0 ? <div  className="message-not-requests" ><h1>Ops.. Você não possui pedidos</h1></div>:pedidos.map((item, index) => {
                    return (<CardRequest item={item} key={index}></CardRequest>)
                })}

            </div>
        </>
    )


}