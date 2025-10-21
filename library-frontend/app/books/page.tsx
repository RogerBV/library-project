'use client'

import { useEffect, useState } from "react"
import { IBook } from "../authors/interfaces/book.interface"
import { listBooks } from "./endpoints/bookendpoint"
import ListBooks from "./components/list-books"

export default function Books() {
    const [books, setBooks] = useState<IBook[]>([])

    const getBooks = async () => {
        const result = await listBooks()
        setBooks(result)
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Left Column - List Authors */}
                <div className="lg:w-2/3">
                    <ListBooks booksParam={books} />
                </div>
                
                {/* Right Column - Save Author */}
                <div className="lg:w-1/3">
                    <div className="sticky top-6">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}