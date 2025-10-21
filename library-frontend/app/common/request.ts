export const makeRequest = async (url: string, objRequestOptions: object) => {
    const response = await fetch(url, objRequestOptions)
    if (response.status == 401) {
        document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          });
        console.log('Cookie: ' + document.cookie)
    }
        
    return response
}