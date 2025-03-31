import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/">FlashcardsWeb</Link>
                <div className="nav-links">
                    <Link className="nav-btn" to="/login">Zaloguj</Link>
                    <Link className="nav-btn" to="/register">Zarejestruj</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;