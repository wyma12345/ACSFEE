import React, {useEffect, useState} from "react";
import "./LoggedIn.css"
import {requestGetAch, requestGetAdmins, requestPostAdminsLoggIn} from "../../requests/ApiRequestAdmins";

function LoggedIn({setIdRest, setIsLoggedIn, setLoading}) {
    const [Telephone, setTelephone] = useState("9251111111")
    const [PrintKod, setPrintKod] = useState("")
    const [ReceivedKod, setReceivedKod] = useState("")
    const [SendKod, setSendKod] = useState(true)

    useEffect(()=>{
        requestGetAch(setIsLoggedIn, setLoading)
    }, [])

    const SendTelephone = () => {
        requestPostAdminsLoggIn(Telephone, setReceivedKod, setLoading).then(()=>setSendKod(true))
    }

    const CheckKod = () => {
        if (/*ReceivedKod.register_status.toString() === PrintKod*/Telephone !== "")
            requestGetAdmins(setIdRest, setLoading, Telephone).then(() => setIsLoggedIn(true))
    }

    const ResetTelephone = () => {
        setSendKod(false)
    }


    return (
        <div className="LoggedIn" >
            {!SendKod && <p className="LoggedIn_p">Введите ваш телефон </p>}
            {!SendKod && <input placeholder="телефон" className="LoggedIn_input" value={Telephone}
                    onChange={e => setTelephone(e.target.value)}/>}
            {!SendKod && <p>
                <button className="LoggedIn_button" onClick={SendTelephone}>Выслать проверочный код</button>
            </p>}

            {SendKod && <p>
                <input placeholder="Проверочный код" className="LoggedIn_input" value={PrintKod}
                                 onChange={e => setPrintKod(e.target.value)}/>
            </p>}

            {SendKod && <button className="LoggedIn_button" onClick={CheckKod}>Принять</button>}
            {SendKod && <button className="LoggedIn_button" onClick={ResetTelephone}>Изменить телефон</button>}
        </div>
    );
}

export default LoggedIn;