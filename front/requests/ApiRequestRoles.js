/**
 * Получить все роли или конкретную
 * @param setRoles
 * @param IdRoles id нужной роли (если нужно получить конкретную)
 */
export function requestGetRoles(setRoles, IdRoles = "")
{
    if (IdRoles !== "") // Если нужен конкретный, то добавляем его
        IdRoles = IdRoles + '/'

    fetch('http://localhost:8000/api/get_roles/' + IdRoles, {
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
                throw Error(`Something went wrong: code ${response.status}`)
        })
        .then((data) => {
            setRoles(data)})

}