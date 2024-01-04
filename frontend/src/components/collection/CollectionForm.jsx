import { useState } from 'react'

export default function CollectionForm({ onSubmit }) {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ error, setError ] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const collection = { title, description }

        const response = await fetch('/api/collections', {
            method: 'POST',
            body: JSON.stringify(collection),
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
            setDescription('')
            setError(null)
            console.log('New Collection', json)
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>

            <label>Collection Name:</label>
            <input 
                className="name-input"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            
            <label>Description:</label>
            <input 
                className="description-input"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
     )
}