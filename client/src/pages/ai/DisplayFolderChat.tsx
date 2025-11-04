
import React from "react"
import { Link } from "react-router-dom"
import { LucideDelete } from 'lucide-react'

interface debouncedType {
    _id: string
    filterSearch: string
}

const DisplayFolderChat: React.FC<debouncedType> = ({ filterSearch, handleDelete }) => {


    return (
        <div className="displayFolder_container">
            {
                filterSearch.length === 0 ? (
                    <h2>NewChat Not Found</h2>
                ) : (
                    filterSearch.map((n) => (
                        <div key={n._id} className="folder_data">

                            <div className="folder_content">
                                <Link to={`/aiMessage/${n._id}`}>
                                    <p>{n.folderName}</p>
                                </Link>
                                <LucideDelete onClick={() => handleDelete(n._id)} />
                            </div>

                        </div>
                    ))
                )
            }
        </div>
    )
}

export default DisplayFolderChat