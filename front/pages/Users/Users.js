import './Users.css';
import '../../global.css'
import React, {useEffect, useState} from "react";
import UserCard from "../../components/User/UserCard";
import {requestGetUsers} from "../../requests/ApiRequestUsers";
import UserPanel from "../../components/User/UserPanel";
import {wait} from "@testing-library/user-event/dist/utils";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";



function Users({setLoading, IdRest}) {


    const [Users, setUsers] = useState([]) //Пользователи
    const [ShowAddUserPanel, setShowAddUserPanel] = useState(false) //Пользователи
    const [ChangeUserPanel, setChangeUserPanel] = useState(false) //Пользователи
    const [ChangeId, setChangeId] = useState(undefined) //Пользователи
    const [Restaurants, setRestaurants] = useState(null) //Рестораны
    const [Filter, setFilter] = useState("FIO") //Рестораны


    useEffect(()=>{
        requestGetUsers(setUsers, setLoading, IdRest) // Получить пользователей
        requestGetRestaurant(setRestaurants) // Получить рестораны
    }, [])

    useEffect(()=>{
        if (Users[0])
            requestGetUsers(setUsers, setLoading, IdRest) // Получить пользователей
        setChangeUserPanel(false)
    }, [ChangeUserPanel])

    const addUserClick = () => {
        setShowAddUserPanel(true)
        setChangeId(undefined)
    }

    const putUserClick = (_id) => (event) => {
        setShowAddUserPanel(true)
        setChangeId(_id)
    }

    return (
        <div className="User_main">
            {ShowAddUserPanel && <UserPanel IdRest={IdRest} setShowAddUserPanel={setShowAddUserPanel} setChangeUserPanel={setChangeUserPanel} id={ChangeId} Restaurants={Restaurants} setLoading={setLoading}/>}

            Сортировать по
            <select className="UserFilterSelect" value={Filter} onChange={e => {setFilter(e.target.value)}}>
                <option value={"FIO"}>Фамилии</option>
                <option value={"Restaurants_id"}>Ресторану</option>
                <option value={"Roles_id"}>Роли</option>
            </select>
            <hr/>


            <div className="UserAddButton" onClick={addUserClick}>
                <p className="UserAddButton_p">+</p>
            </div>

            {Users.sort((a, b) => a[Filter].toString().localeCompare(b[Filter].toString())).map((item, index)=>
                {
                    return (<div key={index} onClick={putUserClick(item.id)}><UserCard id={item.id} FIO={item.FIO} Telephone={item.Telephone} RestaurantName={Restaurants? Restaurants.find((i) => {return item.Restaurants_id === i.id}).Name: "Wait"} key={index}/></div>)
                })
            }
        </div>
    );
}

export default Users;