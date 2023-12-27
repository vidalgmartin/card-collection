import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function CollectionDetails() {
    const [collections, setCollections] = useState([])

    useEffect(() => {
        const fetchCollections = async () => {
            const res = await axios.get('/api/collections/')
            setCollections(res.data)
        }

        fetchCollections()
    }, [])

    const handleDelete = async (collectionId) => {
        await fetch(`/api/collections/${collectionId}`, {
            method: 'DELETE'
        })
    }
    
    return (
        <>
            {collections && collections.map((collection) => (
                <div className="collection-container" key={collection._id}>
                    <div className="collection-items">
                        <Link to={`/collections/${collection._id}`}>
                            <p className="collection-name">Name: {collection.title}</p>
                        </Link>
                        <p>Description: {collection.format}</p>
                        <p>Created On: {collection.createdAt}</p>
                        <button onClick={() => handleDelete(collection._id)}>delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}