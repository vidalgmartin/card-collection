// react router to create multiple pages
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import CollectionCards from './pages/CollectionCards'

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
              path="/collections"
              element={<MyCollections />}
            />
            <Route
              path="/collections/:collectionId"
              element={<CollectionCards />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}