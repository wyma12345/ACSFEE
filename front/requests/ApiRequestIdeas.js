import {csrftoken} from "../global";

/**
 * Получить все идеи или конкретный
 * @param setIdeas
 * @param setLoading
 * @param IdAdminRest
 */
export function requestGetIdeas(setIdeas, setLoading, IdAdminRest = "")
{
    if (IdAdminRest !== "") // Если нужен конкретный, то добавляем его
        IdAdminRest = IdAdminRest + '/'
    setLoading(true)
    fetch('http://localhost:8000/api/get_ideas/' + IdAdminRest, {
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
                console.log("GetIdeas: " + response.status)
        })
        .then((data) => {
            setIdeas(data)})
        .finally(() => setLoading(false))
}

export async function requestPutIdeas(id,Topic, FeedBack, Comment, Read, Color, setLoading)
{
    setLoading(true)
    return fetch('http://localhost:8000/api/put_ideas/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                id: id,
                Topic: Topic,
                FeedBack: FeedBack,
                Comment: Comment,
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
                console.log("PutIdeas: " + response.status)
        })
        .finally( () => setLoading(false))

}