import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import "./menu.css"
import {useNavigate} from "react-router";
import Users from "./Users/Users";

function Menu({isLoggedIn, setIsLoggedIn})
{
    let navigate = useNavigate();

    // const lgo = () => {logout(isLoggedIn, setIsLoggedIn, navigate);
    //     console.log('Выходим' + isLoggedIn)}
    return (
        <div className="divMenu">
            <ul className="ulMenu">
                <li className="liMenu"> <Link className="linkMenu" to="/ideas">Идеи</Link></li>
                <li className="liMenu"> <Link className="linkMenu" to="/criticism">Критика</Link></li>
                <li className="liMenu"> <Link className="linkMenu" to="/surveys">Опросы</Link></li>
                <li className="liMenu"> <Link className="linkMenu" to="/users">Пользователи</Link></li>
                <li className="liMenu"> <Link className="linkMenu" to="/message">Сообщения</Link></li>
                {/*{!isLoggedIn && <li className="liMenuLogin"> <Link className="linkMenu" to="/login">Войти</Link></li>}*/}
                {/*{isLoggedIn &&*/}
                {/*    <li className="liMenuLogin">*/}
                {/*        <Link className="linkMenu" to="/account">Аккаунт</Link>*/}
                {/*        <i className="fa fa-caret-down"/>*/}

                {/*        <ul className="submenu">*/}
                {/*            <li className="linkMenu" onClick={lgo}>Выйти</li>*/}
                {/*        </ul>*/}

                {/*    </li>}*/}
            </ul>
        </div>
    );
}

export default Menu