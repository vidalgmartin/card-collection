import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function DeckDetails() {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        const fetchDecks = async () => {
            const res = await axios.get('/api/decks')
            setDecks(res.data)
        }

        fetchDecks()
    }, [])

    return (
        <>
            {decks && decks.map((deck) => (
                <div className="deck-container" key={deck._id}>
                    <div className="deck-items">
                        <Link to={`/decks/${deck._id}`}>
                            <p className="deck-name">Name: {deck.title}</p>
                        </Link>
                        <p>Format: {deck.format}</p>
                        <p>Created On: {deck.createdAt}</p>
                    </div>
                </div>
            ))}
        </>
    )
}