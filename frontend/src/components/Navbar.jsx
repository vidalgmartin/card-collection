import { Link } from 'react-router-dom'

export default function Navbar() {
    
    return (
        <header className="navbar">
            <div className="icon">
                ICON
            </div>
            <div className="links">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="/collections">
                    <h2>My Collections</h2>
                </Link>
            </div>
        </header>
    )
}