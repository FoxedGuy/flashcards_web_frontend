import { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Błąd logowania');
            }
            await res.json();
            alert('Zalogowano!'); // tu możesz np. zapisać token
        } catch (error) {
            console.error(error);
            alert('Logowanie nieudane');
        }
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się</h2>
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
            </form>
        </div>
    );
}

export default Login;
