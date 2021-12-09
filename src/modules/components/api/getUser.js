import Cookies from 'js-cookie'

async function GetUser() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/protected`, requestOptions)
    return response.json()
}

export default GetUser