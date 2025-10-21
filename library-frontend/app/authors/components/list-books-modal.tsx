import { useState } from "react"
import { IBook } from "../interfaces/book.interface"
import { listBooksByAuthorEndpoint } from "../endpoints/bookendpoint"

interface ListBooksModalProps {
    authorId: number;
}

export default function ListBooksModal({ authorId }: ListBooksModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [books, setBooks] = useState<IBook[]>([])


    const fetchBooks = async () => {
        const result = await listBooksByAuthorEndpoint(authorId)
        setBooks(result)
    }


    const openModal = async () => {
        setIsOpen(true)
        await fetchBooks();

    }

    return (
        <>
        <button
            onClick={() => openModal()}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
            Book List
        </button>

        {isOpen && 
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setIsOpen(false)}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-xl p-6 w-96 max-w-[90%] animate-fadeIn"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Book List
                    </h2>
                        
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto max-h-80">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        <span>Title</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {
                                                books.map((book, index) => (
                                                    <tr key={book.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                                                                    <span className="text-white font-semibold text-sm">
                                                                        {book.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                                    <div className="text-sm text-gray-500">ID: #{book.id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
            
        }
        </>
    )
}