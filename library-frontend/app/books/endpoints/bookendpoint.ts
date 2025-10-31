"use client"

import { IBook } from "@/app/authors/interfaces/book.interface";
import { makeRequest } from "@/app/common/request";
import { headers } from "next/headers";

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

export const getBookById = async (bookId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`api/books/${bookId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      return await response.json()
    }
}

export const updateBookEndpoint = async (book: IBook) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`api/books/${book.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book)
    })

    if (response.ok) {
      return await response.json()
    }
}

export const deleteBookEndpoint = async (book: IBook) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const response = await makeRequest(`api/books/${book.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book)
    })

    if (response.ok) {
      return await response.json();
    }
}