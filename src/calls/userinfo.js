import axios from "axios";
import { setLocalUser } from "./localuser";

export function getMatches(){
    let token = sessionStorage.getItem('Bearer Token');
    const data = axios.get(`/matches/`, 
    {
        headers: {
            Authorization: `Bearer Token ${token}`
        }
    }).then(res => res.data);
    return data;
}

export function getUser(){
    let token = sessionStorage.getItem('Bearer Token');
    const data = axios.get(`/api/getuser/`, 
    {
        headers: {
            Authorization: `Bearer Token ${token}`
        }
    }).then((res) => {console.log(res); setLocalUser(res.data)})
    return data;
}

export function clearSeen(){
    let token = sessionStorage.getItem('Bearer Token');
    const data = axios.put(`/api/clearseen/`, {},
    {
        headers: {
            Authorization: `Bearer Token ${token}`
        }
    }).then((res) => {console.log(res); setLocalUser(res)})
    return data;
}