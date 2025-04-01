import { useState } from 'react';
import './Login.css';
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')

        try {
            const res = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'username': username,
                    'password': password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || 'Błąd logowania');
            }
            await res.json();
            alert('Zalogowano!');
        } catch (error) {
            console.error(error);
            setError(error.message);

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
