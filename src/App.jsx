import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";

function Home(){
    return (
        <>
            <h2>Witaj w aplikacji do tworzenia fiszek!</h2>
            <p>Rozpocznij naukę logując się bądź tworząc nowe konto!</p>
        </>
    );
}

function App() {
  return (
      <Router>
        <div className="App">
            <Navbar/>
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </main>
        </div>
      </Router>
  );
}

export default App
