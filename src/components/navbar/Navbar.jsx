import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/">FlashcardsWeb</Link>
                <div className="nav-links">
                    <button>
                        <Link to="/login">Zaloguj</Link>
                    </button>
                    <button>
                        <Link to="/register">Zarejestruj</Link>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;