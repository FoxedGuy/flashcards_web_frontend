import { useState } from 'react';
import '/src/components/login/Login.css';
import {Link} from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordStrong = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!isEmailValid(email)) {
            alert('Nieprawidłowy adres e-mail.');
            return;
        }

        if (!isPasswordStrong(password)) {
            alert('Hasło musi mieć co najmniej 8 znaków, zawierać wielką literę, cyfrę i znak specjalny.');
            return;
        }

        if (password !== confirm) {
            alert('Hasła się nie zgadzają!');
            return;
        }

        try {
            const res = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.detail || 'Błąd rejestracji');
            }

            alert('Rejestracja zakończona sukcesem!');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <div className="content-login">
            <div className="login-container">
                <h2>Załóż konto</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleRegister}>
                    <label>Nazwa użytkownika</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Hasło</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Powtórz hasło</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                    <button type="submit">Zarejestruj</button>
                    <div className="no-account-div">
                        <label>Masz już konto?</label>
                        <Link className="no-account-link" to="/login">Zaloguj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;