import axios from "axios";
import { setLocalUser } from "./localuser";

export function ignore(organization){
    let token = sessionStorage.getItem('Bearer Token');
    axios.put(`/ignore/${organization.id}/`, {},
    {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    }).then(res => res.data)
    .then(data => setLocalUser(data))
}

export function match(organization){
    let token = sessionStorage.getItem('Bearer Token');
    axios.put(`/match/${organization.id}/`, {},
    {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    }).then((res) => res.data)
    .then(data => {console.log(data); setLocalUser(data)})
}

export function findMatches(){
    let token = sessionStorage.getItem('Bearer Token');
    const data = axios.get(`/findmatch/`, {
        headers: {
            'Authorization': `Bearer Token ${token}`,
        }
    }).then((res) => res.data)
    return data;
}