"use client"

import { makeRequest } from "@/app/common/request";

export const listBooks = async () => {

    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`api/books/`, {
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