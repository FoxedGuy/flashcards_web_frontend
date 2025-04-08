import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/users/me", {
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : null)
            .then(data =>{
                console.log(data)
                setUser(data || null);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const login = async (username, password) => {
        const res = await fetch("http://localhost:8000/auth/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                username,
                password
            }),
            credentials: "include"
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detail || "Błąd logowania");
        }

        const meRes = await fetch("http://localhost:8000/users/me", {
            credentials: "include"
        });

        if (meRes.ok) {
            const data = await meRes.json();
            setUser(data);
        } else {
            setUser(null);
        }
    };

    const logout = async () => {
        await fetch("http://localhost:8000/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
    };

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const res = await fetch(url, {
            ...options,
            credentials: "include",
        });

        if (res.status === 401) {
            setUser(null);
        }

        return res;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);