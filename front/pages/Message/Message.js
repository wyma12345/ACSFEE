import React, {useEffect, useState} from "react";
import "./Message.css"
import {requestGetMessage, requestPostMessage} from "../../requests/ApiRequestMessage";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";

function Message({setLoading, IdRest}) {
    const [Messages, setMessages] = useState([])
    const [Text, setText] = useState("")
    const [Error, setError] = useState("")
    const [Change, setChange] = useState(true)
    const [Restaurants, setRestaurants] = useState([])
    const [Restaurants_id, setRestaurants_id] = useState("Все")

    useEffect(() => {
        if (IdRest === "")
            requestGetRestaurant(setRestaurants) // Получить рестораны
    }, [])

    useEffect(() => {
        //console.log(Restaurants_id)
    }, [Restaurants_id])


    useEffect(()=>{
        if( Change === true)
        {
            requestGetMessage(setMessages, setLoading, IdRest)
            setChange(false)
        }
    }, [Change])

    const SaveNewMessage = () => {
        if (Text !== "")
        {
            requestPostMessage(Text, setLoading, IdRest).then(() => {
                setText("")
                setChange(true)
            })
            setError("")
        }
        else
            setError("Сообщение не введено")
    }

    return (
    <div className="Message_main" >
        <p className="p_error" >{Error}</p>

        Фильтр
        <select className="AddUserPanel_select" value={Restaurants_id} onChange={e => {setRestaurants_id(e.target.value)}}>
            <option value={"На всю сеть"}>На всю сеть</option>
            <option value={"Все"}>Все</option>
            {IdRest !== "" && <option value={IdRest.toString()}>Ваш ресторан</option>}

            {IdRest === "" && Restaurants && Restaurants.map((item, index) => {
                return <option key={index} value={item.Name}> {item.Name} </option>
            })
            }
        </select>

        <br/>
        Введите новое сообщение
        <input placeholder="Сообщение" className="Message_input" value={Text} onChange={e => setText(e.target.value)}/>
        <button className="Message_button" onClick={SaveNewMessage} >Отправить</button>
        <br/>
        <br/>
        <table className="Message_table">
            <thead>
            <tr><th className="Message_th1">Сообщение</th><th className="Message_th2">Дата</th><th className="Message_th2">Ресторан</th></tr>
            </thead>
            <tbody>
            {Messages.map((item, index) => {
                if (Restaurants_id === "Все" || item.Restaurants_id === Restaurants_id || (IdRest !== "" && item.Restaurants_id !== "На всю сеть" && Restaurants_id !== "На всю сеть"))
                return <tr key={index}><td className="Message_td1">{item.Text}</td><td className="Message_td2">{item.Data}</td><td className="Message_td2">{item.Restaurants_id}</td></tr>
            })}
            </tbody>
        </table>
        </div>
    );
}

export default Message;