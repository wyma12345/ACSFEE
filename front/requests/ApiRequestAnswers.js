import {csrftoken} from "../global";

export function requestGetAnswers(setAnswers, setAnswerStatic, setLoading)
{
    setLoading(true)
    fetch('http://localhost:8000/api/get_answers/', {
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
            setAnswerStatic(data.static)
            setAnswers(data.data)})
}