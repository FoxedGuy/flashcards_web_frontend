import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth} from "../../context/AuthContext.jsx";

function Navbar(){
    const {user, logout, loading} = useAuth();

    if (loading) return null;

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/">FlashcardsWeb</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link className="nav-btn" to="/flashcards">Fiszki</Link>
                            <Link className="nav-btn" to="/profile">Profil</Link>
                            <Link className="nav-btn" onClick={logout} to="/">Wyloguj</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-btn" to="/login">Zaloguj</Link>
                            <Link className="nav-btn" to="/register">Zarejestruj</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;