/***
 * Получить всех пользователей или только одного
 * @param setUsers
 * @param IdUsers юзер, которого хотим получить
 */
import {csrftoken} from "../global";

export function requestGetSurveys(setSurveys, setLoading, IdAdminRest = "")
{
    setLoading(true)
    if (IdAdminRest !== "") // Если нужен конкретный, то добавляем его
        IdAdminRest = IdAdminRest + '/'


    fetch('http://localhost:8000/api/get_surveys/' + IdAdminRest, {
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
            setSurveys(data)})
}


export async function requestPostSurveys(Topic, Text, Comment, IdRest, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/post_surveys/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                Topic: Topic,
                Text: Text,
                Comment: Comment,
                Restaurants_id: IdRest
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PostSurveys: " + response.status)
        })
        .finally(() => setLoading(false))
}

export async function requestPutSurveys(id, Topic, Text, Comment, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/put_surveys/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: id,
                Topic: Topic,
                Text: Text,
                Comment: Comment,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PutSurveys: " + response.status)
        })
        .finally(() => setLoading(false))
}

export async function requestDeleteSurveys(Surveys_id, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/delete_surveys/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: Surveys_id,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("DeleteSurveys: " + response.status)
        })
        .finally(() => setLoading(false))
}