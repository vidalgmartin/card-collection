import { useState } from 'react'

export default function DeckForm({ onSubmit }) {
    const [ title, setTitle ] = useState('')
    const [ format, setFormat ] = useState('')
    const [ error, setError ] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const deck = { title, format }

        const response = await fetch('/api/decks', {
            method: 'POST',
            body: JSON.stringify(deck),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setFormat('')
            setError(null)
            console.log('New deck', json)
        }
    }

     return (
        <div className="parent-container">
            <form className="form-container" onSubmit={handleSubmit}>

                <label>Deck Name:</label>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                
                <label>Format:</label>
                <input 
                    type="text"
                    onChange={(e) => setFormat(e.target.value)}
                    value={format}
                />
                <button>Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     )
}