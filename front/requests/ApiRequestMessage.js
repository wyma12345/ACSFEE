import Message from "../pages/Message/Message";
import {csrftoken} from "../global";

export function requestGetMessage(setText, setLoading, IdAdminRest = "")
{
    if (IdAdminRest !== "") // Если нужен конкретный, то добавляем его
        IdAdminRest = IdAdminRest + '/'
    setLoading(true)
    fetch('http://localhost:8000/api/get_message/' + IdAdminRest, {
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
            setText(data)})
}

export async function requestPostMessage(Text, setLoading, IdAdminRest="")
{
    console.log(IdAdminRest)
    setLoading(true)
    return fetch('http://localhost:8000/api/post_message/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                Text: Text,
                Restaurants_id: IdAdminRest
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PostMessage: " + response.status)
        })
        .finally(() => setLoading(false))
}