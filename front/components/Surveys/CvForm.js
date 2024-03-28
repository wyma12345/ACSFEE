import React, {useEffect, useState} from "react";
import "./SurveysPanel.css"
import {wait} from "@testing-library/user-event/dist/utils";

function CvForm({TextI, setText, Index, Text, Save, setSave}) {
    const [ThisQue, setThisQue] = useState("")
    const [ThisAnsw, setThisAnsw] = useState([])
    const [Error, setError] = useState("")

    useEffect(()=>{
        setThisQue(TextI.split('|')[0])
        setThisAnsw(TextI.split('|').slice(1))
    }, [TextI])

    useEffect(()=>{
        if (ThisQue === "")
            setError("Вопрос не заполнен")
        else
            setError("")
    }, [ThisQue])

    useEffect(()=>{
        if (Save === Index)
            setSave(Index + 1)
    }, [Text])

    useEffect(()=>{
        if (Save === Index)
        {
            let copy = Object.assign([], Text);
            copy[Index] = ThisQue + '|' + ThisAnsw.join('|');
            setText(copy)
        }
    }, [Save])

    return (
        <div className="CvForm_main" >
            <p className="p_error" >{Error}</p>
            Вопрос {Index + 1}
            <input placeholder="Вопрос" className="SurveysPanel_input" value={ThisQue} onChange={e => {setThisQue(e.target.value)}}/>
            <br/>
            Варианты ответа {Index + 1}
            <input placeholder="Свободный ответ" className="SurveysPanel_input" value={ThisAnsw ? ThisAnsw.join('|'): "Wait"} onChange={e => setThisAnsw(e.target.value.split('|'))}/>
            <br/>
            <br/>
        </div>
    );
}
export default CvForm;