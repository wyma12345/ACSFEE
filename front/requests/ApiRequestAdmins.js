/***
 * Получить всех пользователей или только одного
 * @param setUsers
 * @param IdUsers юзер, которого хотим получить
 */
import {csrftoken} from "../global";

export async function requestGetAdmins(setIdRest, setLoading, TelAdmins = "")
{
    setLoading(true)
    if (TelAdmins !== "") // Если нужен конкретный, то добавляем его
        TelAdmins = TelAdmins + '/'


    return fetch('http://localhost:8000/api/get_admins/' + TelAdmins, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: 'include'
        }
    )
        .then(response  => {
            if (response.ok)
                return response.json()
            else
                console.log(response.status, response.links())
        })
        .then((data) => {
            setLoading(false)
            if (data[0].Authority === 'all')
                setIdRest('')
            else
                setIdRest(data[0].Restaurants_id)})
}

export function requestGetAch(setIsLoggedIn, setLoading)
{
    setLoading(true)

    fetch('http://localhost:8000/api/ach/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            credentials: 'include'
        }
    )
        .then(response  => {
            if (response.ok)
                return response.json()
            else
                console.log(response.status, response.links())
        })
        .then((data) => {
            setLoading(false)
            setIsLoggedIn(data.isAuthenticat === "true")})
}


export async function requestPostAdminsLoggIn(Telephone, setReceivedKod, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/admins_register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                Telephone: Telephone,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PostAdmins: " + response.status)
        })
        .then((data) => {
            setLoading(false)
            setReceivedKod(data)})
}