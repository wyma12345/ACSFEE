import './CriticismCard.css';
import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";


function CriticismCard({Topic, Read, Color, Data}) {

    useEffect(()=>{
    }, [])


    return (
        <div className="CriticismCard_main" >
            {!Read && <div className="CriticismCard_notify"> </div>}
            <p className="CriticismCard_p1">{Data}</p>
            <p className="CriticismCard_p2">{Topic}</p>
            {Color===0 && <div className="CriticismCard_Colordiv0"> </div>}
            {Color===1 && <div className="CriticismCard_Colordiv1"> </div>}
            {Color===2 && <div className="CriticismCard_Colordiv2"> </div>}
            <p className="CriticismCard_pСр">Узнать больше</p>
        </div>
    );
}

export default CriticismCard;