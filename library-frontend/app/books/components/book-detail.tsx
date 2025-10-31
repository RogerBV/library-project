import { IBook } from "@/app/authors/interfaces/book.interface";
import Loading from "@/app/common/loading"
import { useState } from "react"
import { updateBookEndpoint } from "../endpoints/bookendpoint";

interface BookDetailProps {
    closeViewParam: () => void;
    selectedBookParam: IBook | null
    setSelectedBookParam: (book: IBook | null) => void
    getBooksParam: () => void
}

export default function BookDetail(
    { 
        closeViewParam, selectedBookParam, setSelectedBookParam, getBooksParam 
    }: BookDetailProps
) {
    const [loading, setLoading] = useState(false)

    const updateBook = async () => {
        setLoading(true)
        await updateBookEndpoint(selectedBookParam!);
        await getBooksParam()
        setSelectedBookParam(null)
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            { loading && <Loading /> }
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md -mt-60">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Edit Book
                </h1>
                <div className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="txtTitle">
                            Title
                        </label>
                        <input
                            id="txtTitle"
                            type="text"
                            value={selectedBookParam?.title}
                            onChange={(e) => {
                                    if (selectedBookParam) setSelectedBookParam({ ...selectedBookParam, title: e.target.value })
                                }
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="txtAuthor">
                            Author
                        </label>
                        <input
                            id="txtAuthor"
                            type="text"
                            value={selectedBookParam?.author_name}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Author"
                            disabled
                        />
                    </div>
                    <div className="pt-4 flex flex-col lg:flex-row">
                        <button
                          id="btnCancel"
                          type="button"
                          className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white fond-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"         
                          onClick={() => closeViewParam()}
                        >
                            Cancel
                        </button>
                        <button
                            id="btnSave"
                            type="button"
                            className="lg:w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => updateBook()}
                        >
                            Save
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

