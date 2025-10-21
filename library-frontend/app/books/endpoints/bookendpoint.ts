"use client"

import { makeRequest } from "@/app/common/request";

const SERVER_NAME = process.env.NEXT_PUBLIC_BACKEND_HOST
const PORT = process.env.NEXT_PUBLIC_BACKEND_PORT

export const listBooks = async () => {

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`http://${SERVER_NAME}:${PORT}/api/books/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      return await response.json();
    }
  
    return [];
};