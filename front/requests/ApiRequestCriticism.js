import {csrftoken} from "../global";

/**
 * Получить всю критику или конкретный
 * @param setCriticism
 * @param setLoading
 * @param IdAdminRest
 */
export function requestGetCriticism(setCriticism, setLoading, IdAdminRest = "")
{
    if (IdAdminRest !== "") // Если нужен конкретный, то добавляем его
        IdAdminRest = IdAdminRest + '/'
    setLoading(true)
    fetch('http://localhost:8000/api/get_criticism/' + IdAdminRest, {
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
                console.log("GetCriticism: " + response.status)
        })
        .then((data) => {
            setCriticism(data)})
        .finally(() => setLoading(false))
}

export async function requestPutCriticism(id, Topic, Comment, FeedBack, Read, Color, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/put_criticism/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: id,
                Comment: Comment,
                FeedBack: FeedBack,
                Topic: Topic,
                Read: Read,
                Color: Color,
            }),
            credentials: 'include'
        }
    )
        .then(response => {
            if (response.ok)
                return response.json()
            else
                console.log("PutCriticism: " + response.status)
        })
        .finally( () => setLoading(false))

}