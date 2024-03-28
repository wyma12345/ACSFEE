import './UserCard.css';
import React, {useEffect, useState} from "react";
import {requestGetRestaurant} from "../../requests/ApiRequestRestaurant";


function UsersCard({id, FIO, Telephone, RestaurantName}) {


    // const [Restaurant, setRestaurant] = useState(null) //Рестораны
    // useEffect(()=>{
    //      requestGetRestaurant(setRestaurant, Restaurants_id) // Получить рестораны
    // }, [Restaurants_id])


    return (
        <div className="UserCard_main" >
            <p className="UserCard_p1">{FIO}</p>
            {/*<p className="UserCard_p2">{Restaurant != null ? Restaurant[0].Name : ""}</p>*/}
            <p className="UserCard_p2">{RestaurantName}</p>
            <p className="UserCard_p2">{Telephone}</p>
        </div>
    );
}

export default UsersCard;