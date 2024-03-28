import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";
import '../User/UserPanel.css';
import {requestGetRoles} from "../../requests/ApiRequestRoles";
import UserCard from "../User/UserCard";
import {requestDeleteUsers, requestGetUsers, requestPostUsers, requestPutUsers} from "../../requests/ApiRequestUsers";
import {getMessage} from "@testing-library/jest-dom/dist/utils";
import {requestPutCriticism} from "../../requests/ApiRequestCriticism";
import {requestPutIdeas} from "../../requests/ApiRequestIdeas";

/**
 * Понель добавления идеи
 * @param setShowAddUserPanel
 * @param id
 * @param Text
 * @param FeedBackIn
 * @param CommentIn
 * @param Read
 * @param Color
 * @param Data
 * @param setLoading
 * @returns {JSX.Element}
 * @constructor
 */
function IdeasPanel({setShowIdeasPanel, setChangeIdeasPanel, id, TopicIn, Text, FeedBackIn, CommentIn, Read, Color, Data, User, setLoading}) {

    const [Error, setError] = useState("")
    const [FeedBack, setFeedBack] = useState("")
    const [Comment, setComment] = useState("")
    const [Topic, setTopic] = useState("")



    useEffect(()=>{
        setFeedBack(FeedBackIn)
        setComment(CommentIn)
        setTopic(TopicIn)
    }, [id])

    const ResponseChangeIdeas = () => {
        Read = true
        requestPutIdeas(id, Topic, FeedBack, Comment, Read, Color, setLoading).then(() => setChangeIdeasPanel(true))
        setShowIdeasPanel(false)
    }

    const CloseIdeasPanel = () => {
        setShowIdeasPanel(false)
    }

    return (
        <div className="AddUserPanel_main" >
            <p className="p_error" >{Error}</p>
            <br/>
            <br/>

            ФИО
            <output placeholder="Текст"  className="AddUserPanel_inputText" >{User.FIO}</output>
            <br/>
            <br/>

            Тема
            <input placeholder="Тема" className="AddUserPanel_input" value={Topic} onChange={e => setTopic(e.target.value)}/>
            <br/>
            <br/>

            Содержание
            <output placeholder="Содержание"  className="AddUserPanel_inputText" >{Text}</output>
            <br/>
            <br/>

            Ответ
            <input placeholder="Ответ пользователю" className="AddUserPanel_input" value={FeedBack} onChange={e => setFeedBack(e.target.value)}/>
            <br/>
            <br/>

            Свой комментарий
            <input placeholder="Свой комментарий" className="AddUserPanel_input" value={Comment} onChange={e => setComment(e.target.value)}/>

            <select className="AddUserPanel_select" value={Color} onChange={e => {Color = e.target.value}}>
                <option  disabled value={0}>Не решено</option>
                <option key={1} value={1}>Решено</option>
                <option key={2} value={2}>Не требует решения</option>
            </select>

            <button className="AddUserPanel_button" onClick={CloseIdeasPanel} >Закрыть</button>
            <button className="AddUserPanel_button" onClick={ResponseChangeIdeas} >Ответить</button>
            <br/>
            <br/>
            <hr/>
        </div>
    );
}

export default IdeasPanel;