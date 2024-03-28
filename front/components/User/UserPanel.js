import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";
import './UserPanel.css';
import {requestGetRoles} from "../../requests/ApiRequestRoles";
import UserCard from "./UserCard";
import {
    requestDeleteUsers,
    requestGetOneUsers,
    requestGetUsers,
    requestPostUsers,
    requestPutUsers
} from "../../requests/ApiRequestUsers";
import {getMessage} from "@testing-library/jest-dom/dist/utils";

/**
 * Понель добавления пользователя
 * @param setShowAddUserPanel
 * @param setChangeUserPanel
 * @param id
 * @param Restaurants
 * @param setLoading
 * @returns {JSX.Element}
 * @constructor
 */
function UserPanel({setShowAddUserPanel, setChangeUserPanel, id=undefined, Restaurants, setLoading, IdRest}) {

    const [OneUser, setOneUser] = useState("")
    const [FIO, setFIO] = useState("")
    const [Telephone, setTelephone] = useState("")
    const [Authority, setAuthority] = useState("")
    // const [Restaurants, setRestaurants] = useState(null)
    const [Roles, setRoles] = useState(null)
    const [Restaurants_id, setRestaurants_id] = useState("nulldefault")
    const [Roles_id, setRoles_id] = useState("nulldefault")
    const [Error, setError] = useState("")
    const [Checked, setChecked] = useState(false)


    useEffect(()=>{
        // requestGetRestaurant(setRestaurants) // Получить все рестораны
        requestGetRoles(setRoles) // получить все роли
        setAuthority("0") // изначально заполняем ненужное свойство
        if (id)
            GetIdUser(id)
    }, [])

    /**
     * Удаление записей, при изменении id (если была выбрана другая карточка)
     */
    useEffect(() => {
        setFIO("")
        setTelephone("")
        if (IdRest)
            setRestaurants_id(IdRest)
        else
            setRestaurants_id("nulldefault")
        setRoles_id("nulldefault")
        if (id)
            GetIdUser(id)

    }, [id])

    /**
     * Если в OneUser появились изменения, вносим их
     */
    useEffect(() => {
        if (OneUser){
            setFIO(OneUser.FIO)
            setTelephone(OneUser.Telephone)
            setRestaurants_id(OneUser.Restaurants_id)
            setRoles_id(OneUser.Roles_id)
            if (OneUser.Description === null)
                setChecked(false)
            else
                setChecked(true)
        }
    }, [OneUser])

    /**
     * Закрыть панель добавления
     * @constructor
     */
    const CloseAddUserPanel = () => {
        setShowAddUserPanel(false) // убрать панель
    }

    const ChangeAddUserPanel = () => {
        setChangeUserPanel(true) // сказать, что что-то изменили
        CloseAddUserPanel()
    }

    /**
     * Получить данные конкретного юзера если в панель введен id
     * @constructor
     */
    const GetIdUser= (_id) => {
        requestGetOneUsers(setOneUser, setLoading, _id)
    }

    /**
     * Сохранить добавленного пользователя
     * @constructor
     */
    const SaveNewUser = () => {
        if (FIO !== "" && Telephone !== "" && Restaurants_id !== "nulldefault" && Roles_id !== "nulldefault")
        {
            requestPostUsers(FIO, Telephone, Authority, Restaurants_id, Roles_id, setLoading).then(() => ChangeAddUserPanel())
            setError("")
        }
        else
            setError("Не все поля заполненны")
    }

    /**
     * Изменить выбранного пользователя
     * @constructor
     */
    const PutChangeUser = () => {
        if (FIO !== "" && Telephone !== "" && Restaurants_id !== "nulldefault" && Roles_id !== "nulldefault")
        {
            requestPutUsers(id, FIO, Telephone, Authority, Restaurants_id, Roles_id, setLoading).then(() => ChangeAddUserPanel())
            setError("")
        }
        else
            setError("Не все поля заполненны")
    }

    /**
     * Удаление выбранного пользователя
     * @constructor
     */
    const DeleteChangeUser = () => {
        requestDeleteUsers(id, setLoading).then(() => ChangeAddUserPanel())
    }

    return (
        <div className="AddUserPanel_main" >
            <p className="p_error" >{Error}</p>
            {id && <button className="DeleteUserPanel_button" onClick={DeleteChangeUser}>Удалить</button>}
            <br/>
            <input placeholder="ФИО" className="AddUserPanel_input" value={FIO} onChange={e => setFIO(e.target.value)}/>
            <input className="AddUserPanel_checkbox" type="checkbox" name="a" readOnly={true} checked={Checked}/> Индетифицирован в ТГ
            <input placeholder="Телефон"  maxLength={12} className="AddUserPanel_input" value={Telephone} onChange={e => setTelephone(e.target.value)} onKeyPress={(event) => {if (!/[0-9,+]/.test(event.key)) {event.preventDefault();}}}/>
            {/*<input placeholder="Полномочия" value="All" className="AddUserPanel_input"/>*/}

            {!IdRest && <select className="AddUserPanel_select" value={Restaurants_id} onChange={e => {
                setRestaurants_id(e.target.value)
            }}>
                <option disabled value={"nulldefault"}>Выбрать ресторан</option>
                {Restaurants && Restaurants.map((item, index) => {
                    return <option key={index} value={item.id}> {item.Name} </option>
                })
                }
            </select>}

            <select className="AddUserPanel_select" value={Roles_id} onChange={e => {setRoles_id(e.target.value)}}>
                <option  disabled value={"nulldefault"}>Выбрать роль</option>
                { Roles && Roles.map((item, index)=>
                {
                    return <option key={index} value={item.id}> {item.Name} </option>
                })
                }
            </select>

            <button className="AddUserPanel_button" onClick={CloseAddUserPanel}>Закрыть</button>
            {!id && <button className="AddUserPanel_button" onClick={SaveNewUser}>Сохранить</button>}
            {id && <button className="AddUserPanel_button" onClick={PutChangeUser}>Изменить</button>}
            <hr/>
        </div>
    );
}

export default UserPanel;