export const getLocalUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
}

export const setLocalUser = ( profile ) => {
    sessionStorage.setItem('user', JSON.stringify(profile));
}
