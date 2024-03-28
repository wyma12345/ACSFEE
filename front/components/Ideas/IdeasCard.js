import './IdeasCard.css';
import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";


function CriticismCard({Topic, Read, Color, Data, UserName}) {

    useEffect(()=>{
    }, [])


    return (
        <div className="IdeasCard_main" >
            {!Read && <div className="IdeasCard_notify"> </div>}
            <p className="IdeasCard_p1">{UserName}</p>
            <p className="IdeasCard_p2">{Data}</p>
            <p className="IdeasCard_p2">{Topic}</p>
            {Color===0 && <div className="IdeasCard_Colordiv0"> </div>}
            {Color===1 && <div className="IdeasCard_Colordiv1"> </div>}
            {Color===2 && <div className="IdeasCard_Colordiv2"> </div>}
        </div>
    );
}

export default CriticismCard;