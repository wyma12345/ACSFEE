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
import {requestGetSurveys} from "../../requests/ApiRequestSurveys";
import SurveysCard from "../../components/Surveys/SurveysCard";
import SurveysPanel from "../../components/Surveys/SurveysPanel";



function Surveys({setLoading, IdRest}) {

    const [Surveys, setSurveys] = useState([]) //идеи
    const [Surveys_one, setSurveys_one] = useState([]) //выбранная идея
    const [ShowSurveysPanel, setShowSurveysPanel] = useState(false)
    const [ChangeSurveysPanel, setChangeSurveysPanel] = useState(true)
    const [ItsNew, setItsNew] = useState(false)

    useEffect(()=>{
        if( ChangeSurveysPanel === true)
        {
            requestGetSurveys(setSurveys, setLoading, IdRest) // Получить критику
            //requestGetUsers(setUsers, setLoading) // Получить критику
            setChangeSurveysPanel(false)
            setShowSurveysPanel(false)
        }
    }, [ChangeSurveysPanel])


    const readSurveys = (item) => (event) => {
        setItsNew(false)
        if (item.Comment == null)
            item.Comment = ""
        setSurveys_one(item)
        setShowSurveysPanel(true)
    }

    const addSurveysClick = () => {
        setItsNew(true)
        setShowSurveysPanel(true)
        setSurveys_one([])
    }

    return (
        <div className="User_main">
            <div className="UserAddButton" onClick={addSurveysClick}>
                <p className="UserAddButton_p">+</p>
            </div>
            {ShowSurveysPanel && <SurveysPanel setShowIdeasPanel={setShowSurveysPanel} setChangeIdeasPanel={setChangeSurveysPanel} id={Surveys_one.id} TextIn={Surveys_one.Text} TopicIn={Surveys_one.Topic} Data={Surveys_one.Data} IdRest={IdRest} CommentIn={Surveys_one.Comment} RestaurantNameIn={Surveys_one.Restaurants_id} ItsNew={ItsNew} setItsNew={setItsNew} setLoading={setLoading}> </SurveysPanel>}
            {Surveys.map((item, index)=>
            {
                return (<div key={index} onClick={readSurveys(item)}><SurveysCard Topic={item.Topic} Data={item.Data} key={index}/></div>)
            })
            }
        </div>
    );
}

export default Surveys;