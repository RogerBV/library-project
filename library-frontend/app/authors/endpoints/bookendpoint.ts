import { makeRequest } from "@/app/common/request";

const SERVER_NAME = process.env.NEXT_PUBLIC_BACKEND_HOST
const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT

export const listBooksByAuthorEndpoint = async(authorId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`http://${SERVER_NAME}:${PORT}/api/authors/${authorId}/books/`, {
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