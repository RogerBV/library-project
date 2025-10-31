'use client'

import { useEffect, useState } from "react"
import { IBook } from "../authors/interfaces/book.interface"
import { getBookById, listBooks } from "./endpoints/bookendpoint"
import BookList from "./components/book-list"
import BookDetail from "./components/book-detail"

export default function Books() {
    const [books, setBooks] = useState<IBook[]>([])
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null)

    const getBooks = async () => {
        const result = await listBooks()
        setBooks(result)
    }

    const openView = async (bookId: number) => {
        const result = await getBookById(bookId);
        setSelectedBook(result)
    }

    const closeView = () => {
        setSelectedBook(null)
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Left Column - List Authors */}
                <div className="lg:w-2/3">
                    <BookList booksParam={books} openViewParam={openView} getBooksParam={getBooks} />
                </div>

                <div className="lg:w-1/3">
                    <div className="sticky top-6">
                        {
                            selectedBook != null && <BookDetail 
                                                        closeViewParam={() => closeView()} 
                                                        selectedBookParam={selectedBook} 
                                                        setSelectedBookParam={setSelectedBook}
                                                        getBooksParam={getBooks}
                                                    />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}