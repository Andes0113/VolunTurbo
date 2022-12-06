import axios from "axios";

export function ignore(organization){
    let token = sessionStorage.getItem('Bearer Token');
    axios.put(`/ignore/${organization.id}/`, {},
    {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    })
}

export function match(organization){
    let token = sessionStorage.getItem('Bearer Token');
    axios.put(`/match/${organization.id}/`, {},
    {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    })
}

export function findMatches(){
    let token = sessionStorage.getItem('Bearer Token');
    const data = axios.get(`/findmatch/`, {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    }).then(res => res.data)
    return data;
}