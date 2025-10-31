import { makeRequest } from "@/app/common/request";

export const listBooksByAuthorEndpoint = async(authorId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`api/authors/${authorId}/books/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (response.ok) {
        return await response.json()
    }
    return []
}