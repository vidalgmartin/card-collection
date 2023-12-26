// react router to create multiple pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import MyDecks from './pages/MyDecks'
import DeckCards from './pages/DeckCards'

// components
import Navbar from './components/Navbar'

// main app
export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/decks"
              element={<MyDecks />}
            />
            <Route
              path="/decks/:deckId"
              element={<DeckCards />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}