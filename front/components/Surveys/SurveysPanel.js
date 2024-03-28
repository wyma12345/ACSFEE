import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";
import "./SurveysPanel.css"
import {requestGetRoles} from "../../requests/ApiRequestRoles";
import UserCard from "../User/UserCard";
import {requestDeleteUsers, requestGetUsers, requestPostUsers, requestPutUsers} from "../../requests/ApiRequestUsers";
import {getMessage} from "@testing-library/jest-dom/dist/utils";
import {requestPutCriticism} from "../../requests/ApiRequestCriticism";
import {requestPutIdeas} from "../../requests/ApiRequestIdeas";
import CvForm from "./CvForm";
import {requestDeleteSurveys, requestPostSurveys, requestPutSurveys} from "../../requests/ApiRequestSurveys";
import {wait} from "@testing-library/user-event/dist/utils";
import {requestGetAnswers} from "../../requests/ApiRequestAnswers";
import AnswerCard from "./AnswerCard";

/**
 * Понель добавления идеи
 * @param setShowAddUserPanel
 * @param id
 * @param Data
 * @param setLoading
 * @returns {JSX.Element}
 * @constructor
 */
function SurveysPanel({setShowIdeasPanel, setChangeIdeasPanel, id=undefined, TopicIn="", TextIn="", CommentIn="", IdRest='', RestaurantNameIn="", Data="", ItsNew, setItsNew, setLoading}) {

    const [Error, setError] = useState("")
    const [Topic, setTopic] = useState("")
    const [Text, setText] = useState([])
    const [Comment, setComment] = useState("1")
    const [Save, setSave] = useState(-1)
    const [ChangeUpButton, setChangeUpButton] = useState(true)
    const [Answer, setAnswer] = useState([])
    const [AnswerStatic, setAnswerStatic] = useState([])
    const [Users, setUsers] = useState([])


    useEffect(()=>{
        requestGetAnswers(setAnswer, setAnswerStatic, setLoading)
        requestGetUsers(setUsers, setLoading)
    }, [])


    useEffect(()=>{
        setText(TextIn.split('~'))
        setTopic(TopicIn)
        setComment(CommentIn)
    }, [id])

    useEffect(()=>{
        if (!ItsNew &&Save === Text.length) {
                requestPutSurveys(id, Topic, Text.join('~'), Comment ,setLoading).then(() => {
                setShowIdeasPanel(false)
                setChangeIdeasPanel(true)
                setSave(-1)
            })
        }
        else if(ItsNew && Save === Text.length){
            requestPostSurveys(Topic, Text.join('~'), Comment , IdRest, setLoading).then(() => {
                setShowIdeasPanel(false)
                setChangeIdeasPanel(true)
                setSave(-1)
            })
        }
    }, [Save])

    const ReversalUppButton = () => {
        setChangeUpButton(!ChangeUpButton)
    }

    const DeleteSurveys = () => {
        requestDeleteSurveys(id, setLoading).then(() => {
            setChangeIdeasPanel(true)
            setShowIdeasPanel(false)
        })
    }

    const ResponsePutOrPostSurveys = () => {
        if (Topic !== "")
        {
            setSave(0)
        }
        else
            setError("Тема не заполнена")
    }

    const CloseSurveysPanel = () => {
        setShowIdeasPanel(false)
    }

    const AddCv = () => {
        setText([...Text, ...[""]] )
    }

    return (
        <div className="SurveysPanel_main" >

            {ChangeUpButton && <div onClick={ReversalUppButton} className="appButtonA" >Изменение</div>}
            {ChangeUpButton && <div onClick={ReversalUppButton} className="appButton">Ответы</div>}
            {!ChangeUpButton && <div onClick={ReversalUppButton} className="appButton" >Изменение</div>}
            {!ChangeUpButton && <div onClick={ReversalUppButton} className="appButtonA">Ответы</div>}
            <div onClick={DeleteSurveys} className="appButtonDelete">Del</div>

            <br/>
            {ChangeUpButton ? ChangePage(): AnswersPage()}
        </div>
    );

    /**
     * Возвращает панель изменения опроса
     * @returns {JSX.Element}
     * @constructor
     */
    function ChangePage(){
        return (
            <div>
                <p className="p_error" >{Error}</p>

                Тема
                <br/>
                <input placeholder="Тема" className="SurveysPanel_input" value={Topic} onChange={e => setTopic(e.target.value)}/>
                <br/>

                Комментарий
                <br/>
                <input placeholder="Комментарий" className="SurveysPanel_input" value={Comment} onChange={e => setComment(e.target.value)}/>

                Рестаран: {RestaurantNameIn}

                <hr/>
                Ответы вводить через |
                {Text.map((item, index)=> {
                    return <CvForm TextI={item} setText={setText} Index={index} Save={Save} Text={Text} setSave={setSave} maxIndex={Text.length} key={index}/>
                })}

                {ItsNew && <button className="AddCv_button" onClick={AddCv}>+</button>}
                <hr/>
                <button className="AddUserPanel_button" onClick={CloseSurveysPanel}>Закрыть</button>
                {ItsNew &&<button className="AddUserPanel_button" onClick={ResponsePutOrPostSurveys}>Сохранить</button>}
            </div>
        );
    }

    /**
     * Возвращает панель просмотра ответов
     * @returns {JSX.Element}
     * @constructor
     */
    function AnswersPage(){
        return (
            <div className="Answer">
                <br/>
                {AnswerStatic.map((item, index)=> {
                    let text = ""
                    let i = 1

                    for (const [key, value] of Object.entries(item.Text))
                    {
                        text += key + "|"
                        value.map((item, index) =>
                        {
                            text += (index + 1).toString() + ") " + item + "\n"
                        })
                        text += '~'
                    }
                    return id === item.Surveys_id && <AnswerCard Text={text} Data={""} FIO={"Общая статистика"}/>
                })}
                <br/>
                {Answer.map((item, index)=> {
                    return id === item.Surveys_id && <AnswerCard Text={item.Text} Data={item.Data} FIO={Users? Users.find((i) => {return item.User_id === i.id}).FIO: "Wait"}/>
                })}
            </div>
        );
    }

}



export default SurveysPanel;