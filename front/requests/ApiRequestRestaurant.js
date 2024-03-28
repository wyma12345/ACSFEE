/**
 * Получить все рестораны или конкретный
 * @param setRestaurant
 * @param IdRestaurant id нужного ресторана (если нужно получить конкретный)
 */
export function requestGetRestaurant(setRestaurant, IdRestaurant = "")
{
    if (IdRestaurant !== "") // Если нужен конкретный, то добавляем его
        IdRestaurant = IdRestaurant + '/'

    fetch('http://localhost:8000/api/get_restaurant/' + IdRestaurant, {
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
                console.log(response.status)
        })
        .then((data) => {
            setRestaurant(data)})
}