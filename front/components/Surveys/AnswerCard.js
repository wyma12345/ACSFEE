import React, {useEffect, useState} from "react";
import "./AnswerCard.css"

function SurveysCard({Text, FIO, Data}) {

    const [Active, setActive] = useState(false)
    const [TextArray, setTextArray] = useState([])
    // добавиьт на разделение вопрос-ответ
    // добавить грамотнрый вывод ответов через map
    //


    useEffect(()=>{
        setTextArray(Text.split("~"))
    }, [])

    const ReversalActive = () => {
        setActive(!Active)
    }


    return (
        <div className="AnswerCard_main" onClick={ReversalActive}>
            {FIO}
            {Active && TextArray.map((item, index)=>{
                 return <div>
                     <p className="AnswerCard_p1">{item.split('|')[0]}</p>
                     <p className="AnswerCard_p2">{item.split('|')[1]}</p>
                 </div>
            })}
            {Active && Data}
        </div>
    );
}

export default SurveysCard;