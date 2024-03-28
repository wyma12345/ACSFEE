/***
 * Получить всех пользователей или только одного
 * @param setUsers
 * @param IdUsers юзер, которого хотим получить
 */
import {csrftoken} from "../global";

export function requestGetUsers(setUsers, setLoading, IdAdminRest = "")
{
    setLoading(true)
    if (IdAdminRest !== "") // Если нужен конкретный, то добавляем его
        IdAdminRest = IdAdminRest + '/'


    fetch('http://localhost:8000/api/get_users/' + IdAdminRest, {
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
            setUsers(data)})
}


export async function requestPostUsers(FIO, Telephone, Authority, Restaurants_id, Roles_id, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/post_users/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                FIO: FIO,
                Telephone: Telephone,
                Authority: Authority,
                Restaurants_id: Restaurants_id,
                Roles_id: Roles_id,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PostUsers: " + response.status)
        })
        .finally(() => setLoading(false))
}

export async function requestPutUsers(id, FIO, Telephone, Authority, Restaurants_id, Roles_id, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/put_users/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: id,
                FIO: FIO,
                Telephone: Telephone,
                Authority: Authority,
                Restaurants_id: Restaurants_id,
                Roles_id: Roles_id,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PutUsers: " + response.status)
        })
        .finally(() => setLoading(false))
}

export async function requestDeleteUsers(User_id, setLoading)
{
    setLoading(true)
    return  fetch('http://localhost:8000/api/delete_users/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: User_id,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("DeleteUsers: " + response.status)
        })
        .finally(() => setLoading(false))
}

export function requestGetOneUsers(setOneUser, setLoading, IdUsers)
{
    fetch('http://localhost:8000/api/get_one_user/' + IdUsers + "/", {
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
            setOneUser(data)})
}