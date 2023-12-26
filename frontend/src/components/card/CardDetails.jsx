import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function CardDetails() {
    const [decks, setDecks] = useState([])
    const { deckId } = useParams()

    useEffect(() => {
        const fetchDecks = async () => {
            const res = await axios.get(`/api/decks/${deckId}`)
            setDecks(res.data)
        }

        fetchDecks()
    }, [deckId])

    return (
        <>
            {decks.cards && decks.cards.length > 0 ? (
                decks.cards.map((card) => (
                    <div key={card._id}>
                        <p>Title: {card.title}</p>
                        <p>Quantity: {card.quantity}</p>
                    </div>
                ))
                ) : ( 
                    <p>No cards in the deck.</p> 
                )}
        </>
    )
}