import { makeRequest } from "@/app/common/request";

const URL = `api/authors/`

export const saveAuthorEndpoint = async (authorName: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: authorName
        })
    }
    const response = await makeRequest(URL, requestOptions)
    
    if (response.ok) {
        return await response.json()
    }
}


export const listAuthorsEndpoint = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (response.ok)
        return await response.json()
    return []
}