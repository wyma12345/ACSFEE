import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";
import '../User/UserPanel.css';
import {requestGetRoles} from "../../requests/ApiRequestRoles";
import UserCard from "../User/UserCard";
import {requestDeleteUsers, requestGetUsers, requestPostUsers, requestPutUsers} from "../../requests/ApiRequestUsers";
import {getMessage} from "@testing-library/jest-dom/dist/utils";
import {requestPutCriticism} from "../../requests/ApiRequestCriticism";

/**
 * Понель добавления критики
 * @param setShowAddUserPanel
 * @param setChangeUserPanel
 * @param id
 * @param Topic
 * @param Text
 * @param CommentIn
 * @param Read
 * @param Color
 * @param Data
 * @param setLoading
 * @returns {JSX.Element}
 * @constructor
 */
function CriticiamReadPanel({setShowAddUserPanel, setChangeUserPanel, id, TopicIn, Text, CommentIn, FeedBackIn, Read, Color, Data, setLoading}) {

    const [Error, setError] = useState("")
    const [Comment, setComment] = useState("")
    const [FeedBack, setFeedBack] = useState("")
    const [Topic, setTopic] = useState("")



    useEffect(()=>{
        setComment(CommentIn)
        setFeedBack(FeedBackIn)
        setTopic(TopicIn)
    }, [id])

    const ResponseChangeCriticism = () => {
        Read = true
        requestPutCriticism(id, Topic, Comment, FeedBack, Read, Color, setLoading).then(() => setChangeUserPanel(true))
        setShowAddUserPanel(false)
    }

    const CloseCritPanel = () => {
        setShowAddUserPanel(false)
    }

    return (
        <div className="AddUserPanel_main" >
            <p className="p_error" >{Error}</p>
            <br/>

            Тема
            <input placeholder="Тема" className="AddUserPanel_input" value={Topic} onChange={e => setTopic(e.target.value)}/>
            <br/>
            <br/>

            Содержание
            <output placeholder="Содержание"  className="AddUserPanel_inputText" >{Text}</output>
            <br/>
            <br/>
            Ответ пользователю
            <input placeholder="Ответ пользователю" className="AddUserPanel_input" value={FeedBack} onChange={e => setFeedBack(e.target.value)}/>

            <br/>
            Свой комментарий
            <input placeholder="Свой комментарий" className="AddUserPanel_input" value={Comment} onChange={e => setComment(e.target.value)}/>

            <select className="AddUserPanel_select" value={Color} onChange={e => {Color = e.target.value}}>
                <option  disabled value={0}>Не решено</option>
                <option key={1} value={1}> Решено </option>
                <option key={2} value={2}> Не требует решения </option>
            </select>

            <button className="AddUserPanel_button" onClick={CloseCritPanel} >Закрыть</button>
            <button className="AddUserPanel_button" onClick={ResponseChangeCriticism} >Ответить</button>
            <br/>
            <br/>
            <hr/>
        </div>
    );
}

export default CriticiamReadPanel;