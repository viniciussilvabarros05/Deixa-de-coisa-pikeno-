import { Header } from "../components/Header"
import { useDispatch } from "react-redux"
import { CardRequest } from "../components/CardRequest";
import { Footer } from "../components/Footer";
import "../styles/Pedidos.scss"
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
export function Cozinha() {
    const dispatch = useDispatch()
    const [pedidos, setPedidos] = useState([])

    
    function logout() {
        localStorage.setItem("adminLog", JSON.stringify(''))
        dispatch({ type: "LOGOUT" })
       
    }

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
        <div className="content-admin">
            <Header></Header>
            <div className="content-pedidos">

                {pedidos.map((item, index) => {
                    return (<CardRequest item={item} key={index}></CardRequest>)
                })}

            </div>
            <button onClick={logout} className ="logout">LOGOUT</button>
        </div>
    )
}