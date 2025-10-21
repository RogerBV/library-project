'use client'

import SaveAuthor from "./components/save-author";
import ListAuthors from "./components/list-author";
import { useEffect, useState } from "react";
import { IAuthor } from "./interfaces/author.interface";
import { listAuthorsEndpoint } from "./endpoints/authorendpoint";

export default function Author() {

    const [authors, setAuthors] = useState<IAuthor[]>([])

    const getAuthors = async () => {
        const result = await listAuthorsEndpoint()
        setAuthors(result)
    }

    useEffect(() => {
        getAuthors()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Left Column - List Authors */}
                <div className="lg:w-2/3">
                    <ListAuthors authorsParam={authors} />
                </div>
                
                {/* Right Column - Save Author */}
                <div className="lg:w-1/3">
                    <div className="sticky top-6">
                        <SaveAuthor onListAuthors={() => getAuthors()} />
                    </div>
                </div>
            </div>
        </div>
    )
}