import axios from "axios";

export function ignore(organization){
    axios.put(`/ignore/${organization.id}/`, {},
    {
        headers: {
            'Authorization': 'Bearer Token 07268cfdc9eb7bbec423ca5f2ef60b30fe45825c',
        }
    })
}

export function match(organization){
    axios.put(`/match/${organization.id}/`, {},
    {
        headers: {
            'Authorization': 'Bearer Token 07268cfdc9eb7bbec423ca5f2ef60b30fe45825c',
        }
    })
}

export function findMatches(){
    const data = axios.get(`/findmatch/`, {
        headers: {
            'Authorization': 'Bearer Token 2bf4a5e0b8449c09da5eedc5f5fa455c43a09fa3',
        }
    }).then(res => res.data)
    return data;
}