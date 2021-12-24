import { Header } from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { CardRequest } from "../components/CardRequest";
import "./styles/Cozinha.scss"
import { db } from "../services/firebase";
import { useEffect } from "react";
export function Cozinha() {
    const dispatch = useDispatch()
    const pedidos = useSelector(state => state.pedidos)
    const admin = useSelector(state=>state.admin)

    console.log(admin)

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

            dispatch({ type: "REQUEST", payload: requestDB })
        })

        return () => {
            unsubscribe()
        }
    }, [])
   

    return (
        <div className="content-cozinha">
            <Header></Header>
            <div className="content-pedidos">

                {pedidos.map((item, index) => {
                    return (<CardRequest item={item} key ={index} order={index}></CardRequest>)
                })}

            </div>
            <button onClick={logout} className="logout">LOGOUT</button>
        </div>
    )
}