import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login/Login.jsx";

function Home(){
    return (
        <>
            <h2>Witaj w aplikacji do tworzenia fiszek!</h2>
            <p>Rozpocznij naukę tworząc nowe konto!</p>
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
                </Routes>
            </main>
        </div>
      </Router>
  );
}

export default App
