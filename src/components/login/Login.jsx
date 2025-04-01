import { useState } from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';

function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <label>Nazwa użytkownia</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Hasło</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Zaloguj</button>
                <div className="no-account-div">
                    <label className="no-account">Nie masz konta? </label>
                    <Link className="no-account-link"   to="/register">Załóż je już teraz</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
