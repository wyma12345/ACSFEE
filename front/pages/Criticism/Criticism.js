import '../Users/Users.css';
import '../../global.css'
import React, {useEffect, useState} from "react";
import UserCard from "../../components/User/UserCard";
import {requestGetUsers} from "../../requests/ApiRequestUsers";
import UserPanel from "../../components/User/UserPanel";
import {requestGetCriticism} from "../../requests/ApiRequestCriticism";
import CriticismCard from "../../components/Criticism/CriticismCard";
import CriticiamReadPanel from "../../components/Criticism/CriticismPanel";



function Criticism({setLoading, IdRest}) {

    const [Criticism, setCriticism] = useState([]) //Пользователи
    const [Criticism_one, setCriticism_one] = useState([]) //Пользователи
    const [ShowAddUserPanel, setShowAddUserPanel] = useState(false) //Пользователи
    const [ChangeUserPanel, setChangeUserPanel] = useState(true) //Пользователи

    useEffect(()=>{
        if( ChangeUserPanel === true)
        {
            requestGetCriticism(setCriticism, setLoading, IdRest) // Получить критику
            setChangeUserPanel(false)
        }
    }, [ChangeUserPanel])


    const readCriticism = (item) => (event) => {
        setCriticism_one(item)
        setShowAddUserPanel(true)
    }


    return (
        <div className="User_main">
            {ShowAddUserPanel && <CriticiamReadPanel setShowAddUserPanel={setShowAddUserPanel} setChangeUserPanel={setChangeUserPanel} id={Criticism_one.id} Text={Criticism_one.Text} Color={Criticism_one.Color} TopicIn={Criticism_one.Topic} Read={Criticism_one.Read} Data={Criticism_one.Data}  CommentIn={Criticism_one.Comment} FeedBackIn={Criticism_one.FeedBack} setLoading={setLoading}> </CriticiamReadPanel>}
            {Criticism.map((item, index)=>
            {
                return (<div key={index} onClick={readCriticism(item)}><CriticismCard Text={item.Text} Color={item.Color} Topic={item.Topic} Read={item.Read} Data={item.Data} Comment={item.Comment} key={index}/></div>)
            })
            }
        </div>
    );
}

export default Criticism;