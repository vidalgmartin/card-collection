import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function CardDetails() {
    const [collections, setCollections] = useState([])
    const { collectionId } = useParams()

    useEffect(() => {
        const fetchCollections = async () => {
            const res = await axios.get(`/api/collections/${collectionId}`)
            setCollections(res.data)
        }

        fetchCollections()
    }, [collectionId])

    const handleDelete = async (cardId) => {
        await fetch(`/api/collections/${collectionId}/${cardId}`, {
            method: 'DELETE'
        })
    }
    
    return (
        <>
            {collections.cards && collections.cards.length > 0 ? (
                collections.cards.map((card) => (
                    <div key={card._id}>
                        <p>Title: {card.title}</p>
                        <p>Quantity: {card.quantity}</p>
                        <button onClick={() => handleDelete(card._id)}>delete</button>
                    </div>
                ))
                ) : ( 
                    <p>No cards in the deck.</p> 
                )}
        </>
    )
}