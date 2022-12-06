import axios from "axios";

export function getMatches(){
    const data = axios.get(`/matches/`, 
    {
        headers: {
            'Authorization': 'Bearer Token 07268cfdc9eb7bbec423ca5f2ef60b30fe45825c',
        }
    }).then(res => res.data);
    return data;
}