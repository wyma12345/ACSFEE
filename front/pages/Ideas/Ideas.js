import '../Users/Users.css';
import '../../global.css'
import React, {useEffect, useState} from "react";
import {requestGetUsers} from "../../requests/ApiRequestUsers";
import {requestGetCriticism} from "../../requests/ApiRequestCriticism";
import CriticismCard from "../../components/Criticism/CriticismCard";
import CriticiamReadPanel from "../../components/Criticism/CriticismPanel";
import {requestGetIdeas} from "../../requests/ApiRequestIdeas";
import IdeasCard from "../../components/Ideas/IdeasCard";
import IdeasPanel from "../../components/Ideas/IdeasPanel";



function Ideas({setLoading, IdRest}) {

    const [Ideas, setIdeas] = useState([]) //идеи
    const [Ideas_one, setIdeas_one] = useState([]) //выбранная идея
    const [Users, setUsers] = useState(undefined) //выбранная идея
    const [ShowIdeasPanel, setShowIdeasPanel] = useState(false)
    const [ChangeIdeasPanel, setChangeIdeasPanel] = useState(true)

    useEffect(()=>{
        if( ChangeIdeasPanel === true)
        {
            requestGetIdeas(setIdeas, setLoading, IdRest) // Получить критику
            requestGetUsers(setUsers, setLoading) // Получить критику
            setChangeIdeasPanel(false)
        }
    }, [ChangeIdeasPanel])


    const readCriticism = (item) => (event) => {
        setIdeas_one(item)
        setShowIdeasPanel(true)
    }


    return (
        <div className="User_main">
            {ShowIdeasPanel && <IdeasPanel setShowIdeasPanel={setShowIdeasPanel} setChangeIdeasPanel={setChangeIdeasPanel} id={Ideas_one.id} Text={Ideas_one.Text} Color={Ideas_one.Color} TopicIn={Ideas_one.Topic} Read={Ideas_one.Read} Data={Ideas_one.Data} FeedBackIn={Ideas_one.FeedBack} User={Users? Users.find((i) => {return Ideas_one.User_id === i.id}) : {FIO: "WAIT"}} CommentIn={Ideas_one.Comment} setLoading={setLoading}> </IdeasPanel>}
            {Ideas.map((item, index)=>
            {
                return (<div key={index} onClick={readCriticism(item)}><IdeasCard Text={item.Text} Color={item.Color} Topic={item.Topic} Read={item.Read} Data={item.Data} FeedBack={item.FeedBack} Comment={item.Comment} UserName={Users? Users.find((i) => {return item.User_id === i.id}).FIO: "Wait"} key={index}/></div>)
            })
            }
        </div>
    );
}

export default Ideas;