import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CardForm() {
    const [ title, setTitle ] = useState('')
    const [ quantity, setQuantity ] = useState('')
    const [ error, setError ] = useState(null)
    const { collectionId } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const card = { title, quantity }
    
        const response = await fetch(`/api/collections/${collectionId}`, {
            method: 'POST',
            body: JSON.stringify(card),
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
            setQuantity('')
            setError(null)
            console.log('New Card', json)
        }
    }

     return (
        <form className="form-container" onSubmit={handleSubmit}>

            <label>Card Name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            
            <label>Quantity:</label>
            <input 
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            />
            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
     )
}