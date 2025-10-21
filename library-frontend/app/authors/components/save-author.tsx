'use client'


import { useState } from "react"
import { saveAuthorEndpoint } from "../endpoints/authorendpoint"
import Loading from "@/app/common/loading"

interface SaveAuthorProps {
    onListAuthors: () => void
}


export default function SaveAuthor({ onListAuthors }: SaveAuthorProps) {
    const [authorName, setAuthorName] = useState('')
    const [successfulSave, setSuccessfulSave] = useState(false)
    const [loading, setLoading] = useState(false)


    const [newAuthor, setNewAuthor] = useState(false)
    const [buttonNewAuthorText, setButtonNewAuthorText] = useState('New Author')
    const saveAuthorMethod = async () => {
        setLoading(true)
        const result = await saveAuthorEndpoint(authorName)
        console.log(JSON.stringify(result))
        setSuccessfulSave(true)
        setAuthorName('')
        await onListAuthors();
        setLoading(false)
    }

    const enableSaveAuthor = () => {
        if(!newAuthor) {
            setNewAuthor(true)
            setButtonNewAuthorText('Cancel')
        } else {
            setNewAuthor(false)
            setButtonNewAuthorText('New Author')
            setAuthorName('')
        }
        
    }

    return (
        <div className="w-full">  
            { loading && <Loading /> }
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Author</h1>
                    <p className="text-gray-600">Please, compleate the information about the new author.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-8 py-10">
                        <form className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Author Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        disabled={!newAuthor}
                                        type="text"
                                        id="authorName"
                                        name="authorName"
                                        placeholder="Enter the author name"
                                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-4 flex flex-col lg:flex-row">
                                <button
                                    id="btnNewAuthor"
                                    type="button"
                                    className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white fond-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                    onClick={() => enableSaveAuthor()}
                                >{buttonNewAuthorText}</button>
                                <button
                                    id="btnSaveNewAuthor"
                                    type="button"
                                    className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                    onClick={() => saveAuthorMethod()}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Author
                                </button>
                                
                            </div>
                            {successfulSave && <div className="mt-8 text-center">
                                <p className="text-sm text-green-500 font-bold">
                                    Saved Author
                                </p>
                            </div>}
                        </form>
                    </div>
                    
                    {/* Decorative bottom border */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                </div>
            </div>
        </div>
    )
}