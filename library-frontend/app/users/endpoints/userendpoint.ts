"use client"

import { makeRequest } from "@/app/common/request";

export const saveUserEndpoint = async (username:string, email: string, password: string) => {
    const response = await makeRequest(`register_user/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password, email: email })
    });

    if (response.ok) {
        console.log(JSON.stringify(response))
        return await response.json();
    }
}