import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
                <div className="collection-item" key={collection._id}>
                    <Link to={`/collections/${collection._id}`}>
                        <div className="item-name">
                            <h4>Collection:</h4>
                            <p>{collection.title}</p>
                        </div>
                    </Link>
                    <div className="item-description">
                        <h4>Description:</h4>
                        <p>{collection.description}</p>
                    </div>
                    <p>Created On: {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}</p>
                    <button onClick={() => handleDelete(collection._id)}>delete</button>
                </div>
            ))}
        </>
    )
}