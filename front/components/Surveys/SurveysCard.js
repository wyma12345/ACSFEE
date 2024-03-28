import "./SurveysCard.css"
import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";
import Surveys from "../../pages/Surveys/Surveys";


function SurveysCard({Topic, Data}) {

    useEffect(()=>{
    }, [])


    return (
        <div className="SurveysCard_main" >
            <p className="SurveysCard_p1">{Topic}</p>
            <p className="SurveysCard_p2">{Data}</p>
        </div>
    );
}

export default SurveysCard;